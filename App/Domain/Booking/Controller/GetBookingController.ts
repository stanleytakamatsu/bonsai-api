import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { BookingMapper } from "../Type/Mapper/BookingMapper";
import { GetBookingQuery } from "../Type/Query/UseCase/GeBookingQuery";
import { IGetBooking } from "../UseCase/IGetBooking";
import { IGetBookingsController } from "./IGetBookingsController";

class GetBookingController extends ActionController implements IGetBookingsController {
  public constructor(private readonly getBookings: IGetBooking) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getBookingsQuery = GetBookingQuery.create(request.Params.bookingGuid);

      const booking = await this.getBookings.execute(getBookingsQuery);

      const mapper = BookingMapper.create(booking);

      return this.createSuccessResponse({
        data: mapper,
        message: `Retrieve booking with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetBookingController };
