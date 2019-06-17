import * as moment from "moment-timezone";

import { GuidGenerator } from "../../../Core/Hash/Guid/GuidGenerator";
import { Restaurant } from "../../Restaurant/Entity/Restaurant";
import { Table } from "../../Restaurant/Entity/Table";
import { IBookingModel } from "../Repository/Model/IBookingModel";

class Booking {
  private id: string;

  private guid: string;

  private restaurantId: string;

  private tableCode: string;

  private bookingDateTime: moment.Moment;

  private name: string;

  private email: string;

  private createdAt: moment.Moment;

  private updatedAt: moment.Moment;

  public get Id(): string {
    return this.id;
  }

  public get Guid(): string {
    return this.guid;
  }

  public get RestaurantId(): string {
    return this.restaurantId;
  }

  public get TableCode(): string {
    return this.tableCode;
  }

  public get BookingDateTime(): moment.Moment {
    return this.bookingDateTime;
  }

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public get CreatedAt(): moment.Moment {
    return this.createdAt;
  }

  public get UpdatedAt(): moment.Moment {
    return this.updatedAt;
  }

  public changeTable(table: Table): void {
    if (this.tableCode != table.Code) {
      this.tableCode = table.Code;
      this.updatedAt = moment();
    }
  }

  public changeDateTime(bookingDateTime: moment.Moment): void {
    if (this.bookingDateTime != bookingDateTime) {
      this.bookingDateTime = bookingDateTime;
      this.updatedAt = moment();
    }
  }

  public static create(
    table: Table,
    restaurant: Restaurant,
    bookingDateTime: moment.Moment,
    name: string,
    email: string
  ): Booking {
    const booking = new Booking();

    booking.guid = GuidGenerator.generate();
    booking.restaurantId = restaurant.Id;
    booking.tableCode = table.Code;
    booking.bookingDateTime = bookingDateTime;
    booking.name = name;
    booking.email = email;
    booking.createdAt = moment();
    booking.updatedAt = moment();

    return booking;
  }

  public static createFromRecord(record: IBookingModel): Booking {
    const booking = new Booking();

    booking.id = record.id;
    booking.guid = record.guid;
    booking.restaurantId = record.restaurantId;
    booking.tableCode = record.tableCode;
    booking.bookingDateTime = moment(record.bookingDateTime);
    booking.name = record.name;
    booking.email = record.email;
    booking.createdAt = moment(record.createdAt);
    booking.updatedAt = moment(record.updatedAt);

    return booking;
  }
}

export { Booking };
