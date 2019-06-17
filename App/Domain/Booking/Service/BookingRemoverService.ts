import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { GenericError } from "../../../Core/Error/Service/GenericError";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { DeleteBookingCommand } from "../Type/Command/Repository/DeleteBookingCommand";
import { IRemoveBookingCommand } from "../Type/Command/Service/IRemoveBookingCommand";
import { IBookingRemoverService } from "./IBookingRemoverService";

class BookingRemoverService implements IBookingRemoverService {
  public constructor(private readonly repository: IBookingRepository) {}

  public async remove(command: IRemoveBookingCommand): Promise<void> {
    try {
      const repositoryCommand = DeleteBookingCommand.create(command.Booking);

      await this.repository.delete(repositoryCommand);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const saveRecordError = error as SaveRecordError;

        throw new GenericError(error.message, saveRecordError.OriginalError);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { BookingRemoverService };
