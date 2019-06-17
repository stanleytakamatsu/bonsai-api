import * as moment from "moment";
import { Restaurant } from "../../../Entity/Restaurant";
import { IGetAvailableTablesQuery } from "./IGetAvailableTablesQuery";

class GetAvailableTablesQuery implements IGetAvailableTablesQuery {
  private restaurant: Restaurant;

  private bookingDateTime: moment.Moment;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get BookingDateTime(): moment.Moment {
    return this.bookingDateTime;
  }

  public static create(restaurant: Restaurant, bookingDateTime: string): GetAvailableTablesQuery {
    const query = new GetAvailableTablesQuery();

    query.restaurant = restaurant;
    query.bookingDateTime = moment(bookingDateTime, "YYYY-MM-DD HH:mm");

    return query;
  }
}

export { GetAvailableTablesQuery };
