import { IContainerService } from "../../../Core/Container/IContainerService";
import { ILogger } from "../../../Core/Logger/ILogger";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IRestaurantCreatorService } from "../Service/IRestaurantCreatorService";
import { IRestaurantFinderService } from "../Service/IRestaurantFinderService";
import { GetRestaurant } from "../UseCase/GetRestaurant";
import { GetRestaurants } from "../UseCase/GetRestaurants";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetRestaurants } from "../UseCase/IGetRestaurants";
import { IRegisterRestaurant } from "../UseCase/IRegisterRestaurant";
import { RegisterRestaurant } from "../UseCase/RegisterRestaurant";
import { IAddBusinessHour } from "../UseCase/IAddBusinessHour";
import { IBusinessHourAdderService } from "../Service/IBusinessHourAdderService";
import { AddBusinessHour } from "../UseCase/AddBusinessHour";

class RestaurantUseCaseProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerRegisterRestaurantUseCase();
    await this.registerGetRestaurantUseCase();
    await this.registerGetRestaurantsUseCase();
    await this.registerAddBusinessHourUseCase();
  }

  private async registerRegisterRestaurantUseCase(): Promise<void> {
    this.container.register<IRegisterRestaurant>(
      IRegisterRestaurant,
      () =>
        new Promise<IRegisterRestaurant>(async resolve => {
          const service = await this.container.get<IRestaurantCreatorService>(
            IRestaurantCreatorService
          );
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new RegisterRestaurant(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetRestaurantUseCase(): Promise<void> {
    this.container.register<IGetRestaurant>(
      IGetRestaurant,
      () =>
        new Promise<IGetRestaurant>(async resolve => {
          const service = await this.container.get<IRestaurantFinderService>(
            IRestaurantFinderService
          );
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetRestaurant(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetRestaurantsUseCase(): Promise<void> {
    this.container.register<IGetRestaurants>(
      IGetRestaurants,
      () =>
        new Promise<IGetRestaurants>(async resolve => {
          const service = await this.container.get<IRestaurantFinderService>(
            IRestaurantFinderService
          );
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetRestaurants(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerAddBusinessHourUseCase(): Promise<void> {
    this.container.register<IAddBusinessHour>(
      IAddBusinessHour,
      () =>
        new Promise<IAddBusinessHour>(async resolve => {
          const service = await this.container.get<IBusinessHourAdderService>(
            IBusinessHourAdderService
          );
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new AddBusinessHour(service, logger);

          resolve(useCase);
        })
    );
  }
}

export { RestaurantUseCaseProvider };
