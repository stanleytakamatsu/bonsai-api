import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetBusinessHoursParameterFactory } from "../Factory/GetBusinessHoursParameterFactory";
import { BusinessHourListMapper } from "../Type/Mapper/BusinessHourListMapper";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetBusinessHoursValidator } from "../Validator/IGetBusinessHoursValidator";
import { IGetRestaurantController } from "./IGetRestaurantController";

class GetBusinessHoursController extends ActionController implements IGetRestaurantController {
  public constructor(
    private readonly getRestaurant: IGetRestaurant,
    private readonly validator: IGetBusinessHoursValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = GetBusinessHoursParameterFactory.create(request);

      this.validator.validate(params);

      const query = GetRestaurantQuery.create(params.RestaurantGuid);

      const restaurant = await this.getRestaurant.execute(query);

      const mapper = BusinessHourListMapper.create(restaurant.BusinessHours);

      return this.createSuccessResponse({
        data: mapper.Data,
        message: `The list of restaurant business hours returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetBusinessHoursController };
