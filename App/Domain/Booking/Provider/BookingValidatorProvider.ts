import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { JoiSchemaValidator } from "../../../Core/Validator/Adapter/Joi/JoiSchemaValidator";
import { IMakeBookingParamter } from "../Type/Parameter/IMakeBookingParamter";
import { IMakeBookingValidator } from "../Validator/IMakeBookingValidator";
import { MakeBookingSchema } from "../Validator/Schema/Joi/MakeBookingSchema";

class BookingValidatorProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerMakeBookingValidator();
  }

  private async registerMakeBookingValidator(): Promise<void> {
    this.container.register<IMakeBookingValidator>(
      IMakeBookingValidator,
      () =>
        new Promise<IMakeBookingValidator>(async resolve => {
          const validator = new JoiSchemaValidator<IMakeBookingParamter>(MakeBookingSchema);

          resolve(validator);
        })
    );
  }
}

export { BookingValidatorProvider };
