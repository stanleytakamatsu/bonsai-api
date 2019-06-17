import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IMakeBookingParamter } from "../Type/Parameter/IMakeBookingParamter";

class MakeBookingParameterFactory {
  public static create(request: IHttpRequest): IMakeBookingParamter {
    const body = request.Body || {};

    const restaurantGuid = body.restaurantGuid;
    const tableGuid = body.tableGuid;
    const bookingDateTime = body.bookingDateTime;
    const name = body.name;
    const email = body.email;

    return {
      RestaurantGuid: restaurantGuid,
      TableGuid: tableGuid,
      BookingDateTime: bookingDateTime,
      Name: name,
      Email: email
    };
  }
}

export { MakeBookingParameterFactory };
