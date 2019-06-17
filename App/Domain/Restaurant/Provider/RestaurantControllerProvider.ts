import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { GetRestaurantController } from "../Controller/GetRestaurantController";
import { GetRestaurantsController } from "../Controller/GetRestaurantsController";
import { IGetRestaurantController } from "../Controller/IGetRestaurantController";
import { IGetRestaurantsController } from "../Controller/IGetRestaurantsController";
import { IRegisterRestaurantController } from "../Controller/IRegisterRestaurantController";
import { RegisterRestaurantController } from "../Controller/RegisterRestaurantController";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetRestaurants } from "../UseCase/IGetRestaurants";
import { IRegisterRestaurant } from "../UseCase/IRegisterRestaurant";
import { IGetRestaurantValidator } from "../Validator/IGetRestaurantValidator";
import { IRegisterRestaurantValidator } from "../Validator/IRegisterRestaurantValidator";
import { IAddBusinessHourController } from "../Controller/IAddBusinessHourController";
import { IAddBusinessHourValidator } from "../Validator/IAddBusinessHourValidator";
import { IAddBusinessHour } from "../UseCase/IAddBusinessHour";
import { AddBusinessHourController } from "../Controller/AddBusinessHourController";
import { IGetBusinessHoursController } from "../Controller/IGetBusinessHoursController";
import { IGetBusinessHoursValidator } from "../Validator/IGetBusinessHoursValidator";
import { GetBusinessHoursController } from "../Controller/GetBusinessHoursController";

class RestaurantControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerRegisterRestaurantController();
    await this.registerGetRestaurantController();
    await this.registerGetRestaurantsController();
    await this.registerAddBusinessHourController();
    await this.registerGetBusinessHoursController();
  }

  private async registerRegisterRestaurantController(): Promise<void> {
    this.container.register<IRegisterRestaurantController>(
      IRegisterRestaurantController,
      () =>
        new Promise<IRegisterRestaurantController>(async resolve => {
          const validator = await this.container.get<IRegisterRestaurantValidator>(
            IRegisterRestaurantValidator
          );
          const useCase = await this.container.get<IRegisterRestaurant>(IRegisterRestaurant);
          const controller = new RegisterRestaurantController(useCase, validator);

          resolve(controller);
        })
    );
  }

  private async registerGetRestaurantController(): Promise<void> {
    this.container.register<IGetRestaurantController>(
      IGetRestaurantController,
      () =>
        new Promise<IGetRestaurantController>(async resolve => {
          const validator = await this.container.get<IGetRestaurantValidator>(
            IGetRestaurantValidator
          );
          const useCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const controller = new GetRestaurantController(useCase, validator);

          resolve(controller);
        })
    );
  }

  private async registerGetRestaurantsController(): Promise<void> {
    this.container.register<IGetRestaurantsController>(
      IGetRestaurantsController,
      () =>
        new Promise<IGetRestaurantsController>(async resolve => {
          const useCase = await this.container.get<IGetRestaurants>(IGetRestaurants);
          const controller = new GetRestaurantsController(useCase);

          resolve(controller);
        })
    );
  }

  private async registerAddBusinessHourController(): Promise<void> {
    this.container.register<IAddBusinessHourController>(
      IAddBusinessHourController,
      () =>
        new Promise<IAddBusinessHourController>(async resolve => {
          const validator = await this.container.get<IAddBusinessHourValidator>(
            IAddBusinessHourValidator
          );
          const addBusinessHourUseCase = await this.container.get<IAddBusinessHour>(
            IAddBusinessHour
          );
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const controller = new AddBusinessHourController(
            addBusinessHourUseCase,
            getRestaurantUseCase,
            validator
          );

          resolve(controller);
        })
    );
  }

  private async registerGetBusinessHoursController(): Promise<void> {
    this.container.register<IGetBusinessHoursController>(
      IGetBusinessHoursController,
      () =>
        new Promise<IGetBusinessHoursController>(async resolve => {
          const validator = await this.container.get<IGetBusinessHoursValidator>(
            IGetBusinessHoursValidator
          );
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const controller = new GetBusinessHoursController(getRestaurantUseCase, validator);

          resolve(controller);
        })
    );
  }
}

export { RestaurantControllerProvider };
