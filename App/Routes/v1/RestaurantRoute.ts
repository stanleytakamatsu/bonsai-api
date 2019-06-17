import { IContainerService } from "../../Core/Container/IContainerService";
import { IHttpServer } from "../../Core/HttpServer/IHttpServer";
import { IGetRestaurantController } from "../../Domain/Restaurant/Controller/IGetRestaurantController";
import { IGetRestaurantsController } from "../../Domain/Restaurant/Controller/IGetRestaurantsController";
import { IRegisterRestaurantController } from "../../Domain/Restaurant/Controller/IRegisterRestaurantController";
import { Api } from "./Api";

class RestaurantRoute extends Api {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerRegisterRestaurant();
    await this.registerGetRestaurant();
    await this.registerGetRestaurants();
  }

  private async registerRegisterRestaurant(): Promise<void> {
    const controller = await this.getController(IRegisterRestaurantController);

    await this.addHttpRoute({
      controller,
      methods: "POST",
      path: "/restaurants",
      version: RestaurantRoute.VERSION
    });
  }

  private async registerGetRestaurant(): Promise<void> {
    const controller = await this.getController(IGetRestaurantController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants/:restaurantGuid",
      version: RestaurantRoute.VERSION
    });
  }

  private async registerGetRestaurants(): Promise<void> {
    const controller = await this.getController(IGetRestaurantsController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants",
      version: RestaurantRoute.VERSION
    });
  }
}

export { RestaurantRoute };
