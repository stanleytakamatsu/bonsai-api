import { Booking } from "../../../Entity/Booking";

interface ICreateBookingCommand {
  Booking: Booking;
}

const ICreateBookingCommand = Symbol.for("ICreateBookingCommand");

export { ICreateBookingCommand };
