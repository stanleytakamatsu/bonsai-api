import { IDeleteBookingCommand } from "../Type/Command/Repository/IDeleteBookingCommand";

interface IBookingRemoverService {
  remove(command: IDeleteBookingCommand): Promise<void>;
}

const IBookingRemoverService = Symbol.for("IBookingRemoverService");

export { IBookingRemoverService };
