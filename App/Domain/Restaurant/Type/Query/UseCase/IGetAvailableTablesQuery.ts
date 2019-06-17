import * as moment from "moment";
import { Restaurant } from "../../../Entity/Restaurant";

interface IGetAvailableTablesQuery {
  Restaurant: Restaurant;
  BookingDateTime: moment.Moment;
}

const IGetAvailableTablesQuery = Symbol.for("IGetAvailableTablesQuery");

export { IGetAvailableTablesQuery };
