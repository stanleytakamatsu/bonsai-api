import { serialize, serializeAs } from "cerialize";
import * as moment from "moment-timezone";

import { Booking } from "../../Entity/Booking";

class BookingMapper {
  private guid: string;

  private table: string;

  private bookingDateTime: moment.Moment;

  private name: string;

  private email: string;

  private createdAt: moment.Moment;

  private updatedAt: moment.Moment;

  @serialize
  public get Guid(): string {
    return this.guid;
  }

  @serialize
  public get Table(): string {
    return this.table;
  }

  @serialize
  public get Email(): string {
    return this.email;
  }

  @serialize
  public get Name(): string {
    return this.name;
  }

  @serializeAs(data => moment(data).format("YYYY-MM-DD"))
  public get BookingDate(): moment.Moment {
    return this.bookingDateTime;
  }

  @serializeAs(data => moment(data).format("HH:mm"))
  public get BookingTime(): moment.Moment {
    return this.bookingDateTime;
  }

  @serializeAs(data => moment(data).format("YYYY-MM-DD HH:mm"))
  public get CreatedAt(): moment.Moment {
    return this.createdAt;
  }

  @serializeAs(data => moment(data).format("YYYY-MM-DD HH:mm"))
  public get UpdatedAt(): moment.Moment {
    return this.updatedAt;
  }

  public static create(booking: Booking): BookingMapper {
    const mapper = new BookingMapper();

    mapper.guid = booking.Guid;
    mapper.table = booking.TableCode;
    mapper.bookingDateTime = booking.BookingDateTime;
    mapper.name = booking.Name;
    mapper.email = booking.Email;
    mapper.createdAt = booking.CreatedAt;
    mapper.updatedAt = booking.UpdatedAt;

    return mapper;
  }
}

export { BookingMapper };
