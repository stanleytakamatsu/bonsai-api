import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { AddTableController } from "../Controller/AddTableController";
import { IAddTableController } from "../Controller/IAddTableController";
import { IAddTable } from "../UseCase/IAddTable";
import { IAddTableValidator } from "../Validator/IAddTableValidator";

class TableControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerAddTableController();
  }

  private async registerAddTableController(): Promise<void> {
    this.container.register<IAddTableController>(
      IAddTableController,
      () =>
        new Promise<IAddTableController>(async resolve => {
          const validator = await this.container.get<IAddTableValidator>(IAddTableValidator);
          const addTableUseCase = await this.container.get<IAddTable>(IAddTable);
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const controller = new AddTableController(
            addTableUseCase,
            getRestaurantUseCase,
            validator
          );

          resolve(controller);
        })
    );
  }
}

export { TableControllerProvider };
