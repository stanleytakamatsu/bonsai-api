import { IAddBusinessHourCommand } from "../Type/Command/UseCase/IAddBusinessHourCommand";

interface IMakeBooking {
  execute(query: IAddBusinessHourCommand): Promise<void>;
}

const IMakeBooking = Symbol.for("IMakeBooking");

export { IMakeBooking };
