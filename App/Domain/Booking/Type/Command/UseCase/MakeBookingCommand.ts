import * as moment from "moment-timezone";

import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { Table } from "../../../../Restaurant/Entity/Table";
import { IMakeBookingCommand } from "./IMakeBookingCommand";

class MakeBookingCommand implements IMakeBookingCommand {
  private restaurant: Restaurant;

  private table: Table;

  private bookingDateTime: moment.Moment;

  private name: string;

  private email: string;

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get BookingDateTime(): moment.Moment {
    return this.bookingDateTime;
  }

  public get Table(): Table {
    return this.table;
  }

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public static create(
    restaurant: Restaurant,
    table: Table,
    bookingDateTime: string,
    name: string,
    email: string
  ): MakeBookingCommand {
    const command = new MakeBookingCommand();

    command.restaurant = restaurant;
    command.table = table;
    command.bookingDateTime = moment(bookingDateTime, "YYYY-MM-DD HH:mm");
    command.name = name;
    command.email = email;

    return command;
  }
}

export { MakeBookingCommand };
