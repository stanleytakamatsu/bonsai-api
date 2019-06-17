import * as _ from "lodash";

import { IMongooseConnection } from "../../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { MongooseRepository } from "../../../../Core/Database/Driver/Mongoose/Repository/MongooseRepository";
import { ConflictRecordError } from "../../../../Core/Error/Repository/ConflictRecordError";
import { SaveRecordError } from "../../../../Core/Error/Repository/SaveRecordError";
import { ICreateBookingCommand } from "../../Type/Command/Repository/ICreateBookingCommand";
import { IBookingRepository } from "../IBookingRepository";
import { IBookingMongooseModel } from "./Model/IBookingMongooseModel";
import { BookingSchema } from "./Schema/BookingSchema";
import { IFindBookingsQuery } from "../../Type/Query/Repository/IFindBookingsQuery";
import { Booking } from "../../Entity/Booking";
import { IBookingModel } from "../Model/IBookingModel";
import { IndexDefinition } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinition";
import { IndexDefinitions } from "../../../../Core/Database/Driver/Mongoose/Type/Index/IndexDefinitions";
import { FindRecordError } from "../../../../Core/Error/Repository/FindRecordError";
import { IFindBookingByGuidQuery } from "../../Type/Query/Repository/IFindBookingByGuidQuery";
import { RecordNotFoundError } from "../../../../Core/Error/Repository/RecordNotFoundError";
import { IDeleteBookingCommand } from "../../Type/Command/Repository/IDeleteBookingCommand";
import { IUpdateBookingCommand } from "../../Type/Command/Repository/IUpdateBookingCommand";

class BookingMongooseRepository extends MongooseRepository<IBookingMongooseModel>
  implements IBookingRepository {
  private static readonly COLLECTION_NAME = "Bookings";

  public constructor(connection: IMongooseConnection) {
    const indexDefinition = IndexDefinition.create(
      {
        tableCode: 1,
        bookingDateTime: 1,
        restaurantId: 1
      },
      { unique: true }
    );

    const indexDefinitions = IndexDefinitions.create(indexDefinition);

    super(connection, BookingMongooseRepository.COLLECTION_NAME, BookingSchema, indexDefinitions);
  }

  public async create(command: ICreateBookingCommand): Promise<void> {
    try {
      const booking: Partial<IBookingMongooseModel> = {
        createdAt: command.Booking.CreatedAt.toDate(),
        guid: command.Booking.Guid,
        restaurantId: command.Booking.RestaurantId,
        tableCode: command.Booking.TableCode,
        bookingDateTime: command.Booking.BookingDateTime.toDate(),
        name: command.Booking.Name,
        email: command.Booking.Email,
        updatedAt: command.Booking.UpdatedAt.toDate()
      };

      await this.documentModel.create(booking);
    } catch (error) {
      this.throwSpecificSaverErrorBasedOn(error);
    }
  }

  public async findAll(query: IFindBookingsQuery): Promise<Booking[]> {
    let record: IBookingModel[];

    try {
      const criteria = query.Filter.Criteria;
      const options = query.Filter.Options;
      const mongoQuery = {
        ...{
          restaurantId: query.Restaurant.Id
        },
        ...criteria
      };

      record = await this.documentModel.find(mongoQuery, options).exec();

      return Array.from(record || []).map(booking => Booking.createFromRecord(booking));
    } catch (error) {
      this.throwSpecificFindErrorBasedOn(error);
    }
  }

  public async findOneByGuid(query: IFindBookingByGuidQuery): Promise<Booking> {
    let record: IBookingModel;

    try {
      const mongoQuery = {
        guid: query.BookingGuid
      };

      record = await this.documentModel.findOne(mongoQuery).exec();
    } catch (error) {
      this.throwSpecificFindErrorBasedOn(error);
    }

    if (_.isEmpty(record)) {
      throw new RecordNotFoundError(`The booking with guid ${query.BookingGuid} not found.`);
    }

    return Booking.createFromRecord(record);
  }

  public async delete(command: IDeleteBookingCommand): Promise<void> {
    try {
      const booking: Partial<IBookingMongooseModel> = {
        _id: command.Booking.Id
      };

      await this.documentModel.deleteOne(booking);
    } catch (error) {
      this.throwSpecificSaverErrorBasedOn(error);
    }
  }

  public async update(command: IUpdateBookingCommand): Promise<void> {
    try {
      const filter: Partial<IBookingMongooseModel> = {
        _id: command.Booking.Id
      };
      const doc: Partial<IBookingMongooseModel> = {
        bookingDateTime: command.Booking.BookingDateTime.toDate(),
        tableCode: command.Booking.TableCode,
        updatedAt: command.Booking.UpdatedAt.toDate()
      };

      await this.documentModel.findOneAndUpdate(filter, doc).exec();
    } catch (error) {
      this.throwSpecificSaverErrorBasedOn(error);
    }
  }

  protected throwSpecificSaverErrorBasedOn(error: any): void {
    switch (String(error.code)) {
      case BookingMongooseRepository.ERROR_CODE_DUPLICATED:
        throw new ConflictRecordError(error.message);
      default:
        throw new SaveRecordError(error.message, error);
    }
  }

  protected throwSpecificFindErrorBasedOn(error: any): void {
    throw new FindRecordError(error.message, error);
  }
}

export { BookingMongooseRepository };
