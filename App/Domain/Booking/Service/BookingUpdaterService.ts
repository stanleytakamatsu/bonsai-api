import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { UpdateBookingCommand } from "../Type/Command/Repository/UpdateBookingCommand";
import { IUpdateBookingCommand } from "../Type/Command/Service/IUpdateBookingCommand";
import { IBookingUpdaterService } from "./IBookingUpdaterService";
import { ConflictRecordError } from "../../../Core/Error/Repository/ConflictRecordError";
import { BookingAlreadyExistsError } from "../Type/Error/Service/BookingAlreadyExistsError";

class BookingUpdaterService implements IBookingUpdaterService {
  public constructor(private readonly repository: IBookingRepository) {}

  public async update(command: IUpdateBookingCommand): Promise<void> {
    try {
      const repositoryCommand = UpdateBookingCommand.create(command.Booking);

      await this.repository.update(repositoryCommand);
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
        throw new BookingAlreadyExistsError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { BookingUpdaterService };
