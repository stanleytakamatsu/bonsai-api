import { SchemaDefinition } from "mongoose";

const BusinessHourSchema: SchemaDefinition = {
  guid: { type: String, required: true },
  weekday: { type: String, required: true },
  startHour: { type: Number, required: true },
  endHour: { type: Number, required: true }
};

export { BusinessHourSchema };
