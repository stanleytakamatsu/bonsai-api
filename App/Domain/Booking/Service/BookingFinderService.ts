import { GenericError } from "../../../Core/Error/Service/GenericError";
import { Booking } from "../Entity/Booking";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { FindBookingsQuery } from "../Type/Query/Repository/FindBookingsQuery";
import { IFindBookingsQuery } from "../Type/Query/Service/IFindBookingsQuery";
import { IBookingFinderService } from "./IBookingFinderService";
import { IFindBookingByGuidQuery } from "../Type/Query/Service/IFindBookingByGuidQuery";
import { FindBookingByGuidQuery } from "../Type/Query/Repository/FindBookingByGuidQuery";
import { SaveRecordError } from "../../../Core/Error/Repository/SaveRecordError";
import { RecordNotFoundError } from "../../../Core/Error/Repository/RecordNotFoundError";
import { BookingNotFoundError } from "../Type/Error/Service/BookingNotFoundError";

class BookingFinderService implements IBookingFinderService {
  public constructor(private readonly repository: IBookingRepository) {}

  public async findAll(query: IFindBookingsQuery): Promise<Booking[]> {
    try {
      const repositoryQuery = FindBookingsQuery.create(query.Restaurant, query.Filter);

      return await this.repository.findAll(repositoryQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async findOneByGuid(query: IFindBookingByGuidQuery): Promise<Booking> {
    try {
      const repositoryQuery = FindBookingByGuidQuery.create(query.BookingGuid);

      return await this.repository.findOneByGuid(repositoryQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const saveRecordError = error as SaveRecordError;

        throw new GenericError(error.message, saveRecordError.OriginalError);
      case RecordNotFoundError:
        throw new BookingNotFoundError(error.message);
      default:
        throw new GenericError(error.message, error);
    }
  }
}

export { BookingFinderService };
