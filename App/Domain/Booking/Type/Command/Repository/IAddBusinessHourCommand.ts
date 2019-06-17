import { Restaurant } from "../../../Entity/Restaurant";
import { BusinessHour } from "../../../Entity/BusinessHour";

interface IAddBusinessHourCommand {
  Restaurant: Restaurant;
  BusinessHour: BusinessHour;
}

const IAddBusinessHourCommand = Symbol.for("IAddBusinessHourCommand");

export { IAddBusinessHourCommand };
