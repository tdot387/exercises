// Schritt 1: Definiere das Interface für Zahlungsmethoden
class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

// Schritt 2: Implementiere konkrete Zahlungsmethoden
class PayPal extends PaymentMethod {
  processPayment(amount) {
    return `Bezahlt ${amount} mit PayPal.`;
  }
}

class DebitCard extends PaymentMethod {
  processPayment(amount) {
    return `Bezahlt ${amount} mit Bank Karte.`;
  }
}

class AmazonPay extends PaymentMethod {
  processPayment(amount) {
    return `Bezahlt ${amount} mit Amazon-Pay.`;
  }
}


// Schritt 3: Definiere die Factory für Zahlungsmethoden
class PaymentMethodFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case 'paypal':
        return new PayPal();
      case 'debitcard'
	   return new DebitCard();
	  case 'amazon'
	   return new AmazonPay();
      default:
        throw new Error("Zahlungsmethode nicht unterstützt.");
    }
  }
}


const paymentMethod = PaymentMethodFactory.createPaymentMethod('paypal');
console.log(paymentMethod.processPayment(20)); 
const paymentMethod = PaymentMethodFactory.createPaymentMethod('debitcard');
console.log(paymentMethod.processPayment(30)); 
const paymentMethod = PaymentMethodFactory.createPaymentMethod('amazon');
console.log(paymentMethod.processPayment(50)); 