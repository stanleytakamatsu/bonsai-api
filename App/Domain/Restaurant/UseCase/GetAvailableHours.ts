import { ILogger } from "../../../Core/Logger/ILogger";
import { RestaurantNotFoundError as RestaurantNotFoundServiceError } from "../Type/Error/Service/RestaurantNotFoundError";
import { GetRestaurantGenericError } from "../Type/Error/UseCase/GetRestaurantGenericError";
import { RestaurantNotFoundError } from "../Type/Error/UseCase/RestaurantNotFoundError";
import { IGetAvailableHoursQuery } from "../Type/Query/UseCase/IGetAvailableHoursQuery";
import { IGetAvailableHours } from "./IGetAvailableHours";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { IGetBookings } from "../../Booking/UseCase/IGetBookings";
import { GetBookingsQuery } from "../../Booking/Type/Query/UseCase/GetBookingsQuery";
import { FilterQuery } from "../../../Core/Type/Query/FilterQuery";
import { IGetTables } from "./IGetTables";
import { GetTablesQuery } from "../Type/Query/UseCase/GetTablesQuery";
const moment = extendMoment(Moment);

class GetAvailableHours implements IGetAvailableHours {
  public constructor(
    private readonly getBookings: IGetBookings,
    private readonly getTables: IGetTables,
    private readonly logger: ILogger
  ) {}

  public async execute(query: IGetAvailableHoursQuery): Promise<[string]> {
    const bookingDateStart = query.BookingDateTime;
    const bookingDateEnd = bookingDateStart.clone().add("days", 1);

    const getBookingsFilterQuery = FilterQuery.create({
      bookingDateTime: {
        $gte: bookingDateStart.format("YYYY-MM-DD HH:mm"),
        $lt: bookingDateEnd.format("YYYY-MM-DD HH:mm")
      }
    });

    const getBookingsQuery = GetBookingsQuery.create(query.Restaurant, getBookingsFilterQuery);

    const bookings = await this.getBookings.execute(getBookingsQuery);

    const getTablesQuery = GetTablesQuery.create(query.Restaurant);

    const tables = await this.getTables.execute(getTablesQuery);
    const tableQuantity = tables.length;

    const reMappedBookings = bookings
      .map(booking => ({ hour: booking.BookingDateTime.format("HH:mm"), count: 1 }))
      .reduce((accumulation, current) => {
        accumulation[current.hour] = (accumulation[current.hour] || 0) + current.count;

        return accumulation;
      }, {});

    const restrictedHours = Object.keys(reMappedBookings)
      .filter(a => reMappedBookings[a] >= tableQuantity)
      .sort((a, b) => (a > b ? 1 : -1));

    try {
      const businessHours = query.Restaurant.BusinessHours;
      const weekday = query.BookingDateTime.format("dddd").toLowerCase();

      const availableBusinessHours = businessHours.filter(
        businessHour => businessHour.Weekday == weekday
      );

      const availableHours = availableBusinessHours.map(businessHour => {
        const start = moment(businessHour.StartHour, "HH");
        const end = moment(businessHour.EndHour, "HH");
        const range = moment.range(start, end);
        const hours = Array.from(range.by("hour", { excludeEnd: true }));

        return hours.map(m => m.format("HH:mm")).filter(m => !restrictedHours.includes(m));
      });

      return [].concat.apply([], availableHours);
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

export { GetAvailableHours };
