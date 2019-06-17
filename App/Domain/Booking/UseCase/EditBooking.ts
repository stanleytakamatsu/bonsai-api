import { ILogger } from "../../../Core/Logger/ILogger";
import { IBookingUpdaterService } from "../Service/IBookingUpdaterService";
import { UpdateBookingCommand } from "../Type/Command/Service/UpdateBookingCommand";
import { IEditBookingCommand } from "../Type/Command/UseCase/IEditBookingCommand";
import { EditBookingGenericError } from "../Type/Error/UseCase/EditBookingGenericError";
import { IEditBooking } from "./IEditBooking";
import { BookingAlreadyExistsError } from "../Type/Error/UseCase/BookingAlreadyExistsError";
import { BookingAlreadyExistsError as BookingAlreadyExistsServiceError } from "../Type/Error/Service/BookingAlreadyExistsError";

class EditBooking implements IEditBooking {
  public constructor(
    private readonly service: IBookingUpdaterService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IEditBookingCommand): Promise<void> {
    try {
      const booking = command.Booking;

      booking.changeDateTime(command.BookingDateTime);
      booking.changeTable(command.Table);

      const serviceCommand = UpdateBookingCommand.create(booking);

      await this.service.update(serviceCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case BookingAlreadyExistsServiceError:
        this.logger.warning(error.message, error);
        throw new BookingAlreadyExistsError();
      default:
        this.logger.error(error.message, error);

        throw new EditBookingGenericError(error);
    }
  }
}

export { EditBooking };
