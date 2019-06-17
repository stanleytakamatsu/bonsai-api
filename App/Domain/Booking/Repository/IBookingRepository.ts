import { Booking } from "../Entity/Booking";
import { ICreateBookingCommand } from "../Type/Command/Repository/ICreateBookingCommand";
import { IFindBookingByGuidQuery } from "../Type/Query/Repository/IFindBookingByGuidQuery";
import { IFindBookingsQuery } from "../Type/Query/Repository/IFindBookingsQuery";
import { IDeleteBookingCommand } from "../Type/Command/Repository/IDeleteBookingCommand";
import { IUpdateBookingCommand } from "../Type/Command/Repository/IUpdateBookingCommand";

interface IBookingRepository {
  create(command: ICreateBookingCommand): Promise<void>;
  delete(command: IDeleteBookingCommand): Promise<void>;
  update(command: IUpdateBookingCommand): Promise<void>;
  findAll(query: IFindBookingsQuery): Promise<Booking[]>;
  findOneByGuid(query: IFindBookingByGuidQuery): Promise<Booking>;
}

const IBookingRepository = Symbol.for("IBookingRepository");

export { IBookingRepository };
