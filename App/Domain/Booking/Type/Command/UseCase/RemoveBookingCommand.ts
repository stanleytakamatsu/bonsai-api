import { Booking } from "../../../Entity/Booking";
import { IRemoveBookingCommand } from "./IRemoveBookingCommand";

class RemoveBookingCommand implements IRemoveBookingCommand {
  private booking: Booking;

  public get Booking(): Booking {
    return this.booking;
  }

  public static create(booking: Booking): RemoveBookingCommand {
    const command = new RemoveBookingCommand();

    command.booking = booking;

    return command;
  }
}

export { RemoveBookingCommand };
