import { ILogger } from "../../../Core/Logger/ILogger";
import { Booking } from "../Entity/Booking";
import { IBookingFinderService } from "../Service/IBookingFinderService";
import { BookingNotFoundError as BookingNotFoundServiceError } from "../Type/Error/Service/BookingNotFoundError";
import { BookingNotFoundError } from "../Type/Error/UseCase/BookingNotFoundError";
import { GetBookingsGenericError } from "../Type/Error/UseCase/GetBookingsGenericError";
import { FindBookingByGuidQuery } from "../Type/Query/Service/FindBookingByGuidQuery";
import { IGetBookingQuery } from "../Type/Query/UseCase/IGetBookingQuery";
import { IGetBooking } from "./IGetBooking";

class GetBooking implements IGetBooking {
  public constructor(
    private readonly finderService: IBookingFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetBookingQuery): Promise<Booking> {
    try {
      const serviceQuery = FindBookingByGuidQuery.create(query.BookingGuid);

      return await this.finderService.findOneByGuid(serviceQuery);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case BookingNotFoundServiceError:
        this.logger.warning(error.message, error);

        throw new BookingNotFoundError();
      default:
        this.logger.error(error.message, error);

        throw new GetBookingsGenericError(error);
    }
  }
}

export { GetBooking };
