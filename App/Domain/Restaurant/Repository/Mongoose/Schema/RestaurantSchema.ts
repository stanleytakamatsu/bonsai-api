import { SchemaDefinition } from "mongoose";
import { BusinessHourSchema } from "./BusinessHourSchema";

const RestaurantSchema: SchemaDefinition = {
  createdAt: Date,
  name: { type: String, required: true, unique: true },
  businessHours: [BusinessHourSchema],
  guid: { type: String, required: true, unique: true },
  updatedAt: Date
};

export { RestaurantSchema };
