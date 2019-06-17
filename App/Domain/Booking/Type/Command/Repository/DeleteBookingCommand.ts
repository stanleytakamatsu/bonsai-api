import { Booking } from "../../../Entity/Booking";
import { IDeleteBookingCommand } from "./IDeleteBookingCommand";

class DeleteBookingCommand implements IDeleteBookingCommand {
  private booking: Booking;

  public get Booking(): Booking {
    return this.booking;
  }

  public static create(booking: Booking): DeleteBookingCommand {
    const command = new DeleteBookingCommand();

    command.booking = booking;

    return command;
  }
}

export { DeleteBookingCommand };
