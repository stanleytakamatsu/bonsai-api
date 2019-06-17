import { IIndexDefinition } from "./IIndexDefinition";

class IndexDefinition implements IIndexDefinition {
  private indexSchema: any;

  private indexOptions: any;

  public get IndexSchema(): any {
    return this.indexSchema;
  }

  public get IndexOptions(): any {
    return this.indexOptions;
  }

  public static create(indexSchema: any, indexOptions: any = {}): IndexDefinition {
    const indexDefinition = new IndexDefinition();

    indexDefinition.indexSchema = indexSchema;
    indexDefinition.indexOptions = indexOptions;

    return indexDefinition;
  }
}

export { IndexDefinition };
