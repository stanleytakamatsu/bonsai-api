import { IContainerService } from "../../../Core/Container/IContainerService";
import { IMongooseConnection } from "../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection";
import { IProvider } from "../../../Core/Provider/IProvider";
import { ITableRepository } from "../Repository/ITableRepository";
import { TableMongooseRepository } from "../Repository/Mongoose/TableMongooseRepository";

class TableRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerTableRepository();
  }

  private async registerTableRepository(): Promise<void> {
    this.container.register<ITableRepository>(
      ITableRepository,
      () =>
        new Promise<ITableRepository>(async resolve => {
          const connection = await this.container.get<IMongooseConnection>(IMongooseConnection);
          const repository = new TableMongooseRepository(connection);

          resolve(repository);
        })
    );
  }
}

export { TableRepositoryProvider };
