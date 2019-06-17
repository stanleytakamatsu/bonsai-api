import { Booking } from "../../../Entity/Booking";

interface IRemoveBookingCommand {
  Booking: Booking;
}

const IRemoveBookingCommand = Symbol.for("IRemoveBookingCommand");

export { IRemoveBookingCommand };
