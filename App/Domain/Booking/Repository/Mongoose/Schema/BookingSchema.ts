import { SchemaDefinition, Schema } from "mongoose";

const BookingSchema: SchemaDefinition = {
  createdAt: Date,
  tableCode: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookingDateTime: { type: Date, required: true },
  restaurantId: { type: Schema.Types.ObjectId, required: true, index: true },
  guid: { type: String, required: true, unique: true },
  updatedAt: Date
};

export { BookingSchema };
