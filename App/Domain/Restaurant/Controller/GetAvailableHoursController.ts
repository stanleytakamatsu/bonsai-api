import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetAvailableHoursQuery } from "../Type/Query/UseCase/GetAvailableHoursQuery";
import { GetRestaurantQuery } from "../Type/Query/UseCase/GetRestaurantQuery";
import { IGetAvailableHours } from "../UseCase/IGetAvailableHours";
import { IGetRestaurant } from "../UseCase/IGetRestaurant";
import { IGetAvailableHoursController } from "./IGetAvailableHoursController";

class GetAvailableHoursController extends ActionController implements IGetAvailableHoursController {
  public constructor(
    private readonly getAvailableHours: IGetAvailableHours,
    private readonly getRestaurant: IGetRestaurant
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getRestaurantQuery = GetRestaurantQuery.create(request.Params.restaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const bookingDate = request.QueryString.bookingDate;

      const query = GetAvailableHoursQuery.create(restaurant, bookingDate);

      const availableHours = await this.getAvailableHours.execute(query);

      return this.createSuccessResponse({
        data: availableHours,
        message: `The list of available hours returned with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetAvailableHoursController };
