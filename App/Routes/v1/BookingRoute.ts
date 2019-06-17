import { IContainerService } from "../../Core/Container/IContainerService";
import { IHttpServer } from "../../Core/HttpServer/IHttpServer";
import { IMakeBookingController } from "../../Domain/Booking/Controller/IMakeBookingController";
import { Api } from "./Api";
import { IGetBookingsController } from "../../Domain/Booking/Controller/IGetBookingsController";
import { IGetBookingController } from "../../Domain/Booking/Controller/IGetBookingController";
import { IRemoveBookingController } from "../../Domain/Booking/Controller/IRemoveBookingController";
import { IEditBookingController } from "../../Domain/Booking/Controller/IEditBookingController";

class BookingRoute extends Api {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerMakeBookingRoute();
    await this.registerGetBookingsRoute();
    await this.registerGetBookingRoute();
    await this.registerRemoveBookingRoute();
    await this.registerEditBookingRoute();
  }

  private async registerMakeBookingRoute(): Promise<void> {
    const controller = await this.getController(IMakeBookingController);

    await this.addHttpRoute({
      controller,
      methods: "POST",
      path: "/bookings",
      version: BookingRoute.VERSION
    });
  }

  private async registerGetBookingsRoute(): Promise<void> {
    const controller = await this.getController(IGetBookingsController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/bookings",
      version: BookingRoute.VERSION
    });
  }

  private async registerGetBookingRoute(): Promise<void> {
    const controller = await this.getController(IGetBookingController);

    await this.addHttpRoute({
      controller,
      methods: "GET",
      path: "/bookings/:bookingGuid",
      version: BookingRoute.VERSION
    });
  }

  private async registerRemoveBookingRoute(): Promise<void> {
    const controller = await this.getController(IRemoveBookingController);

    await this.addHttpRoute({
      controller,
      methods: "DELETE",
      path: "/bookings/:bookingGuid",
      version: BookingRoute.VERSION
    });
  }

  private async registerEditBookingRoute(): Promise<void> {
    const controller = await this.getController(IEditBookingController);

    await this.addHttpRoute({
      controller,
      methods: "PUT",
      path: "/bookings/:bookingGuid",
      version: BookingRoute.VERSION
    });
  }
}

export { BookingRoute };
