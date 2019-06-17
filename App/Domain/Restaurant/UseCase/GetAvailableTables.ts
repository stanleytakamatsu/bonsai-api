import { ILogger } from "../../../Core/Logger/ILogger";
import { FilterQuery } from "../../../Core/Type/Query/FilterQuery";
import { GetBookingsQuery } from "../../Booking/Type/Query/UseCase/GetBookingsQuery";
import { IGetBookings } from "../../Booking/UseCase/IGetBookings";
import { RestaurantNotFoundError as RestaurantNotFoundServiceError } from "../Type/Error/Service/RestaurantNotFoundError";
import { GetRestaurantGenericError } from "../Type/Error/UseCase/GetRestaurantGenericError";
import { RestaurantNotFoundError } from "../Type/Error/UseCase/RestaurantNotFoundError";
import { GetTablesQuery } from "../Type/Query/UseCase/GetTablesQuery";
import { IGetAvailableTablesQuery } from "../Type/Query/UseCase/IGetAvailableTablesQuery";
import { IGetAvailableTables } from "./IGetAvailableTables";
import { IGetTables } from "./IGetTables";
import { Table } from "../Entity/Table";

class GetAvailableTables implements IGetAvailableTables {
  public constructor(
    private readonly getBookings: IGetBookings,
    private readonly getTables: IGetTables,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetAvailableTablesQuery): Promise<Table[]> {
    const bookingDateTimeStart = query.BookingDateTime;
    const bookingDateTimeEnd = bookingDateTimeStart.clone().add("hours", 1);

    const getBookingsFilterQuery = FilterQuery.create({
      bookingDateTime: {
        $gte: bookingDateTimeStart.format("YYYY-MM-DD HH:mm"),
        $lt: bookingDateTimeEnd.format("YYYY-MM-DD HH:mm")
      }
    });

    const getBookingsQuery = GetBookingsQuery.create(query.Restaurant, getBookingsFilterQuery);

    const bookings = await this.getBookings.execute(getBookingsQuery);

    const getTablesQuery = GetTablesQuery.create(query.Restaurant);

    const tables = await this.getTables.execute(getTablesQuery);

    try {
      const unavailableTables = [];

      bookings.forEach(bookings => unavailableTables.push(bookings.TableCode));

      const availableTables = tables.filter(table => !unavailableTables.includes(table.Code));

      return availableTables;
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RestaurantNotFoundServiceError:
        this.logger.warning(error.message, error);

        throw new RestaurantNotFoundError();
      default:
        this.logger.error(error.message, error);

        throw new GetRestaurantGenericError(error);
    }
  }
}

export { GetAvailableTables };
