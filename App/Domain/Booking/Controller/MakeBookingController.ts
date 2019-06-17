import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { GetRestaurantQuery } from "../../Restaurant/Type/Query/UseCase/GetRestaurantQuery";
import { GetTableQuery } from "../../Restaurant/Type/Query/UseCase/GetTableQuery";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { IGetTable } from "../../Restaurant/UseCase/IGetTable";
import { MakeBookingParameterFactory } from "../Factory/MakeBookingParameterFactory";
import { MakeBookingCommand } from "../Type/Command/UseCase/MakeBookingCommand";
import { IMakeBooking } from "../UseCase/IMakeBooking";
import { IMakeBookingValidator } from "../Validator/IMakeBookingValidator";
import { IMakeBookingController } from "./IMakeBookingController";

class MakeBookingController extends ActionController implements IMakeBookingController {
  public constructor(
    private readonly getTable: IGetTable,
    private readonly getRestaurant: IGetRestaurant,
    private readonly makeBooking: IMakeBooking,
    private readonly validator: IMakeBookingValidator
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const params = MakeBookingParameterFactory.create(request);

      this.validator.validate(params);

      const getRestaurantQuery = GetRestaurantQuery.create(params.RestaurantGuid);

      const restaurant = await this.getRestaurant.execute(getRestaurantQuery);

      const getTableQuery = GetTableQuery.create(params.TableGuid, restaurant);

      const table = await this.getTable.execute(getTableQuery);

      const makeBookingCommand = MakeBookingCommand.create(
        restaurant,
        table,
        params.BookingDateTime,
        params.Name,
        params.Email
      );

      await this.makeBooking.execute(makeBookingCommand);

      return this.createSuccessResponse({
        message: `Booking made with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { MakeBookingController };
