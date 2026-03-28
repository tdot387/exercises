import {
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
  jest,
} from "@jest/globals";
import { BookingService } from "./bookingService.js";
import { InMemoryDatabase } from "./inMemoryDatabase.js";

describe("BookingService", () => {
  let service;
  let database;
  let paymentGateway;
  let emailService;
  let availabilityChecker;

  beforeEach(() => {
    database = new InMemoryDatabase();

    paymentGateway = {
      charge: jest.fn().mockResolvedValue({ id: "ch_123" }),
      refund: jest.fn().mockResolvedValue({ success: true }),
    };

    emailService = {
      send: jest.fn().mockResolvedValue({ success: true }),
    };

    availabilityChecker = {
      check: jest.fn().mockResolvedValue(true),
    };

    service = new BookingService(
      paymentGateway,
      emailService,
      database,
      availabilityChecker,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createBooking() succeeds with valid data", async () => {
    const bookingData = {
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checkIn: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 42,
    };

    const booking = await service.createBooking(bookingData);

    expect(booking.amount).toBe(42);
    expect(booking.status).toBe("confirmed");
  });

  test("createBooking() throws error when room not available", async () => {
    availabilityChecker.check.mockResolvedValue(false);

    const bookingData = {
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checke: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 42,
    };

    await expect(service.createBooking(bookingData)).rejects.toThrow(
      "Room not available",
    );
  });

  test("createBooking() charges payment with correct amount", async () => {
    const bookingData = {
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checke: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 400,
    };

    await service.createBooking(bookingData);

    expect(paymentGateway.charge).toHaveBeenCalledWith({
      amount: 400,
      currency: "EUR",
      description: "Booking for room number1408",
    });
  });

  test("createBooking() saves booking to database", async () => {
    const bookingData = {
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checke: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 42,
    };

    const booking = await service.createBooking(bookingData);
    const savedBooking = await database.bookings.findById(booking.id);

    expect(savedBooking.paymentId).toBe("ch_123");
    expect(savedBooking.status).toBe("confirmed");
  });

  test("createBooking() sends confirmation email", async () => {
    const bookingData = {
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checkIn: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 42,
    };

    await service.createBooking(bookingData);

    expect(emailService.send).toHaveBeenCalledWith({
      to: "ich@web.de",
      subject: "Booking Confirmation",
      text: "Your booking for room number1408 is confirmed.",
    });
  });

  test("cancelBooking() refunds payment and updates status", async () => {
    const booking = await database.bookings.create({
      roomId: "number1408",
      guestEmail: "ich@web.de",
      checkIn: "2026-03-27",
      checkOut: "2026-03-28",
      amount: 42,
      paymentId: "ch_123",
      status: "confirmed",
    });

    await service.cancelBooking(booking.id);

    expect(paymentGateway.refund).toHaveBeenCalledWith("ch_123");

    const updatedBooking = await database.bookings.findById(booking.id);
    expect(updatedBooking.status).toBe("cancelled");
  });

  test("cancelBooking() throws error when booking not found", async () => {
    await expect(service.cancelBooking("does-not-exist")).rejects.toThrow("Booking not found");
  });

  test("getUpcomingBookings() returns only future confirmed bookings", async () => {
    await database.bookings.create({
      roomId: "past-room",
      guestEmail: "ich@web.de",
      checkIn: "2025-01-01",
      checkOut: "2025-01-02",
      amount: 42,
      paymentId: "ch_old",
      status: "confirmed",
    });

    await database.bookings.create({
      roomId: "future-room",
      guestEmail: "ich@web.de",
      checkIn: "2026-12-01",
      checkOut: "2026-12-05",
      amount: 84,
      paymentId: "ch_new",
      status: "confirmed",
    });

    await database.bookings.create({
      roomId: "cancelled-room",
      guestEmail: "ich@web.de",
      checkIn: "2026-12-10",
      checkOut: "2026-12-12",
      amount: 84,
      paymentId: "ch_cancelled",
      status: "cancelled",
    });

    const bookings = await service.getUpcomingBookings("ich@web.de");

    expect(bookings).toHaveLength(1);
    expect(bookings[0].roomId).toBe("future-room");
  });
});
