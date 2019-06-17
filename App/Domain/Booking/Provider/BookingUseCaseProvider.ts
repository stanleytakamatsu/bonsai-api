import { IContainerService } from "../../../Core/Container/IContainerService";
import { ILogger } from "../../../Core/Logger/ILogger";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IBookingCreatorService } from "../Service/IBookingCreatorService";
import { IMakeBooking } from "../UseCase/IMakeBooking";
import { MakeBooking } from "../UseCase/MakeBooking";
import { IGetBookings } from "../UseCase/IGetBookings";
import { GetBookings } from "../UseCase/GetBookings";
import { IBookingFinderService } from "../Service/IBookingFinderService";
import { IGetBooking } from "../UseCase/IGetBooking";
import { GetBooking } from "../UseCase/GetBooking";
import { IRemoveBooking } from "../UseCase/IRemoveBooking";
import { IBookingRemoverService } from "../Service/IBookingRemoverService";
import { RemoveBooking } from "../UseCase/RemoveBooking";
import { IBookingUpdaterService } from "../Service/IBookingUpdaterService";
import { IEditBooking } from "../UseCase/IEditBooking";
import { EditBooking } from "../UseCase/EditBooking";

class BookingUseCaseProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerMakeBookingUseCase();
    await this.registerGetBookingsUseCase();
    await this.registerGetBookingUseCase();
    await this.registerRemoveBookingUseCase();
    await this.registerEditBookingUseCase();
  }

  private async registerMakeBookingUseCase(): Promise<void> {
    this.container.register<IMakeBooking>(
      IMakeBooking,
      () =>
        new Promise<IMakeBooking>(async resolve => {
          const service = await this.container.get<IBookingCreatorService>(IBookingCreatorService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new MakeBooking(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetBookingsUseCase(): Promise<void> {
    this.container.register<IGetBookings>(
      IGetBookings,
      () =>
        new Promise<IGetBookings>(async resolve => {
          const service = await this.container.get<IBookingFinderService>(IBookingFinderService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetBookings(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerGetBookingUseCase(): Promise<void> {
    this.container.register<IGetBooking>(
      IGetBooking,
      () =>
        new Promise<IGetBooking>(async resolve => {
          const service = await this.container.get<IBookingFinderService>(IBookingFinderService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new GetBooking(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerRemoveBookingUseCase(): Promise<void> {
    this.container.register<IRemoveBooking>(
      IRemoveBooking,
      () =>
        new Promise<IRemoveBooking>(async resolve => {
          const service = await this.container.get<IBookingRemoverService>(IBookingRemoverService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new RemoveBooking(service, logger);

          resolve(useCase);
        })
    );
  }

  private async registerEditBookingUseCase(): Promise<void> {
    this.container.register<IEditBooking>(
      IEditBooking,
      () =>
        new Promise<IEditBooking>(async resolve => {
          const service = await this.container.get<IBookingUpdaterService>(IBookingUpdaterService);
          const logger = await this.container.get<ILogger>(ILogger);
          const useCase = new EditBooking(service, logger);

          resolve(useCase);
        })
    );
  }
}

export { BookingUseCaseProvider };
