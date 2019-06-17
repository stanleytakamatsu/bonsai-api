import { Serialize as ExecuteSerialize, SerializeKeysTo, CamelCase } from "cerialize";

import { ISerialize } from "./ISerialize";

SerializeKeysTo(CamelCase);

abstract class Serialize implements ISerialize {
  public serialize(data: any): any {
    return ExecuteSerialize(data);
  }
}

export { Serialize };
