import { IActionController } from "../../../Core/Controller/IActionController";

interface IGetAvailableTablesController extends IActionController {}

const IGetAvailableTablesController = Symbol.for("IGetAvailableTablesController");

export { IGetAvailableTablesController };
