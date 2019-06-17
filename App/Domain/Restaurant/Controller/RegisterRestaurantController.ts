import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { RegisterRestaurantParameterFactory } from "../Factory/RegisterRestaurantParameterFactory";
import { RegisterRestaurantCommand } from "../Type/Command/UseCase/RegisterRestaurantCommand";
import { IRegisterRestaurant } from "../UseCase/IRegisterRestaurant";
import { IRegisterRestaurantValidator } from "../Validator/IRegisterRestaurantValidator";
import { IRegisterRestaurantController } from "./IRegisterRestaurantController";

class RegisterRestaurantController extends ActionController
  implements IRegisterRestaurantController {
  public constructor(
    private readonly registerRestaurant: IRegisterRestaurant,
    private readonly validator: IRegisterRestaurantValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = RegisterRestaurantParameterFactory.create(request);

      this.validator.validate(params);

      const command = RegisterRestaurantCommand.create(params.Name);

      await this.registerRestaurant.execute(command);

      return this.createSuccessResponse({
        message: `The restaurant "${params.Name}" registered with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { RegisterRestaurantController };
