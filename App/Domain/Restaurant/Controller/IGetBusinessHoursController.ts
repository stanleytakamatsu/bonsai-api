import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetBusinessHoursController extends IActionController {}

const IGetBusinessHoursController = Symbol.for("IGetBusinessHoursController");

export { IGetBusinessHoursController };
