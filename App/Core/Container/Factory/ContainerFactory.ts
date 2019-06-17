import { ContainerService } from '../ContainerService';
import { IContainerService } from '../IContainerService';
import { Strategies } from '../Strategies';
import { InversifyContainerService } from '../Strategy/Inversify/InversifyContainerService';

class ContainerFactory {
  public static async create(strategy: Strategies): Promise<IContainerService> {
    switch (strategy) {
      case Strategies.INVERSIFY:
        return ContainerFactory.getInversify();
      default:
        return ContainerFactory.getInversify();
    }
  }

  private static async getInversify(): Promise<IContainerService> {
    const inversify = new InversifyContainerService();

    return new ContainerService(inversify);
  }
}

export { ContainerFactory };
