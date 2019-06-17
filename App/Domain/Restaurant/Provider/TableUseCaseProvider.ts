import { IContainerService } from "../../../Core/Container/IContainerService";
import { ILogger } from "../../../Core/Logger/ILogger";
import { IProvider } from "../../../Core/Provider/IProvider";
import { ITableCreatorService } from "../Service/ITableCreatorService";
import { AddTable } from "../UseCase/AddTable";
import { IAddTable } from "../UseCase/IAddTable";

class TableUseCaseProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerAddTableUseCase();
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
}

export { TableUseCaseProvider };
