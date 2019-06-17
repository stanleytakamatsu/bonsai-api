import * as moment from "moment-timezone";

import { Restaurant } from "../../../../Restaurant/Entity/Restaurant";
import { Table } from "../../../../Restaurant/Entity/Table";

interface IMakeBookingCommand {
  Restaurant: Restaurant;
  Table: Table;
  BookingDateTime: moment.Moment;
  Name: string;
  Email: string;
}

const IMakeBookingCommand = Symbol.for("IMakeBookingCommand");

export { IMakeBookingCommand };
