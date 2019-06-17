import { ICreateBookingCommand } from "../Type/Command/Service/ICreateBookingCommand";

interface IBookingCreatorService {
  create(command: ICreateBookingCommand): Promise<void>;
}

const IBookingCreatorService = Symbol.for("IBookingCreatorService");

export { IBookingCreatorService };
