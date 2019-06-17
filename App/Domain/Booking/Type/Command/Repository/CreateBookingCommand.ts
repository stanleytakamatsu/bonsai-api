import { ICreateBookingCommand } from "./ICreateBookingCommand";
import { Booking } from "../../../Entity/Booking";

class CreateBookingCommand implements ICreateBookingCommand {
  private booking: Booking;

  public get Booking(): Booking {
    return this.booking;
  }

  public static create(booking: Booking): CreateBookingCommand {
    const command = new CreateBookingCommand();

    command.booking = booking;

    return command;
  }
}

export { CreateBookingCommand };
