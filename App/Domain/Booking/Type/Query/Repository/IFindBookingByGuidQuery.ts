interface IFindBookingByGuidQuery {
  BookingGuid: string;
}

const IFindBookingByGuidQuery = Symbol.for("IFindBookingByGuidQuery");

export { IFindBookingByGuidQuery };
