import { IContainerService } from "../../Core/Container/IContainerService";
import { IHttpServer } from "../../Core/HttpServer/IHttpServer";
import { IAddTableController } from "../../Domain/Restaurant/Controller/IAddTableController";
import { Api } from "./Api";
import { IGetTablesController } from "../../Domain/Restaurant/Controller/IGetTablesController";
import { IGetAvailableTablesController } from "../../Domain/Restaurant/Controller/IGetAvailableTablesController";

class RestaurantTableRoute extends Api {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerAddTableRoute();
    await this.registerGetTablesRoute();
    await this.registerGetAvailableTablesRoute();
  }

  private async registerAddTableRoute(): Promise<void> {
    const controller = await this.getController(IAddTableController);

    await this.addHttpRoute({
      controller,
      methods: "POST",
      path: "/restaurants/:restaurantGuid/tables",
      version: RestaurantTableRoute.VERSION
    });
  }

  private async registerGetTablesRoute(): Promise<void> {
    const controller = await this.getController(IGetTablesController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants/:restaurantGuid/tables",
      version: RestaurantTableRoute.VERSION
    });
  }

  private async registerGetAvailableTablesRoute(): Promise<void> {
    const controller = await this.getController(IGetAvailableTablesController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants/:restaurantGuid/available/tables",
      version: RestaurantTableRoute.VERSION
    });
  }
}

export { RestaurantTableRoute };
