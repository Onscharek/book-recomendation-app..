const express = require("express");
const {
    addProduct,
    getProducts,
    getOneProduct,
    deleteProduct,
    editProduct,
} = require("../controlles/product");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
    res.send("hello product");
});

// Add product
router.post("/add", isAuth, addProduct);

// Get all products
router.get("/getall", getProducts);

// Get one product
router.get("/:id", getOneProduct);

// Delete product
router.delete("/:_id", isAuth, deleteProduct);

// Edit product
router.put("/:_id", isAuth, editProduct);

module.exports = router; 
  