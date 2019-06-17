import { Deserialize as ExecuteDeserialize, DeserializeKeysFrom, CamelCase } from "cerialize";

import { IDeserialize, IFromJson } from "./IDeserialize";

DeserializeKeysFrom(CamelCase);

const Deserialize: IFromJson = class implements IDeserialize {
  public static deserialize<T>(data: any): T {
    return ExecuteDeserialize(data, this.constructor);
  }
};

export { Deserialize };
