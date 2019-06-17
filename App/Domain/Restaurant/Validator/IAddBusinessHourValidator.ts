import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IAddBusinessHourParamter } from "../Type/Parameter/IAddBusinessHourParamter";

interface IAddBusinessHourValidator extends ISchemaValidator<IAddBusinessHourParamter> {}

const IAddBusinessHourValidator = Symbol.for("IAddBusinessHourValidator");

export { IAddBusinessHourValidator };
