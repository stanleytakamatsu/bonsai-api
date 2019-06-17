import { IGetBookingQuery } from "./IGetBookingQuery";

class GetBookingQuery implements IGetBookingQuery {
  private bookingGuid: string;

  public get BookingGuid(): string {
    return this.bookingGuid;
  }

  public static create(bookingGuid: string): GetBookingQuery {
    const query = new GetBookingQuery();

    query.bookingGuid = bookingGuid;

    return query;
  }
}

export { GetBookingQuery };
