const productController = require("../../../src/controllers/productsController");
const ProductModel = require("../../models/product");

const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");
const allproduct = require("../data/all-product.json");

ProductModel.create = jest.fn();
ProductModel.find = jest.fn();
ProductModel.findById = jest.fn();
ProductModel.findByIdAndUpdate = jest.fn();
ProductModel.findByIdAndDelete = jest.fn();
let req, res, next;
const productId = "64b2eda5dd29106a3a395251";
const updatedProduct = {
  name: "updated name",
  description: "updated description",
};

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

describe("productController get", () => {
  it("should have a getProducts function", () => {
    expect(typeof productController.getProducts).toBe("function");
  });
  it("should call ProductModel.find({})", async () => {
    await productController.getProducts(req, res, next);
    expect(ProductModel.find).toHaveBeenCalledWith({});
  });
  it("should return 200 response", async () => {
    await productController.getProducts(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });
  it("should return json body in response", async () => {
    ProductModel.find.mockReturnValue(allproduct);
    await productController.getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allproduct);
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding product data" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
describe("productController getById", () => {
  it("should have a getProductById", () => {
    expect(typeof productController.getProductById).toBe("function");
  });
  it("should call productModel.findById", async () => {
    req.params.productId = productId;
    await productController.getProductById(req, res, next);
    expect(ProductModel.findById).toBeCalledWith(productId);
  });
  it("should return json body and response code 200", async () => {
    ProductModel.findById.mockReturnValue(newProduct);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return 404 when item doesnt exist", async () => {
    ProductModel.findById.mockReturnValue(null);
    await productController.getProductById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "error" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProductById(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
describe("productController update", () => {
  it("should have a updateProduct function", () => {
    expect(typeof productController.updateProduct).toBe("function");
  });
  it("should update with ProductModel.findByIdAndUpdate", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    await productController.updateProduct(req, res, next);
    expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      updatedProduct,
      {
        new: true,
      }
    );
  });
  it("should return a response with json data and http code 200", async () => {
    req.params.productId = productId;
    req.body = updatedProduct;
    ProductModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req, res, next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct);
  });
  it("should handle 404 when item deosnt exist", async () => {
    ProductModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req, res, next);
    // console.log("res", res.statusCode);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Error" };
    const rejectedPromise = Promise.reject(errorMessage);
    ProductModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await productController.updateProduct(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
describe("productController delete", () => {
  it("should have a deleteProduct function", () => {
    expect(typeof productController.deleteProduct).toBe("function");
  });
});
