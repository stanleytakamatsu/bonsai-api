import * as _ from "lodash";
import { Document, Model, Schema, SchemaDefinition } from "mongoose";
import { IMongooseConnection } from "../Connection/IMongooseConnection";
import { IIndexDefinitions } from "../Type/Index/IIndexDefinitions";

abstract class MongooseRepository<T extends Document> {
  public static ERROR_CODE_DUPLICATED = "11000";
  protected documentModel: Model<T>;

  public constructor(
    connection: IMongooseConnection,
    collectionName: string,
    schemaDefinition: SchemaDefinition,
    indexDefinitions?: IIndexDefinitions
  ) {
    const schema = new Schema(schemaDefinition);

    if (indexDefinitions) {
      indexDefinitions.Indexes.forEach(indexDefinition => {
        schema.index(indexDefinition.IndexSchema, indexDefinition.IndexOptions);
      });
    }

    schema.virtual("id").get(function(this: T) {
      return this._id;
    });

    this.documentModel = connection.model<T>(collectionName, schema, collectionName);
  }
}

export { MongooseRepository };
