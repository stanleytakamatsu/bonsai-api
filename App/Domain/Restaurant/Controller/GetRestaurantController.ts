import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetRestaurantParameterFactory } from "../Factory/GetRestaurantParameterFactory";
import { RestaurantMapper } from "../Type/Mapper/RestaurantMapper";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetRestaurantValidator } from "../Validator/IGetRestaurantValidator";
import { IGetRestaurantController } from "./IGetRestaurantController";

class GetRestaurantController extends ActionController implements IGetRestaurantController {
  public constructor(
    private readonly getRestaurant: IGetRestaurant,
    private readonly validator: IGetRestaurantValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = GetRestaurantParameterFactory.create(request);

      this.validator.validate(params);

      const query = GetRestaurantQuery.create(params.Guid);

      const restaurant = await this.getRestaurant.execute(query);

      const mapper = RestaurantMapper.create(restaurant);

      return this.createSuccessResponse({
        data: mapper,
        message: `The restaurant with Guid "${params.Guid}" returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetRestaurantController };
