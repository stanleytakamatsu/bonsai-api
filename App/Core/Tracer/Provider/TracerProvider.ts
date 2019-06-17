import { IApplicationConfiguration } from '../../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../Container/IContainerService';
import { IProvider } from '../../Provider/IProvider';
import { StrategyFactory } from '../Factory/StrategyFactory';
import { ITracer } from '../ITracer';

class TracerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerTracerFactory();
  }

  private async registerTracerFactory(): Promise<void> {
    this.container.register<ITracer>(
      ITracer,
      () =>
        new Promise<ITracer>(async resolve => {
          const configuration = await this.container.get<IApplicationConfiguration>(
            IApplicationConfiguration
          );
          const tracer = await StrategyFactory.create(configuration);

          resolve(tracer);
        })
    );
  }
}

export { TracerProvider };
