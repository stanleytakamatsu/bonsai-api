import { IFindBookingByGuidQuery } from "./IFindBookingByGuidQuery";

class FindBookingByGuidQuery implements IFindBookingByGuidQuery {
  private bookingGuid: string;

  public get BookingGuid(): string {
    return this.bookingGuid;
  }

  public static create(bookingGuid: string): FindBookingByGuidQuery {
    const query = new FindBookingByGuidQuery();

    query.bookingGuid = bookingGuid;

    return query;
  }
}

export { FindBookingByGuidQuery };
