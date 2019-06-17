import { IActionController } from "../../../Core/Controller/IActionController";

interface IAddBusinessHourController extends IActionController {}

const IAddBusinessHourController = Symbol.for("IAddBusinessHourController");

export { IAddBusinessHourController };
