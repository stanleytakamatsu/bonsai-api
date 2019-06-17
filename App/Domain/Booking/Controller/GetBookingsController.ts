import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetRestaurantQuery } from "../../Restaurant/Type/Query/UseCase/GetRestaurantQuery";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { BookingListMapper } from "../Type/Mapper/BookingListMapper";
import { GetBookingsQuery } from "../Type/Query/UseCase/GetBookingsQuery";
import { IGetBookings } from "../UseCase/IGetBookings";
import { IGetBookingsController } from "./IGetBookingsController";

class GetBookingsController extends ActionController implements IGetBookingsController {
  public constructor(
    private readonly getBookings: IGetBookings,
    private readonly getRestaurant: IGetRestaurant
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getRestaurantQuery = GetRestaurantQuery.create(request.QueryString.restaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const getBookingsQuery = GetBookingsQuery.create(restaurant);

      const bookings = await this.getBookings.execute(getBookingsQuery);

      const mapper = BookingListMapper.create(bookings);

      return this.createSuccessResponse({
        data: mapper.Data,
        message: `Retrieve booking list with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetBookingsController };
