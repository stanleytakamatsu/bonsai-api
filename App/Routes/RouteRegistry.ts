import { IContainerService } from "../Core/Container/IContainerService";
import { IHttpServer } from "../Core/HttpServer/IHttpServer";
import { INewAble } from "../Core/Interface/INewAble";
import { HealthRoute } from "./HealthRoute";
import { IRoute } from "./IRoute";
import { RestaurantRoute } from "./v1/RestaurantRoute";
import { RestaurantTableRoute } from "./v1/TableRoute";
import { BusinessHourRoute } from "./v1/BusinessHourRoute";
import { BookingRoute } from "./v1/BookingRoute";

class RouteRegistry {
  private static readonly REGISTERED_ROUTES: INewAble<IRoute>[] = [
    HealthRoute,
    RestaurantTableRoute,
    RestaurantRoute,
    BusinessHourRoute,
    BookingRoute
  ];

  public constructor(private readonly container: IContainerService) {}

  public async registerAll(): Promise<void> {
    const routesCount = RouteRegistry.REGISTERED_ROUTES.length;

    for (let i = 0; i < routesCount; i += 1) {
      await this.registerRoute(RouteRegistry.REGISTERED_ROUTES[i]);
    }
  }

  public async registerRoute(newableRoute: INewAble<IRoute>): Promise<void> {
    const server = await this.container.get(IHttpServer);
    const route: IRoute = new newableRoute(this.container, server);

    await route.register();
  }
}

export { RouteRegistry };
