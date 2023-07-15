const productController = require("../../../src/controllers/productsController");
const ProductModel = require("../../models/product");

const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");

ProductModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("productController create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("should call ProductModel.create", async () => {
    await productController.createProduct(req, res, next);
    expect(ProductModel.create).toBeCalledWith(newProduct);
  });
  it("should return 201 response code", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("응답으로 JSON 본문을 반환해야 함", async () => {
    // ProductModel.create()을 모킹하여 newProduct을 반환하도록 설정
    ProductModel.create.mockReturnValue(newProduct);

    // productController의 createProduct() 메서드 호출
    await productController.createProduct(req, res, next);

    // 응답 객체(res)의 JSON 데이터가 newProduct과 동일한지 확인
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
