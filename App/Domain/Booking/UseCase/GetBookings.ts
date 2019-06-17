import { ILogger } from "../../../Core/Logger/ILogger";
import { IBookingFinderService } from "../Service/IBookingFinderService";
import { GetBookingsGenericError } from "../Type/Error/UseCase/GetBookingsGenericError";
import { FindBookingsQuery } from "../Type/Query/Service/FindBookingsQuery";
import { IGetBookingsQuery } from "../Type/Query/UseCase/IGetBookingsQuery";
import { IGetBookings } from "./IGetBookings";
import { Booking } from "../Entity/Booking";

class GetBookings implements IGetBookings {
  public constructor(
    private readonly finderService: IBookingFinderService,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetBookingsQuery): Promise<Booking[]> {
    try {
      const serviceQuery = FindBookingsQuery.create(query.Restaurant, query.Filter);

      return await this.finderService.findAll(serviceQuery);
    } catch (error) {
      this.logger.error(error.message, error);

      throw new GetBookingsGenericError(error);
    }
  }
}

export { GetBookings };
