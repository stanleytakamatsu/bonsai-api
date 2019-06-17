import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { RestaurantListMapper } from "../Type/Mapper/RestaurantListMapper";
import { IGetRestaurants } from "../UseCase/IGetRestaurants";
import { IGetRestaurantController } from "./IGetRestaurantController";

class GetRestaurantsController extends ActionController implements IGetRestaurantController {
  public constructor(private readonly getRestaurants: IGetRestaurants) {
    super();
  }

  public async perform(): Promise<IHttpResponse> {
    try {
      const restaurants = await this.getRestaurants.execute();

      const mapper = RestaurantListMapper.create(restaurants);

      return this.createSuccessResponse({
        data: mapper.Data,
        message: `The list of restaurants returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetRestaurantsController };
