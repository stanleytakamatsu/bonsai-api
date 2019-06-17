import { Booking } from "../../../Entity/Booking";

interface IUpdateBookingCommand {
  Booking: Booking;
}

const IUpdateBookingCommand = Symbol.for("IUpdateBookingCommand");

export { IUpdateBookingCommand };
