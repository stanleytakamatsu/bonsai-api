import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IAddTableParamter } from "../Type/Parameter/IAddTableParamter";

class AddTableParameterFactory {
  public static create(request: IHttpRequest): IAddTableParamter {
    const code = request.Body ? request.Body.code : undefined;
    const restaurantGuid = request.Body ? request.Params.restaurantGuid : undefined;

    return {
      RestaurantGuid: restaurantGuid,
      Code: code
    };
  }
}

export { AddTableParameterFactory };
