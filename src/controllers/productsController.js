const productModel = require("../models/product");
exports.createProduct = async (req, res, next) => {
  try {
    // console.log(req.body);
    const createdProduct = await productModel.create(req.body);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};
exports.getProducts = async (req, res, next) => {
  try {
    const getProducts = await productModel.find({});
    // console.log("getProducts", getProducts);
    res.status(200).json(getProducts);
  } catch (error) {
    console.log("e m :", error);
    next(error);
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const getProductById = await productModel.findById(req.params.productId);
    if (getProductById) {
      res.status(200).json(getProductById);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};
