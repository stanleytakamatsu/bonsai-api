import { ILogger } from "../../../Core/Logger/ILogger";
import { Restaurant } from "../Entity/Restaurant";
import { IRestaurantCreatorService } from "../Service/IRestaurantCreatorService";
import { CreateRestaurantCommand } from "../Type/Command/Service/CreateRestaurantCommand";
import { IRegisterRestaurantCommand } from "../Type/Command/UseCase/IRegisterRestaurantCommand";
import { RestaurantAlreadyExistsError as RestaurantAlreadyExistsServiceError } from "../Type/Error/Service/RestaurantAlreadyExistsError";
import { RegisterRestaurantGenericError } from "../Type/Error/UseCase/RegisterRestaurantGenericError";
import { RestaurantAlreadyExistsError } from "../Type/Error/UseCase/RestaurantAlreadyExistsError";
import { IRegisterRestaurant } from "./IRegisterRestaurant";

class RegisterRestaurant implements IRegisterRestaurant {
  public constructor(
    private readonly creatorService: IRestaurantCreatorService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IRegisterRestaurantCommand): Promise<void> {
    try {
      const restaurant = Restaurant.create(command.Name);

      const createCommand = CreateRestaurantCommand.create(restaurant);

      await this.creatorService.create(createCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RestaurantAlreadyExistsServiceError:
        this.logger.warning(error.message, error);

        throw new RestaurantAlreadyExistsError();
      default:
        this.logger.error(error.message, error);

        throw new RegisterRestaurantGenericError(error);
    }
  }
}

export { RegisterRestaurant };
