
const express = require('express');
const router = express.Router();

const product = require('../controllers/product.controller');

//Routes
//Get a list of products
router.get("/products", product.getProducts);
//Create new product
router.post("/products",product.newProduct);


module.exports = router;
