const productController = require("../../../src/controllers/productsController");
const ProductModel = require("../../models/product");

const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

ProductModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  let next = null;
});

describe("productController create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("should call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });
});
