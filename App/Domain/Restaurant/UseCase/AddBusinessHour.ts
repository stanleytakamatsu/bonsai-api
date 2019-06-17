import { ILogger } from "../../../Core/Logger/ILogger";
import { BusinessHour } from "../Entity/BusinessHour";
import { IBusinessHourAdderService } from "../Service/IBusinessHourAdderService";
import { AddBusinessHourCommand } from "../Type/Command/Service/AddBusinessHourCommand";
import { IAddBusinessHourCommand } from "../Type/Command/UseCase/IAddBusinessHourCommand";
import { BusinessHourAlreadyExistsError as BusinessHourAlreadyExistsServiceError } from "../Type/Error/Service/BusinessHourAlreadyExistsError";
import { AddBusinessHourGenericError } from "../Type/Error/UseCase/AddBusinessHourGenericError";
import { BusinessHourAlreadyExistsError } from "../Type/Error/UseCase/BusinessHourAlreadyExistsError";
import { IAddBusinessHour } from "./IAddBusinessHour";

class AddBusinessHour implements IAddBusinessHour {
  public constructor(
    private readonly adderService: IBusinessHourAdderService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IAddBusinessHourCommand): Promise<void> {
    this.validateIfExists(command);

    try {
      const businessHour = BusinessHour.create(command.Weekday, command.StartHour, command.EndHour);
      const addCommand = AddBusinessHourCommand.create(businessHour, command.Restaurant);

      await this.adderService.add(addCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private validateIfExists(command: IAddBusinessHourCommand) {
    command.Restaurant.BusinessHours.forEach(businessHour => {
      if (
        command.Weekday == businessHour.Weekday &&
        command.StartHour == businessHour.StartHour &&
        command.EndHour == businessHour.EndHour
      ) {
        throw new BusinessHourAlreadyExistsError();
      }
    });
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case BusinessHourAlreadyExistsServiceError:
        this.logger.warning(error.message, error);

        throw new BusinessHourAlreadyExistsError();
      default:
        this.logger.error(error.message, error);

        throw new AddBusinessHourGenericError(error);
    }
  }
}

export { AddBusinessHour };
