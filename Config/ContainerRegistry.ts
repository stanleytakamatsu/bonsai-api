import { IContainerRegistry } from "../App/Core/Container/IContainerRegistry";
import { IContainerService } from "../App/Core/Container/IContainerService";
import { MongooseProvider } from "../App/Core/Database/Driver/Mongoose/Provider/MongooseProvider";
import { HttpServerProvider } from "../App/Core/HttpServer/Provider/HttpServerProvider";
import { INewAble } from "../App/Core/Interface/INewAble";
import { LoggerProvider } from "../App/Core/Logger/Provider/LoggerProvider";
import { IProvider } from "../App/Core/Provider/IProvider";
import { TracerProvider } from "../App/Core/Tracer/Provider/TracerProvider";
import { RestaurantControllerProvider } from "../App/Domain/Restaurant/Provider/RestaurantControllerProvider";
import { RestaurantRepositoryProvider } from "../App/Domain/Restaurant/Provider/RestaurantRepositoryProvider";
import { RestaurantServiceProvider } from "../App/Domain/Restaurant/Provider/RestaurantServiceProvider";
import { RestaurantUseCaseProvider } from "../App/Domain/Restaurant/Provider/RestaurantUseCaseProvider";
import { RestaurantValidatorProvider } from "../App/Domain/Restaurant/Provider/RestaurantValidatorProvider";
import { TableControllerProvider } from "../App/Domain/Restaurant/Provider/TableControllerProvider";
import { TableRepositoryProvider } from "../App/Domain/Restaurant/Provider/TableRepositoryProvider";
import { TableServiceProvider } from "../App/Domain/Restaurant/Provider/TableServiceProvider";
import { TableUseCaseProvider } from "../App/Domain/Restaurant/Provider/TableUseCaseProvider";
import { TableValidatorProvider } from "../App/Domain/Restaurant/Provider/TableValidatorProvider";
import { HealthProvider } from "../App/Health/Provider/HealthProvider";

class ContainerRegistry implements IContainerRegistry {
  private static readonly REGISTERED_PROVIDERS: INewAble<IProvider>[] = [
    TracerProvider,
    LoggerProvider,
    HttpServerProvider,
    HealthProvider,
    MongooseProvider,
    TableValidatorProvider,
    TableUseCaseProvider,
    TableServiceProvider,
    TableRepositoryProvider,
    TableControllerProvider,
    RestaurantControllerProvider,
    RestaurantRepositoryProvider,
    RestaurantServiceProvider,
    RestaurantValidatorProvider,
    RestaurantUseCaseProvider
  ];

  public constructor(private readonly container: IContainerService) {}

  public async registerAll(): Promise<void> {
    const providersCount = ContainerRegistry.REGISTERED_PROVIDERS.length;

    for (let i = 0; i < providersCount; i += 1) {
      await this.registerProvider(ContainerRegistry.REGISTERED_PROVIDERS[i]);
    }
  }

  public async registerProvider(newableProvider: INewAble<IProvider>): Promise<any> {
    const provider: IProvider = new newableProvider(this.container);

    await provider.register();
  }
}

export { ContainerRegistry };
