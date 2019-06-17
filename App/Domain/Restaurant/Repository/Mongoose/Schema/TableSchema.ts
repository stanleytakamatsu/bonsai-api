import { SchemaDefinition, Schema } from "mongoose";

const TableSchema: SchemaDefinition = {
  createdAt: Date,
  code: { type: String, required: true },
  restaurantId: { type: Schema.Types.ObjectId, required: true, index: true },
  guid: { type: String, required: true, unique: true },
  updatedAt: Date
};

export { TableSchema };
