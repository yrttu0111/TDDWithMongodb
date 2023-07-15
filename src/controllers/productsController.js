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
