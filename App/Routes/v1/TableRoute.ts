import { IContainerService } from "../../Core/Container/IContainerService";
import { IHttpServer } from "../../Core/HttpServer/IHttpServer";
import { IAddTableController } from "../../Domain/Restaurant/Controller/IAddTableController";
import { Api } from "./Api";

class RestaurantTableRoute extends Api {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerAddTable();
  }

  private async registerAddTable(): Promise<void> {
    const controller = await this.getController(IAddTableController);

    await this.addHttpRoute({
      controller,
      methods: "POST",
      path: "/restaurants/:restaurantGuid/tables",
      version: RestaurantTableRoute.VERSION
    });
  }
}

export { RestaurantTableRoute };
