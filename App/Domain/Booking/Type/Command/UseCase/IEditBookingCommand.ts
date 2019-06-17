import * as moment from "moment-timezone";

import { Booking } from "../../../Entity/Booking";
import { Table } from "../../../../Restaurant/Entity/Table";

interface IEditBookingCommand {
  Booking: Booking;

  BookingDateTime: moment.Moment;

  Table: Table;
}

const IEditBookingCommand = Symbol.for("IEditBookingCommand");

export { IEditBookingCommand };
