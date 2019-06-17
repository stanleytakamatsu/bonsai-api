import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { ITableRepository } from "../Repository/ITableRepository";
import { ITableCreatorService } from "../Service/ITableCreatorService";
import { TableCreatorService } from "../Service/TableCreatorService";
import { ITableFinderService } from "../Service/ITableFinderService";
import { TableFinderService } from "../Service/TableFinderService";

class TableServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerTableCreatorService();
    await this.registerTableFinderService();
  }

  private async registerTableCreatorService(): Promise<void> {
    this.container.register<ITableCreatorService>(
      ITableCreatorService,
      () =>
        new Promise<TableCreatorService>(async resolve => {
          const repository = await this.container.get<ITableRepository>(ITableRepository);
          const service = new TableCreatorService(repository);

          resolve(service);
        })
    );
  }

  private async registerTableFinderService(): Promise<void> {
    this.container.register<ITableFinderService>(
      ITableFinderService,
      () =>
        new Promise<ITableFinderService>(async resolve => {
          const repository = await this.container.get<ITableRepository>(ITableRepository);
          const service = new TableFinderService(repository);

          resolve(service);
        })
    );
  }
}

export { TableServiceProvider };
