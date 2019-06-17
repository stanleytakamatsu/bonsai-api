import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IGetBusinessHoursParamter } from "../Type/Parameter/IGetBusinessHoursParamter";

interface IGetBusinessHoursValidator extends ISchemaValidator<IGetBusinessHoursParamter> {}

const IGetBusinessHoursValidator = Symbol.for("IGetBusinessHoursValidator");

export { IGetBusinessHoursValidator };
