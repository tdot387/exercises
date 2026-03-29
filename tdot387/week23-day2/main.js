class ProductService {
  constructor() {
    this.products = [
      { name: "test1", price: 100 },
      { name: "test2", price: 200 },
      { name: "test3", price: 300 },
    ];
  }

  getProducts() {
    return this.products;
  }
}

class ProductProxy {
  constructor() {
    this.productService = new ProductService();
    this.productsCache = [];
  }

  getProducts() {
    if (this.productsCache.length === 0) {
      const products = this.productService.getProducts();
      this.productsCache = products;
    } else {
      return this.productsCache;
    }
  }
}

class Client {
  constructor(productProxy) {
    this.productProxy = productProxy;
  }

  displayProducts() {
    const products = this.productProxy.getProducts();
    products.forEach((product) =>
      console.log(`${product.name}: $${product.price}`),
    );
  }
}

const productProxy = new ProductProxy();
const client = new Client(productProxy);
client.displayProducts();
client.displayProducts();
