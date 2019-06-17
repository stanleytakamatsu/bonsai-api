import { ILogger } from "../../../Core/Logger/ILogger";
import { IBookingRemoverService } from "../Service/IBookingRemoverService";
import { CreateBookingCommand } from "../Type/Command/Service/CreateBookingCommand";
import { IRemoveBookingCommand } from "../Type/Command/UseCase/IRemoveBookingCommand";
import { RemoveBookingGenericError } from "../Type/Error/UseCase/RemoveBookingGenericError";
import { IRemoveBooking } from "./IRemoveBooking";

class RemoveBooking implements IRemoveBooking {
  public constructor(
    private readonly creatorService: IBookingRemoverService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IRemoveBookingCommand): Promise<void> {
    try {
      const serviceCommand = CreateBookingCommand.create(command.Booking);

      await this.creatorService.remove(serviceCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    this.logger.error(error.message, error);

    throw new RemoveBookingGenericError(error);
  }
}

export { RemoveBooking };
