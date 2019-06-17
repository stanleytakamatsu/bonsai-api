import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IRegisterRestaurantParamter } from "../Type/Parameter/IRegisterRestaurantParamter";

class RegisterRestaurantParameterFactory {
  public static create(request: IHttpRequest): IRegisterRestaurantParamter {
    const name = request.Body ? request.Body.name : undefined;

    return {
      Name: name
    };
  }
}

export { RegisterRestaurantParameterFactory };
