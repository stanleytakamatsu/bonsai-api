import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IAddBusinessHourParamter } from "../Type/Parameter/IAddBusinessHourParamter";
import { WeekDays } from "../../../Core/Type/Options/WeekDays";

class AddBusinessHourParameterFactory {
  public static create(request: IHttpRequest): IAddBusinessHourParamter {
    const body = request.Body || {};
    const params = request.Params || {};
    const weekday = body.weekday;
    const startHour = body.startHour;
    const endHour = body.endHour;
    const restaurantGuid = params.restaurantGuid;

    return {
      RestaurantGuid: restaurantGuid,
      Weekday: <WeekDays>weekday,
      StartHour: startHour,
      EndHour: endHour
    };
  }
}

export { AddBusinessHourParameterFactory };
