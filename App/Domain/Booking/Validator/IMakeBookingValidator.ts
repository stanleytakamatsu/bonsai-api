import { ISchemaValidator } from "../../../Core/Validator/Interface/ISchemaValidator";
import { IMakeBookingParamter } from "../Type/Parameter/IMakeBookingParamter";

interface IMakeBookingValidator extends ISchemaValidator<IMakeBookingParamter> {}

const IMakeBookingValidator = Symbol.for("IMakeBookingValidator");

export { IMakeBookingValidator };
