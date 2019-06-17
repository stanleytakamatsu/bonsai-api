import * as _ from "lodash";

import { IMongooseConnection } from "../../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { MongooseRepository } from "../../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository";
import { IndexDefinition } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinition";
import { IndexDefinitions } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinitions";
import { ConflictRecordError } from "../../../../Core/Error/Repository/ConflictRecordError";
import { RecordNotFoundError } from "../../../../Core/Error/Repository/RecordNotFoundError";
import { SaveRecordError } from "../../../../Core/Error/Repository/SaveRecordError";
import { Table } from "../../Entity/Table";
import { ICreateTableCommand } from "../../Type/Command/Repository/ICreateTableCommand";
import { IFindTableByGuidQuery } from "../../Type/Query/Repository/IFindTableByGuidQuery";
import { ITableRepository } from "../ITableRepository";
import { ITableMongooseModel } from "./Model/ITableMongooseModel";
import { TableSchema } from "./Schema/TableSchema";
import { IGetTablesQuery } from "../../Type/Query/Repository/IGetTablesQuery";

class TableMongooseRepository extends MongooseRepository<ITableMongooseModel>
  implements ITableRepository {
  private static readonly COLLECTION_NAME = "Tables";

  public constructor(connection: IMongooseConnection) {
    const indexDefinition = IndexDefinition.create(
      {
        restaurantId: 1,
        code: 1
      },
      { unique: true }
    );

    const indexDefinitions = IndexDefinitions.create(indexDefinition);

    super(connection, TableMongooseRepository.COLLECTION_NAME, TableSchema, indexDefinitions);
  }

  public async create(command: ICreateTableCommand): Promise<void> {
    try {
      const table: Partial<ITableMongooseModel> = {
        createdAt: command.Table.CreatedAt.toDate(),
        guid: command.Table.Guid,
        restaurantId: command.Table.RestaurantId,
        code: command.Table.Code,
        updatedAt: command.Table.UpdatedAt.toDate()
      };

      await this.documentModel.create(table);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async findByGuid(query: IFindTableByGuidQuery): Promise<Table> {
    let record;

    try {
      const mongoQuery = {
        guid: query.Guid,
        restaurantId: query.Restaurant.Id
      };

      record = await this.documentModel.findOne(mongoQuery).exec();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }

    if (_.isEmpty(record)) {
      throw new RecordNotFoundError(`The Table with guid ${query.Guid} not found.`);
    }

    return Table.createFromRecord(record);
  }

  public async findAll(query: IGetTablesQuery): Promise<Table[]> {
    let record: ITableMongooseModel[];

    try {
      const mongoQuery = {
        restaurantId: query.Restaurant.Id
      };

      record = await this.documentModel.find(mongoQuery).exec();

      return Array.from(record || []).map(table => Table.createFromRecord(table));
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  protected throwSpecificErrorBasedOn(error: any): void {
    switch (String(error.code)) {
      case TableMongooseRepository.ERROR_CODE_DUPLICATED:
        throw new ConflictRecordError(error.message);
      default:
        throw new SaveRecordError(error.message, error);
    }
  }
}

export { TableMongooseRepository };
