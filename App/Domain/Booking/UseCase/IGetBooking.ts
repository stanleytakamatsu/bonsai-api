import { Booking } from "../Entity/Booking";
import { IGetBookingQuery } from "../Type/Query/UseCase/IGetBookingQuery";

interface IGetBooking {
  execute(query: IGetBookingQuery): Promise<Booking>;
}

const IGetBooking = Symbol.for("IGetBooking");

export { IGetBooking };
