import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IRestaurantRepository } from "../Repository/IRestaurantRepository";
import { IRestaurantCreatorService } from "../Service/IRestaurantCreatorService";
import { IRestaurantFinderService } from "../Service/IRestaurantFinderService";
import { RestaurantCreatorService } from "../Service/RestaurantCreatorService";
import { RestaurantFinderService } from "../Service/RestaurantFinderService";
import { IBusinessHourAdderService } from "../Service/IBusinessHourAdderService";
import { BusinessHourAdderService } from "../Service/BusinessHourAdderService";

class RestaurantServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerRestaurantCreatorService();
    await this.registerRestaurantFinderService();
    await this.registerBusinessHourAdderService();
  }

  private async registerRestaurantCreatorService(): Promise<void> {
    this.container.register<IRestaurantCreatorService>(
      IRestaurantCreatorService,
      () =>
        new Promise<RestaurantCreatorService>(async resolve => {
          const repository = await this.container.get<IRestaurantRepository>(IRestaurantRepository);
          const service = new RestaurantCreatorService(repository);

          resolve(service);
        })
    );
  }

  private async registerRestaurantFinderService(): Promise<void> {
    this.container.register<IRestaurantFinderService>(
      IRestaurantFinderService,
      () =>
        new Promise<IRestaurantFinderService>(async resolve => {
          const repository = await this.container.get<IRestaurantRepository>(IRestaurantRepository);
          const service = new RestaurantFinderService(repository);

          resolve(service);
        })
    );
  }

  private async registerBusinessHourAdderService(): Promise<void> {
    this.container.register<IBusinessHourAdderService>(
      IBusinessHourAdderService,
      () =>
        new Promise<IBusinessHourAdderService>(async resolve => {
          const repository = await this.container.get<IRestaurantRepository>(IRestaurantRepository);
          const service = new BusinessHourAdderService(repository);

          resolve(service);
        })
    );
  }
}

export { RestaurantServiceProvider };
