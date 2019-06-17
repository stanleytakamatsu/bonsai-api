import { IGetAvailableHoursQuery } from "../Type/Query/UseCase/IGetAvailableHoursQuery";

interface IGetAvailableHours {
  execute(query: IGetAvailableHoursQuery): Promise<[string]>;
}

const IGetAvailableHours = Symbol.for("IGetAvailableHours");

export { IGetAvailableHours };
