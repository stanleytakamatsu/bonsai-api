import { IContainerService } from "../../../Core/Container/IContainerService";
import { IMongooseConnection } from "../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IRestaurantRepository } from "../Repository/IRestaurantRepository";
import { RestaurantMongooseRepository } from "../Repository/Mongoose/RestaurantMongooseRepository";

class RestaurantRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerRestaurantRepository();
  }

  private async registerRestaurantRepository(): Promise<void> {
    this.container.register<IRestaurantRepository>(
      IRestaurantRepository,
      () =>
        new Promise<IRestaurantRepository>(async resolve => {
          const connection = await this.container.get<IMongooseConnection>(IMongooseConnection);
          const repository = new RestaurantMongooseRepository(connection);

          resolve(repository);
        })
    );
  }
}

export { RestaurantRepositoryProvider };
