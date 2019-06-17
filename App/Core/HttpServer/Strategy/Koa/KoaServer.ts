import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as KoaBodyParser from "koa-bodyparser";

import { ITraceSpan } from "../../../Tracer/Driver/ITraceSpan";
import { ITracer } from "../../../Tracer/ITracer";
import { HttpResponseFactory } from "../../Factory/HttpResponseFactory";
import { IHttpMiddleware } from "../../IHttpMiddleware";
import { IHttpRequest } from "../../IHttpRequest";
import { IHttpResponse } from "../../IHttpResponse";
import { IHttpRoute } from "../../IHttpRoute";
import { IHttpServer } from "../../IHttpServer";
import { HttpRequest } from "../../Type/Dto/HttpRequest";

class KoaServer implements IHttpServer {
  private readonly server: Koa;

  public constructor(private readonly tracer: ITracer) {
    this.server = new Koa();

    this.server.use(KoaBodyParser());
  }

  public route(route: IHttpRoute): IHttpServer {
    const handleRequest = async (
      httpRoute: IHttpRoute,
      context: Koa.BaseContext
    ): Promise<Koa.BaseContext> => this.handleRequest(httpRoute, context);
    const koaRoute = new KoaRouter();

    koaRoute[route.methods.toString().toLowerCase()](
      route.path,
      async (context: Koa.BaseContext): Promise<Koa.BaseContext> => handleRequest(route, context)
    );

    this.server.use(koaRoute.routes());

    return this;
  }

  public async start(port: number): Promise<void> {
    await this.server.listen(port, "0.0.0.0");
  }

  private async executeMiddlewares(
    middlewares: IHttpMiddleware[],
    request: IHttpRequest
  ): Promise<IHttpResponse> {
    for (let i = 0; i < middlewares.length; i += 1) {
      const middleware = middlewares[i];

      const httpResponse = await middleware.perform(request);

      if (httpResponse !== undefined) {
        return httpResponse;
      }
    }
  }

  private async handleRequest(
    route: IHttpRoute,
    context: Koa.BaseContext
  ): Promise<Koa.BaseContext> {
    const traceScope = this.tracer.createScope("web.request");

    const traceSpan = traceScope.getSpan();

    this.traceHttpRequest(traceSpan, route, context);

    try {
      const httpRequest = await KoaServer.createHttpRequest(context);

      let httpResponse: IHttpResponse;

      if (route.before !== undefined) {
        httpResponse = await this.executeMiddlewares(route.before, httpRequest);
      }

      if (httpResponse === undefined) {
        httpResponse = await route.controller.perform(httpRequest);
      }

      const jsonResponse = httpResponse.toJSON();

      this.traceHttpResponse(traceSpan, httpResponse);

      traceScope.close();

      context.status = httpResponse.StatusCode;
      context.body = jsonResponse;

      return context;
    } catch (error) {
      const errorResponse = HttpResponseFactory.createErrorResponse(error);

      this.traceHttpResponse(traceSpan, errorResponse);

      traceScope.close();

      context.status = errorResponse.StatusCode;

      context.body = errorResponse.toJSON();

      return context;
    }
  }

  private traceHttpRequest(
    traceSpan: ITraceSpan,
    route: IHttpRoute,
    context: Koa.BaseContext
  ): void {
    const protocol = context.request.encrypted ? "https" : "http";
    const url = `${protocol}://${context.request.headers.host}${context.request.url}`;
    const resourceName = `${context.request.method} ${route.path}`;

    traceSpan.addTags({
      "http.body": JSON.stringify(context.request.body),
      "http.headers": JSON.stringify(context.request.headers),
      "http.method": context.request.method,
      "http.params": JSON.stringify(context.request.params),
      "http.route": context.request.url,
      "http.url": url,
      "resource.name": resourceName,
      "service.name": "bonsai-api",
      "span.kind": "server",
      "span.type": "http"
    });
  }

  private traceHttpResponse(traceSpan: ITraceSpan, response: IHttpResponse): void {
    const httpErrorFrom = 500;
    const isError: boolean = response.StatusCode >= httpErrorFrom;

    traceSpan.setTag("http.status_code", response.StatusCode);

    if (isError) {
      traceSpan.setTag("error", true);
    }

    if (response.StatusCode === HttpResponseFactory.HTTP_BAD_REQUEST) {
      traceSpan.setTag("http.validation_error", JSON.stringify(response.Body.details));
    }
  }

  private static async createHttpRequest(context: Koa.BaseContext): Promise<IHttpRequest> {
    return new HttpRequest(context.query, context.request.body, context.headers, context.params);
  }
}

export { KoaServer };
