import { IEditBookingCommand } from "../Type/Command/UseCase/IEditBookingCommand";

interface IEditBooking {
  execute(command: IEditBookingCommand): Promise<void>;
}

const IEditBooking = Symbol.for("IEditBooking");

export { IEditBooking };
