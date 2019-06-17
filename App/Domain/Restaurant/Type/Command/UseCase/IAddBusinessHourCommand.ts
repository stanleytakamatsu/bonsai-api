import { Restaurant } from "../../../Entity/Restaurant";
import { WeekDays } from "../../../../../Core/Type/Options/WeekDays";

interface IAddBusinessHourCommand {
  Restaurant: Restaurant;
  Weekday: WeekDays;
  StartHour: number;
  EndHour: number;
}

const IAddBusinessHourCommand = Symbol.for("IAddBusinessHourCommand");

export { IAddBusinessHourCommand };
