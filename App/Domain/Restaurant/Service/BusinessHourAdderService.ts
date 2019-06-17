import { ConflictRecordError } from "../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { IRestaurantRepository } from "../Repository/IRestaurantRepository";
import { AddBusinessHourCommand } from "../Type/Command/Repository/AddBusinessHourCommand";
import { IAddBusinessHourCommand } from "../Type/Command/Service/IAddBusinessHourCommand";
import { BusinessHourAlreadyExistsError } from "../Type/Error/Service/BusinessHourAlreadyExistsError";
import { IBusinessHourAdderService } from "./IBusinessHourAdderService";

class BusinessHourAdderService implements IBusinessHourAdderService {
  public constructor(private readonly repository: IRestaurantRepository) {}

  public async add(command: IAddBusinessHourCommand): Promise<void> {
    try {
      const repositoryCommand = AddBusinessHourCommand.create(
        command.BusinessHour,
        command.Restaurant
      );

      await this.repository.addBusinessHour(repositoryCommand);
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
        throw new BusinessHourAlreadyExistsError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { BusinessHourAdderService };
