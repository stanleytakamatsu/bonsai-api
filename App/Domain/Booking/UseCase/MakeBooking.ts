import { IMakeBookingCommand } from "../Type/Command/UseCase/IMakeBookingCommand";
import { IMakeBooking } from "./IMakeBooking";
import { BookingScheduleIsOutOfRangeError } from "../Type/Error/UseCase/BookingScheduleIsOutOfRangeError";
import { ILogger } from "../../../Core/Logger/ILogger";
import { IBookingCreatorService } from "../Service/IBookingCreatorService";
import { BookingAlreadyExistsError } from "../Type/Error/UseCase/BookingAlreadyExistsError";
import { BookingAlreadyExistsError as BookingAlreadyExistsServiceError } from "../Type/Error/Service/BookingAlreadyExistsError";
import { MakeBookingGenericError } from "../Type/Error/UseCase/MakeBookingGenericError";
import { Booking } from "../Entity/Booking";
import { CreateBookingCommand } from "../Type/Command/Service/CreateBookingCommand";

class MakeBooking implements IMakeBooking {
  public constructor(
    private readonly creatorService: IBookingCreatorService,
    private readonly logger: ILogger
  ) {}

  public async execute(command: IMakeBookingCommand): Promise<void> {
    this.verifyIfBookingIsInBusinessHour(command);

    try {
      const booking = Booking.create(
        command.Table,
        command.Restaurant,
        command.BookingDateTime,
        command.Name,
        command.Email
      );

      const serviceCommand = CreateBookingCommand.create(booking);

      await this.creatorService.create(serviceCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private verifyIfBookingIsInBusinessHour(command: IMakeBookingCommand) {
    let isValidBookingDateTime = false;
    const count = command.Restaurant.BusinessHours.length;

    for (let i = 0; i < count; i++) {
      const businessHour = command.Restaurant.BusinessHours[i];

      if (command.BookingDateTime.format("dddd").toLowerCase() != businessHour.Weekday) {
        continue;
      }

      const bookingDateTime = Number(command.BookingDateTime.format("HH"));

      if (bookingDateTime >= businessHour.StartHour && bookingDateTime < businessHour.EndHour) {
        isValidBookingDateTime = true;

        break;
      }
    }

    if (!isValidBookingDateTime) {
      throw new BookingScheduleIsOutOfRangeError();
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case BookingAlreadyExistsServiceError:
        this.logger.warning(error.message, error);
        throw new BookingAlreadyExistsError();
      default:
        this.logger.error(error.message, error);

        throw new MakeBookingGenericError(error);
    }
  }
}

export { MakeBooking };
