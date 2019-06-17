import * as moment from "moment-timezone";
import { Table } from "../../../../Restaurant/Entity/Table";
import { Booking } from "../../../Entity/Booking";
import { IEditBookingCommand } from "./IEditBookingCommand";

class EditBookingCommand implements IEditBookingCommand {
  private booking: Booking;

  private table: Table;

  private bookingDateTime: moment.Moment;

  public get BookingDateTime(): moment.Moment {
    return this.bookingDateTime;
  }

  public get Booking(): Booking {
    return this.booking;
  }

  public get Table(): Table {
    return this.table;
  }

  public static create(
    table: Table,
    booking: Booking,
    bookingDateTime: string
  ): EditBookingCommand {
    const command = new EditBookingCommand();

    command.table = table;
    command.booking = booking;
    command.bookingDateTime = moment(bookingDateTime, "YYYY-MM-DD HH:mm");

    return command;
  }
}

export { EditBookingCommand };
