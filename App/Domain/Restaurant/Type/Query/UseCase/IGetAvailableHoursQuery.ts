import { Restaurant } from "../../../Entity/Restaurant";
import * as moment from "moment";

interface IGetAvailableHoursQuery {
  Restaurant: Restaurant;
  BookingDateTime: moment.Moment;
}

const IGetAvailableHoursQuery = Symbol.for("IGetAvailableHoursQuery");

export { IGetAvailableHoursQuery };
