import { IContainerService } from "../../../Core/Container/IContainerService";
import { ILogger } from "../../../Core/Logger/ILogger";
import { IProvider } from "../../../Core/Provider/IProvider";
import { ITableCreatorService } from "../Service/ITableCreatorService";
import { AddTable } from "../UseCase/AddTable";
import { IAddTable } from "../UseCase/IAddTable";
import { IGetTable } from "../UseCase/IGetTable";
import { ITableFinderService } from "../Service/ITableFinderService";
import { GetTable } from "../UseCase/GetTable";
import { IGetTables } from "../UseCase/IGetTables";
import { GetTables } from "../UseCase/GetTables";

class TableUseCaseProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerAddTableUseCase();
    await this.registerGetTableUseCase();
    await this.registerGetTablesUseCase();
  }

  private async registerAddTableUseCase(): Promise<void> {
    this.container.register<IAddTable>(
      IAddTable,
      () =>
        new Promise<IAddTable>(async resolve => {
          const service = await this.container.get<ITableCreatorService>(ITableCreatorService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new AddTable(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetTableUseCase(): Promise<void> {
    this.container.register<IGetTable>(
      IGetTable,
      () =>
        new Promise<IGetTable>(async resolve => {
          const service = await this.container.get<ITableFinderService>(ITableFinderService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetTable(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetTablesUseCase(): Promise<void> {
    this.container.register<IGetTables>(
      IGetTables,
      () =>
        new Promise<IGetTables>(async resolve => {
          const service = await this.container.get<ITableFinderService>(ITableFinderService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetTables(service, logger);

          resolve(useCase);
        })
    );
  }
}

export { TableUseCaseProvider };
