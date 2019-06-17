import { IContainerService } from "../../../Core/Container/IContainerService";
import { IMongooseConnection } from "../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { BookingMongooseRepository } from "../Repository/Mongoose/BookingMongooseRepository";

class BookingRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerBookingRepository();
  }

  private async registerBookingRepository(): Promise<void> {
    this.container.register<IBookingRepository>(
      IBookingRepository,
      () =>
        new Promise<IBookingRepository>(async resolve => {
          const connection = await this.container.get<IMongooseConnection>(IMongooseConnection);
          const repository = new BookingMongooseRepository(connection);

          resolve(repository);
        })
    );
  }
}

export { BookingRepositoryProvider };
