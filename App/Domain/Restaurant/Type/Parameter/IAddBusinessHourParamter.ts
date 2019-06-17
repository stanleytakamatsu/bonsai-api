import { WeekDays } from "../../../../Core/Type/Options/WeekDays";

interface IAddBusinessHourParamter {
  RestaurantGuid: string;
  Weekday: WeekDays;
  StartHour: string;
  EndHour: string;
}

export { IAddBusinessHourParamter };
