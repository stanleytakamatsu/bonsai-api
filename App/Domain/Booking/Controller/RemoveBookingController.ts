import { ActionController } from "../../../Core/Controller/ActionController";
import { IHttpRequest } from "../../../Core/HttpServer/IHttpRequest";
import { IHttpResponse } from "../../../Core/HttpServer/IHttpResponse";
import { RemoveBookingCommand } from "../Type/Command/UseCase/RemoveBookingCommand";
import { GetBookingQuery } from "../Type/Query/UseCase/GeBookingQuery";
import { IGetBooking } from "../UseCase/IGetBooking";
import { IRemoveBooking } from "../UseCase/IRemoveBooking";
import { IRemoveBookingController } from "./IRemoveBookingController";

class RemoveBookingController extends ActionController implements IRemoveBookingController {
  public constructor(
    private readonly getBooking: IGetBooking,
    private readonly removeBooking: IRemoveBooking
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const getBookingQuery = GetBookingQuery.create(request.Params.bookingGuid);

      const booking = await this.getBooking.execute(getBookingQuery);

      const removeBookingCommand = RemoveBookingCommand.create(booking);

      await this.removeBooking.execute(removeBookingCommand);

      return this.createSuccessResponse({
        message: `Booking removed with successfully.`
      });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { RemoveBookingController };
