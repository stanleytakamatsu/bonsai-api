import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetRestaurantQuery } from "../../Restaurant/Type/Query/UseCase/GetRestaurantQuery";
import { GetTableQuery } from "../../Restaurant/Type/Query/UseCase/GetTableQuery";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { IGetTable } from "../../Restaurant/UseCase/IGetTable";
import { EditBookingCommand } from "../Type/Command/UseCase/EditBookingCommand";
import { GetBookingQuery } from "../Type/Query/UseCase/GeBookingQuery";
import { IEditBooking } from "../UseCase/IEditBooking";
import { IGetBooking } from "../UseCase/IGetBooking";
import { IEditBookingController } from "./IEditBookingController";

class EditBookingController extends ActionController implements IEditBookingController {
  public constructor(
    private readonly getBooking: IGetBooking,
    private readonly getTable: IGetTable,
    private readonly getRestaurant: IGetRestaurant,
    private readonly editBooking: IEditBooking
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getBookingQuery = GetBookingQuery.create(request.Params.bookingGuid);

      const booking = await this.getBooking.execute(getBookingQuery);

      const getRestaurantQuery = GetRestaurantQuery.create(request.Body.restaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const getTableQuery = GetTableQuery.create(request.Body.tableGuid, restaurant);

      const table = await this.getTable.execute(getTableQuery);

      const editBookingCommand = EditBookingCommand.create(
        table,
        booking,
        request.Body.bookingDateTime
      );

      await this.editBooking.execute(editBookingCommand);

      return this.createSuccessResponse({
        message: `Booking edited with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { EditBookingController };
