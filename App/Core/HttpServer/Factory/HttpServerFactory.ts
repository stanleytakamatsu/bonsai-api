import { ITracer } from '../../Tracer/ITracer';
import { HttpServer } from '../HttpServer';
import { IHttpServer } from '../IHttpServer';
import { Strategies } from '../Strategies';
import { FastfyServer } from '../Strategy/Fastfy/Fastfy';
import { KoaServer } from '../Strategy/Koa/KoaServer';

class HttpServerFactory {
  public static async create(strategy: Strategies, tracer: ITracer): Promise<IHttpServer> {
    switch (strategy) {
      case Strategies.KOA:
        return this.createKoaHttpServer(tracer);
      case Strategies.FASTFY:
        return this.createFastfyHttpServer(tracer);
      default:
        return this.createFastfyHttpServer(tracer);
    }
  }

  public static async createFastfyHttpServer(tracer: ITracer): Promise<IHttpServer> {
    const fastfy = new FastfyServer(tracer);

    return new HttpServer(fastfy);
  }

  public static async createKoaHttpServer(tracer: ITracer): Promise<IHttpServer> {
    const koa = new KoaServer(tracer);

    return new HttpServer(koa);
  }
}

export { HttpServerFactory };
