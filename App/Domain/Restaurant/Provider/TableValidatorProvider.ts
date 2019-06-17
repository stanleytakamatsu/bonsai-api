import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { JoiSchemaValidator } from "../../../Core/Validator/Adapter/Joi/JoiSchemaValidator";
import { IAddTableParamter } from "../Type/Parameter/IAddTableParamter";
import { IAddTableValidator } from "../Validator/IAddTableValidator";
import { AddTableSchema } from "../Validator/Schema/Joi/AddTableSchema";

class TableValidatorProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerAddTableValidator();
  }

  private async registerAddTableValidator(): Promise<void> {
    this.container.register<IAddTableValidator>(
      IAddTableValidator,
      () =>
        new Promise<IAddTableValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IAddTableParamter>(AddTableSchema);

          resolve(validator);
        })
    );
  }
}

export { TableValidatorProvider };
