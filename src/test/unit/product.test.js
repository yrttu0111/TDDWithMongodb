const productController = require("../../../src/controllers/productController");
describe("productController create", () => {
  it("should have a createProduct function", () => {
    const product = {
      name: "Product 1",
      price: 10,
      description: "Description 1",
    };
    const productController = new productController();
    productController.create(product);
    expect(productController).toEqual(product);
  });
});
