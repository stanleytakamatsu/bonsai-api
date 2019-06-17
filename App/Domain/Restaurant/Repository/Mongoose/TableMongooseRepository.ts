import { IMongooseConnection } from "../../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { MongooseRepository } from "../../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository";
import { ConflictRecordError } from "../../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../../Core/Error/Repository/SaveRecordError";
import { ICreateTableCommand } from "../../Type/Command/Repository/ICreateTableCommand";
import { ITableRepository } from "../ITableRepository";
import { ITableMongooseModel } from "./Model/ITableMongooseModel";
import { TableSchema } from "./Schema/TableSchema";
import { IndexDefinition } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinition";
import { IndexDefinitions } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinitions";

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
