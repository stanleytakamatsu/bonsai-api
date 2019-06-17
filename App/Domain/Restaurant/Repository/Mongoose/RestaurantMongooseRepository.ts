import * as _ from "lodash";
import * as mongoose from "mongoose";
import { IMongooseConnection } from "../../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { MongooseRepository } from "../../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository";
import { ConflictRecordError } from "../../../../Core/Error/Repository/ConflictRecordError";
import { RecordNotFoundError } from "../../../../Core/Error/Repository/RecordNotFoundError";
import { SaveRecordError } from "../../../../Core/Error/Repository/SaveRecordError";
import { Restaurant } from "../../Entity/Restaurant";
import { IAddBusinessHourCommand } from "../../Type/Command/Repository/IAddBusinessHourCommand";
import { ICreateRestaurantCommand } from "../../Type/Command/Repository/ICreateRestaurantCommand";
import { IFindByGuidRestaurantQuery } from "../../Type/Query/Repository/IFindByGuidRestaurantQuery";
import { IRestaurantRepository } from "../IRestaurantRepository";
import { IBusinessHourModel } from "../Model/IBusinessHourModel";
import { IRestaurantMongooseModel } from "./Model/IRestaurantMongooseModel";
import { RestaurantSchema } from "./Schema/RestaurantSchema";

class RestaurantMongooseRepository extends MongooseRepository<IRestaurantMongooseModel>
  implements IRestaurantRepository {
  private static readonly COLLECTION_NAME = "Restaurants";

  public constructor(connection: IMongooseConnection) {
    super(connection, RestaurantMongooseRepository.COLLECTION_NAME, RestaurantSchema);
  }

  public async createRestaurant(command: ICreateRestaurantCommand): Promise<void> {
    try {
      const restaurant: Partial<IRestaurantMongooseModel> = {
        createdAt: command.Restaurant.CreatedAt.toDate(),
        guid: command.Restaurant.Guid,
        name: command.Restaurant.Name,
        updatedAt: command.Restaurant.UpdatedAt.toDate()
      };

      await this.documentModel.create(restaurant);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async addBusinessHour(command: IAddBusinessHourCommand): Promise<void> {
    try {
      const businessHour: Partial<IBusinessHourModel> = {
        guid: command.BusinessHour.Guid,
        weekday: String(command.BusinessHour.Weekday),
        startHour: command.BusinessHour.StartHour,
        endHour: command.BusinessHour.EndHour
      };

      await this.documentModel
        .update(
          {
            _id: mongoose.Types.ObjectId(command.Restaurant.Id)
          },
          {
            $push: { businessHours: businessHour }
          }
        )
        .exec();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  public async findByGuid(query: IFindByGuidRestaurantQuery): Promise<Restaurant> {
    let record;

    try {
      const mongoQuery = {
        guid: query.Guid
      };

      record = await this.documentModel.findOne(mongoQuery).exec();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }

    if (_.isEmpty(record)) {
      throw new RecordNotFoundError(`The restaurant with guid ${query.Guid} not found.`);
    }

    return Restaurant.createFromRecord(record);
  }

  public async findAll(): Promise<Restaurant[]> {
    let records;

    try {
      records = await this.documentModel.find().exec();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }

    const list = Array.from<IRestaurantMongooseModel>(records).map(record =>
      Restaurant.createFromRecord(record)
    );

    return list;
  }

  protected throwSpecificErrorBasedOn(error: any): void {
    switch (String(error.code)) {
      case RestaurantMongooseRepository.ERROR_CODE_DUPLICATED:
        throw new ConflictRecordError(error.message);
      default:
        throw new SaveRecordError(error.message, error);
    }
  }
}

export { RestaurantMongooseRepository };
