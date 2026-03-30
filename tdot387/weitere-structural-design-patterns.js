class Beverage {
  constructor() {
    this.description = "Unknown";
  }

  getDescription() {
    return this.description;
  }

  cost() {
    throw new Error("cost() muss implementiert werden");
  }
}

class Coffee extends Beverage {
  constructor() {
    super();
    this.description = "Kaffee";
  }

  cost() {
    return 2.5;
  }
}

class Tea extends Beverage {
  constructor() {
    super();
    this.description = "Tee";
  }

  cost() {
    return 2.0;
  }
}

// Basis-Decorator
class BeverageDecorator extends Beverage {
  constructor(beverage) {
    super();
    this.beverage = beverage;
  }
}

// Konkrete Zutaten
class Milk extends BeverageDecorator {
  constructor(beverage) {
    super(beverage);
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Milch`;
  }

  cost() {
    return this.beverage.cost() + 0.5;
  }
}

class Sugar extends BeverageDecorator {
  constructor(beverage) {
    super(beverage);
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Zucker`;
  }

  cost() {
    return this.beverage.cost() + 0.2;
  }
}

class Lemon extends BeverageDecorator {
  constructor(beverage) {
    super(beverage);
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Zitrone`;
  }

  cost() {
    return this.beverage.cost() + 0.4;
  }
}