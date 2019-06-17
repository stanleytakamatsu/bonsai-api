import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { AddBusinessHourParameterFactory } from "../Factory/AddBusinessHourParameterFactory";
import { AddBusinessHourCommand } from "../Type/Command/UseCase/AddBusinessHourCommand";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { IAddBusinessHour } from "../UseCase/IAddBusinessHour";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IAddBusinessHourValidator } from "../Validator/IAddBusinessHourValidator";
import { IAddBusinessHourController } from "./IAddBusinessHourController";

class AddBusinessHourController extends ActionController implements IAddBusinessHourController {
  public constructor(
    private readonly addBusinessHour: IAddBusinessHour,
    private readonly getRestaurant: IGetRestaurant,
    private readonly validator: IAddBusinessHourValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = AddBusinessHourParameterFactory.create(request);

      this.validator.validate(params);

      const getRestaurantQuery = GetRestaurantQuery.create(params.RestaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const command = AddBusinessHourCommand.create(
        params.Weekday,
        params.StartHour,
        params.EndHour,
        restaurant
      );

      await this.addBusinessHour.execute(command);

      return this.createSuccessResponse({
        message: "Added a business hour."
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { AddBusinessHourController };
