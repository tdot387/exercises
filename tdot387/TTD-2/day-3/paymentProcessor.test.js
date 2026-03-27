const { PaymentProcessor } = require("./paymentProcessor");

describe("PaymentProcessor", () => {
  describe("processPayment()", () => {
    test("processes payment successfully", async () => {
      const fakeStripe = {
        charges: {
          create: jest.fn().mockResolvedValue({
            id: "test",
            amount: 50,
            status: "success",
          }),
        },
      };

      const processor = new PaymentProcessor(fakeStripe);

      const result = await processor.processPayment({
        amount: 50,
        currency: "EUR",
        token: "test_token",
        description: "Test",
      });

      expect(result.success).toBe(true);
      expect(result.amount).toBe(50);

      expect(fakeStripe.charges.create).toHaveBeenCalledWith({
        amount: 50,
        currency: "EUR",
        source: "test_token",
        description: "Test",
      });
    });

    test("error if amount is invalid (negative or 0)", async () => {
      const fakeStripe = {
        charges: {
          create: jest.fn(),
        },
      };

      const processor = new PaymentProcessor(fakeStripe);

      await expect(
        processor.processPayment({
          amount: 0,
          token: "test_token",
        }),
      ).rejects.toThrow("Invalid amount");

      expect(fakeStripe.charges.create).not.toHaveBeenCalled();
    });

    test("throws error if token is missing", async () => {
      const fakeStripe = { charges: { create: jest.fn() } };
      const processor = new PaymentProcessor(fakeStripe);

      await expect(
        processor.processPayment({
          amount: 50,
        }),
      ).rejects.toThrow("Payment token required");
    });

    test("throws error if card information is wrong", async () => {
      const fakeStripe = {
        charges: {
          create: jest
            .fn()
            .mockRejectedValue(new Error("missing card information")),
        },
      };

      const processor = new PaymentProcessor(fakeStripe);

      const result = await processor.processPayment({
        amount: 50,
        token: "test_token",
      });

      expect(result.success).toBe(false);
      expect(result.error).toBe("missing card information");
    });
  });

  describe("refundPayment()", () => {
    test("refunds payment successfully", async () => {
      const fakeStripe = {
        refunds: {
          create: jest.fn().mockResolvedValue({
            id: "test",
            status: "success",
          }),
        },
      };

      const processor = new PaymentProcessor(fakeStripe);

      const result = await processor.refundPayment("test2");

      expect(result.success).toBe(true);
      expect(result.refundId).toBe("test");

      expect(fakeStripe.refunds.create).toHaveBeenCalledWith({
        charge: "test2",
      });
    });
  });
  test("throws error if charge ID is missing", async () => {
    const fakeStripe = { refunds: { create: jest.fn() } };
    const processor = new PaymentProcessor(fakeStripe);

    await expect(processor.refundPayment()).rejects.toThrow(
      "Charge ID required",
    );

    expect(fakeStripe.refunds.create).not.toHaveBeenCalled();
  });

  test("throws error if refund isnt payed", async () => {
    const fakeStripe = {
      refunds: {
        create: jest
          .fn()
          .mockRejectedValue(new Error("Couldn't process refund")),
      },
    };

    const processor = new PaymentProcessor(fakeStripe);

    const result = await processor.refundPayment("test")

    expect(result.success).toBe(false);
    expect(result.error).toBe("Couldn't process refund");
  });
});
