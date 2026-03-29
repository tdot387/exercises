class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

class PayPal extends PaymentMethod {
  processPayment(amount) {
    return `Zahlung von ${amount} € über PayPal.`;
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount) {
    return `Zahlung von ${amount} € per Kreditkarte.`;
  }
}

class BankTransfer extends PaymentMethod {
  processPayment(amount) {
    return `Zahlung von ${amount} € per Überweisung.`;
  }
}

class PaymentMethodFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case "paypal":
        return new PayPal();
      case "creditcard":
        return new CreditCard();
      case "banktransfer":
        return new BankTransfer();
      default:
        throw new Error(`Zahlungsmethode ${type} wird nicht unterstützt.`);
    }
  }
}

const paymentMethod = PaymentMethodFactory.createPaymentMethod("paypal");
console.log(paymentMethod.processPayment(150));
