import { ConflictRecordError } from "../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { ICreateBookingCommand } from "../Type/Command/Service/ICreateBookingCommand";
import { BookingAlreadyExistsError } from "../Type/Error/Service/BookingAlreadyExistsError";
import { IBookingCreatorService } from "./IBookingCreatorService";
import { CreateBookingCommand } from "../Type/Command/Service/CreateBookingCommand";

class BookingCreatorService implements IBookingCreatorService {
  public constructor(private readonly repository: IBookingRepository) {}

  public async create(command: ICreateBookingCommand): Promise<void> {
    try {
      const repositoryCommand = CreateBookingCommand.create(command.Booking);

      await this.repository.create(repositoryCommand);
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

export { BookingCreatorService };
