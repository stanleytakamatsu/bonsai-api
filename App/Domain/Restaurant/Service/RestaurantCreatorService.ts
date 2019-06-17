import { ConflictRecordError } from "../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { IRestaurantRepository } from "../Repository/IRestaurantRepository";
import { CreateRestaurantCommand } from "../Type/Command/Repository/CreateRestaurantCommand";
import { ICreateRestaurantCommand } from "../Type/Command/Service/ICreateRestaurantCommand";
import { RestaurantAlreadyExistsError } from "../Type/Error/Service/RestaurantAlreadyExistsError";
import { IRestaurantCreatorService } from "./IRestaurantCreatorService";

class RestaurantCreatorService implements IRestaurantCreatorService {
  public constructor(private readonly repository: IRestaurantRepository) {}

  public async create(command: ICreateRestaurantCommand): Promise<void> {
    try {
      const repositoryCommand = CreateRestaurantCommand.create(command.Restaurant);

      await this.repository.createRestaurant(repositoryCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const saveRecordError = error as SaveRecordError;

        throw new GenericError(error.message, saveRecordError.OriginalError);
      case ConflictRecordError:
        throw new RestaurantAlreadyExistsError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { RestaurantCreatorService };
