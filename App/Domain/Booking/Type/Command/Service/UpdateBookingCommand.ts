import { Booking } from "../../../Entity/Booking";
import { IUpdateBookingCommand } from "./IUpdateBookingCommand";

class UpdateBookingCommand implements IUpdateBookingCommand {
  private booking: Booking;

  public get Booking(): Booking {
    return this.booking;
  }

  public static create(booking: Booking): UpdateBookingCommand {
    const command = new UpdateBookingCommand();

    command.booking = booking;

    return command;
  }
}

export { UpdateBookingCommand };
