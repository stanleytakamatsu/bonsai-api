import { Booking } from "../Entity/Booking";
import { IFindBookingsQuery } from "../Type/Query/Service/IFindBookingsQuery";
import { IFindBookingByGuidQuery } from "../Type/Query/Service/IFindBookingByGuidQuery";

interface IBookingFinderService {
  findAll(query: IFindBookingsQuery): Promise<Booking[]>;
  findOneByGuid(query: IFindBookingByGuidQuery): Promise<Booking>;
}

const IBookingFinderService = Symbol.for("IBookingFinderService");

export { IBookingFinderService };
