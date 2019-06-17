import { IMakeBookingCommand } from "../Type/Command/UseCase/IMakeBookingCommand";

interface IMakeBooking {
  execute(command: IMakeBookingCommand): Promise<void>;
}

const IMakeBooking = Symbol.for("IMakeBooking");

export { IMakeBooking };
