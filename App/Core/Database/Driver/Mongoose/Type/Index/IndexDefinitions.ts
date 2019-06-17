import { IIndexDefinitions } from "./IIndexDefinitions";
import { IIndexDefinition } from "./IIndexDefinition";

class IndexDefinitions implements IIndexDefinitions {
  private indexes: IIndexDefinition[] = [];

  public get Indexes(): IIndexDefinition[] {
    return this.indexes;
  }

  public addIndexDefinition(indexDefinition: IIndexDefinition): this {
    this.indexes.push(indexDefinition);

    return this;
  }

  public static create(indexDefinition: IIndexDefinition): IndexDefinitions {
    const indexDefinitions = new IndexDefinitions();

    indexDefinitions.indexes.push(indexDefinition);

    return indexDefinitions;
  }
}

export { IndexDefinitions };
