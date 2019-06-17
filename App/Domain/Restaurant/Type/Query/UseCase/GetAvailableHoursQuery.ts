import * as moment from "moment";

import { Restaurant } from "../../../Entity/Restaurant";
import { IGetAvailableHoursQuery } from "./IGetAvailableHoursQuery";

class GetAvailableHoursQuery implements IGetAvailableHoursQuery {
  private restaurant: Restaurant;

  private bookingDate: moment.Moment;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get BookingDateTime(): moment.Moment {
    return this.bookingDate;
  }

  public static create(restaurant: Restaurant, bookingDate: Date): GetAvailableHoursQuery {
    const query = new GetAvailableHoursQuery();

    query.restaurant = restaurant;
    query.bookingDate = moment(bookingDate);

    return query;
  }
}

export { GetAvailableHoursQuery };
