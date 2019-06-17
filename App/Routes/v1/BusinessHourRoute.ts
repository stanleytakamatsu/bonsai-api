import { IContainerService } from "../../Core/Container/IContainerService";
import { IHttpServer } from "../../Core/HttpServer/IHttpServer";
import { IAddBusinessHourController } from "../../Domain/Restaurant/Controller/IAddBusinessHourController";
import { Api } from "./Api";
import { IGetBusinessHoursController } from "../../Domain/Restaurant/Controller/IGetBusinessHoursController";
import { IGetAvailableHoursController } from "../../Domain/Restaurant/Controller/IGetAvailableHoursController";

class BusinessHourRoute extends Api {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerAddBusinessHourRoute();
    await this.registerGetBusinessHoursRoute();
    await this.registerGetAvailableHoursRoute();
  }

  private async registerAddBusinessHourRoute(): Promise<void> {
    const controller = await this.getController(IAddBusinessHourController);

    await this.addHttpRoute({
      controller,
      methods: "POST",
      path: "/restaurants/:restaurantGuid/business/hours",
      version: BusinessHourRoute.VERSION
    });
  }

  private async registerGetBusinessHoursRoute(): Promise<void> {
    const controller = await this.getController(IGetBusinessHoursController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants/:restaurantGuid/business/hours",
      version: BusinessHourRoute.VERSION
    });
  }

  private async registerGetAvailableHoursRoute(): Promise<void> {
    const controller = await this.getController(IGetAvailableHoursController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/restaurants/:restaurantGuid/available/hours",
      version: BusinessHourRoute.VERSION
    });
  }
}

export { BusinessHourRoute };
