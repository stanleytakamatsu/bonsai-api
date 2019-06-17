import { IContainerService } from "../../../Core/Container/IContainerService";
import { IProvider } from "../../../Core/Provider/IProvider";
import { IGetRestaurant } from "../../Restaurant/UseCase/IGetRestaurant";
import { IGetTable } from "../../Restaurant/UseCase/IGetTable";
import { IMakeBookingController } from "../Controller/IMakeBookingController";
import { MakeBookingController } from "../Controller/MakeBookingController";
import { IMakeBooking } from "../UseCase/IMakeBooking";
import { IMakeBookingValidator } from "../Validator/IMakeBookingValidator";
import { IGetBookingsController } from "../Controller/IGetBookingsController";
import { GetBookingsController } from "../Controller/GetBookingsController";
import { IGetBookings } from "../UseCase/IGetBookings";
import { IGetBookingController } from "../Controller/IGetBookingController";
import { IGetBooking } from "../UseCase/IGetBooking";
import { GetBookingController } from "../Controller/GetBookingController";
import { IRemoveBookingController } from "../Controller/IRemoveBookingController";
import { RemoveBookingController } from "../Controller/RemoveBookingController";
import { IRemoveBooking } from "../UseCase/IRemoveBooking";
import { IEditBookingController } from "../Controller/IEditBookingController";
import { EditBookingController } from "../Controller/EditBookingController";
import { IEditBooking } from "../UseCase/IEditBooking";

class BookingControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    await this.registerMakeBookingController();
    await this.registerGetBookingsController();
    await this.registerGetBookingController();
    await this.registerRemoveBookingController();
    await this.registerEditBookingController();
  }

  private async registerMakeBookingController(): Promise<void> {
    this.container.register<IMakeBookingController>(
      IMakeBookingController,
      () =>
        new Promise<IMakeBookingController>(async resolve => {
          const validator = await this.container.get<IMakeBookingValidator>(IMakeBookingValidator);
          const getTableUseCase = await this.container.get<IGetTable>(IGetTable);
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const makeBookingUseCase = await this.container.get<IMakeBooking>(IMakeBooking);
          const controller = new MakeBookingController(
            getTableUseCase,
            getRestaurantUseCase,
            makeBookingUseCase,
            validator
          );

          resolve(controller);
        })
    );
  }

  private async registerGetBookingsController(): Promise<void> {
    this.container.register<IGetBookingsController>(
      IGetBookingsController,
      () =>
        new Promise<IGetBookingsController>(async resolve => {
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const getBookingsUseCase = await this.container.get<IGetBookings>(IGetBookings);
          const controller = new GetBookingsController(getBookingsUseCase, getRestaurantUseCase);

          resolve(controller);
        })
    );
  }

  private async registerGetBookingController(): Promise<void> {
    this.container.register<IGetBookingController>(
      IGetBookingController,
      () =>
        new Promise<IGetBookingController>(async resolve => {
          const getBookingUseCase = await this.container.get<IGetBooking>(IGetBooking);
          const controller = new GetBookingController(getBookingUseCase);

          resolve(controller);
        })
    );
  }

  private async registerRemoveBookingController(): Promise<void> {
    this.container.register<IRemoveBookingController>(
      IRemoveBookingController,
      () =>
        new Promise<IRemoveBookingController>(async resolve => {
          const getBookingUseCase = await this.container.get<IGetBooking>(IGetBooking);
          const removeBookingUseCase = await this.container.get<IRemoveBooking>(IRemoveBooking);
          const controller = new RemoveBookingController(getBookingUseCase, removeBookingUseCase);

          resolve(controller);
        })
    );
  }

  private async registerEditBookingController(): Promise<void> {
    this.container.register<IEditBookingController>(
      IEditBookingController,
      () =>
        new Promise<IEditBookingController>(async resolve => {
          const getBookingUseCase = await this.container.get<IGetBooking>(IGetBooking);
          const getTableUseCase = await this.container.get<IGetTable>(IGetTable);
          const getRestaurantUseCase = await this.container.get<IGetRestaurant>(IGetRestaurant);
          const editBookingUseCase = await this.container.get<IEditBooking>(IEditBooking);
          const controller = new EditBookingController(
            getBookingUseCase,
            getTableUseCase,
            getRestaurantUseCase,
            editBookingUseCase
          );

          resolve(controller);
        })
    );
  }
}

export { BookingControllerProvider };
