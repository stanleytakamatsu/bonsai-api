interface IGetBookingQuery {
  BookingGuid: string;
}

const IGetBookingQuery = Symbol.for("IGetBookingQuery");

export { IGetBookingQuery };
