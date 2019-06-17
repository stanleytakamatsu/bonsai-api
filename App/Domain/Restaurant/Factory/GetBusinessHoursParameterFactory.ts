import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IGetBusinessHoursParamter } from "../Type/Parameter/IGetBusinessHoursParamter";

class GetBusinessHoursParameterFactory {
  public static create(request: IHttpRequest): IGetBusinessHoursParamter {
    const restaurantGuid = request.Params ? request.Params.restaurantGuid : undefined;

    return {
      RestaurantGuid: restaurantGuid
    };
  }
}

export { GetBusinessHoursParameterFactory };
