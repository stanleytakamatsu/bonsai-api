import { IRemoveBookingCommand } from "../Type/Command/UseCase/IRemoveBookingCommand";

interface IRemoveBooking {
  execute(command: IRemoveBookingCommand): Promise<void>;
}

const IRemoveBooking = Symbol.for("IRemoveBooking");

export { IRemoveBooking };
