import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IGetRestaurantParamter } from "../Type/Parameter/IGetRestaurantParamter";

class GetRestaurantParameterFactory {
  public static create(request: IHttpRequest): IGetRestaurantParamter {
    const guid = request.Params ? request.Params.restaurantGuid : undefined;

    return {
      Guid: guid
    };
  }
}

export { GetRestaurantParameterFactory };
