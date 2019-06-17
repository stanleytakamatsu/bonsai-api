interface IBookingModel {
  id: string;
  guid: string;
  restaurantId: string;
  tableCode: string;
  bookingDateTime: Date;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IBookingModel };
