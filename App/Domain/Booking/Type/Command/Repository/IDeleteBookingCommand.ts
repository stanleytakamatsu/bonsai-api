import { Booking } from "../../../Entity/Booking";

interface IDeleteBookingCommand {
  Booking: Booking;
}

const IDeleteBookingCommand = Symbol.for("IDeleteBookingCommand");

export { IDeleteBookingCommand };
