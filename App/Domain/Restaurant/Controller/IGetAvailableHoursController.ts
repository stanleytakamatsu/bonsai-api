import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetAvailableHoursController extends IActionController {}

const IGetAvailableHoursController = Symbol.for("IGetAvailableHoursController");

export { IGetAvailableHoursController };
