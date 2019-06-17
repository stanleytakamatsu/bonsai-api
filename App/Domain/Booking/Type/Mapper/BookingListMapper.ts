import { serializeAs } from "cerialize";
import { Booking } from "../../Entity/Booking";
import { BookingMapper } from "./BookingMapper";

class BookingListMapper {
  private data: BookingMapper[];

  @serializeAs(BookingMapper)
  public get Data(): BookingMapper[] {
    return this.data;
  }

  public static create(bookings: Booking[]): BookingListMapper {
    const mapper = new BookingListMapper();

    mapper.data = bookings.map(booking => BookingMapper.create(booking));

    return mapper;
  }
}

export { BookingListMapper };
