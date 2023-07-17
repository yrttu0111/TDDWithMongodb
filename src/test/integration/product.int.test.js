const request = require("supertest");
const app = require("../../../server");
const mongoose = require("mongoose");
let newProduct = require("../data/new-product.json");

let firstProduct;

afterAll(async () => {
  await mongoose.disconnect();
});

it("POST /api/products", async () => {
  const response = await request(app).post("/api/products").send(newProduct);
  expect(response.statusCode).toBe(201);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});
it("should return 500 on post /api/products", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({ name: "phone" });
  expect(response.statusCode).toBe(500);
  console.log("rbod", response.body);
  expect(response.body).toStrictEqual({
    message:
      "Product validation failed: description: Path `description` is required.",
  });
});
it("GET /api/products", async () => {
  const response = await request(app).get("/api/products");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body[0].name).toBeDefined();
  expect(response.body[0].description).toBeDefined();
  firstProduct = response.body[0];
  // console.log(firstProduct);
});
it("GET /api/products/:id", async () => {
  const response = await request(app).get("/api/products/" + firstProduct._id);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe(newProduct.name);
  expect(response.body.description).toBe(newProduct.description);
});

it("GET id doesnt exist /api/products/:id", async () => {
  const response = await request(app).get(
    "/api/products/64b2ed3f09f73eacb4d8d3be"
  );
  expect(response.statusCode).toBe(404);
});
it("PUT /api/products", async () => {
  const response = await request(app)
    .put("/api/products/" + firstProduct._id)
    .send({ name: "updated name", description: "updated description" });
  console.log("res" + response);
  expect(response.statusCode).toBe(200);
  expect(response.body.name).toBe("updated name");
  expect(response.body.description).toBe("updated description");
});
it("should return 404 on PUT /api/products", async () => {
  const response = await request(app)
    .put("/api/products/64b2ed3f09f73eacb4d8e3ee")
    .send({ name: "updated name", description: "updated description" });
  expect(response.statusCode).toBe(404);
});
