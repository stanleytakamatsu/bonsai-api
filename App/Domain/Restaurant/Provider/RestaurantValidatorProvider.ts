import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { JoiSchemaValidator } from "../../../Core/Validator/Adapter/Joi/JoiSchemaValidator";
import { IGetRestaurantParamter } from "../Type/Parameter/IGetRestaurantParamter";
import { IRegisterRestaurantParamter } from "../Type/Parameter/IRegisterRestaurantParamter";
import { IGetRestaurantValidator } from "../Validator/IGetRestaurantValidator";
import { IRegisterRestaurantValidator } from "../Validator/IRegisterRestaurantValidator";
import { GetRestaurantSchema } from "../Validator/Schema/Joi/GetRestaurantSchema";
import { RegisterRestaurantSchema } from "../Validator/Schema/Joi/RegisterRestaurantSchema";
import { IAddBusinessHourValidator } from "../Validator/IAddBusinessHourValidator";
import { IAddBusinessHourParamter } from "../Type/Parameter/IAddBusinessHourParamter";
import { AddBusinessHourSchema } from "../Validator/Schema/Joi/AddBusinessHourSchema";
import { IGetBusinessHoursValidator } from "../Validator/IGetBusinessHoursValidator";
import { IGetBusinessHoursParamter } from "../Type/Parameter/IGetBusinessHoursParamter";
import { GetBusinessHoursSchema } from "../Validator/Schema/Joi/GetBusinessHoursSchema";

class RestaurantValidatorProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerRestaurantValidator();
    await this.registerGetRestaurantValidator();
    await this.registerAddBusinessHourValidator();
    await this.registerGetBusinessHoursValidator();
  }

  private async registerRestaurantValidator(): Promise<void> {
    this.container.register<IRegisterRestaurantValidator>(
      IRegisterRestaurantValidator,
      () =>
        new Promise<IRegisterRestaurantValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IRegisterRestaurantParamter>(
            RegisterRestaurantSchema
          );

          resolve(validator);
        })
    );
  }

  private async registerGetRestaurantValidator(): Promise<void> {
    this.container.register<IGetRestaurantValidator>(
      IGetRestaurantValidator,
      () =>
        new Promise<IGetRestaurantValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IGetRestaurantParamter>(GetRestaurantSchema);

          resolve(validator);
        })
    );
  }

  private async registerAddBusinessHourValidator(): Promise<void> {
    this.container.register<IAddBusinessHourValidator>(
      IAddBusinessHourValidator,
      () =>
        new Promise<IAddBusinessHourValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IAddBusinessHourParamter>(AddBusinessHourSchema);

          resolve(validator);
        })
    );
  }

  private async registerGetBusinessHoursValidator(): Promise<void> {
    this.container.register<IGetBusinessHoursValidator>(
      IGetBusinessHoursValidator,
      () =>
        new Promise<IGetBusinessHoursValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IGetBusinessHoursParamter>(
            GetBusinessHoursSchema
          );

          resolve(validator);
        })
    );
  }
}

export { RestaurantValidatorProvider };
