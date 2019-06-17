import { IGetBookingsQuery } from "../Type/Query/UseCase/IGetBookingsQuery";
import { Booking } from "../Entity/Booking";

interface IGetBookings {
  execute(query: IGetBookingsQuery): Promise<Booking[]>;
}

const IGetBookings = Symbol.for("IGetBookings");

export { IGetBookings };
