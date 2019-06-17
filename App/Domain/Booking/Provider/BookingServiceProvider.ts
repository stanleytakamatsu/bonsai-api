import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IBookingRepository } from "../Repository/IBookingRepository";
import { BookingCreatorService } from "../Service/BookingCreatorService";
import { IBookingCreatorService } from "../Service/IBookingCreatorService";
import { IBookingFinderService } from "../Service/IBookingFinderService";
import { BookingFinderService } from "../Service/BookingFinderService";
import { IBookingRemoverService } from "../Service/IBookingRemoverService";
import { BookingRemoverService } from "../Service/BookingRemoverService";
import { IBookingUpdaterService } from "../Service/IBookingUpdaterService";
import { BookingUpdaterService } from "../Service/BookingUpdaterService";

class BookingServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerBookingCreatorService();
    await this.registerBookingFinderService();
    await this.registerBookingRemoverService();
    await this.registerBookingUpdaterService();
  }

  private async registerBookingCreatorService(): Promise<void> {
    this.container.register<IBookingCreatorService>(
      IBookingCreatorService,
      () =>
        new Promise<IBookingCreatorService>(async resolve => {
          const repository = await this.container.get<IBookingRepository>(IBookingRepository);
          const service = new BookingCreatorService(repository);

          resolve(service);
        })
    );
  }

  private async registerBookingFinderService(): Promise<void> {
    this.container.register<IBookingFinderService>(
      IBookingFinderService,
      () =>
        new Promise<IBookingFinderService>(async resolve => {
          const repository = await this.container.get<IBookingRepository>(IBookingRepository);
          const service = new BookingFinderService(repository);

          resolve(service);
        })
    );
  }

  private async registerBookingRemoverService(): Promise<void> {
    this.container.register<IBookingRemoverService>(
      IBookingRemoverService,
      () =>
        new Promise<IBookingRemoverService>(async resolve => {
          const repository = await this.container.get<IBookingRepository>(IBookingRepository);
          const service = new BookingRemoverService(repository);

          resolve(service);
        })
    );
  }

  private async registerBookingUpdaterService(): Promise<void> {
    this.container.register<IBookingUpdaterService>(
      IBookingUpdaterService,
      () =>
        new Promise<IBookingUpdaterService>(async resolve => {
          const repository = await this.container.get<IBookingRepository>(IBookingRepository);
          const service = new BookingUpdaterService(repository);

          resolve(service);
        })
    );
  }
}

export { BookingServiceProvider };
