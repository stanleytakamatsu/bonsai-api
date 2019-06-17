import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { ITableRepository } from "../Repository/ITableRepository";
import { ITableCreatorService } from "../Service/ITableCreatorService";
import { TableCreatorService } from "../Service/TableCreatorService";

class TableServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerTableCreatorService();
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
}

export { TableServiceProvider };
