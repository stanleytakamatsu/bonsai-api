import { IUpdateBookingCommand } from "../Type/Command/Service/IUpdateBookingCommand";

interface IBookingUpdaterService {
  update(command: IUpdateBookingCommand): Promise<void>;
}

const IBookingUpdaterService = Symbol.for("IBookingUpdaterService");

export { IBookingUpdaterService };
