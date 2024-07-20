const Product = require("../model/Product");

exports.addProduct = async (req, res) => {
    try {
        const { title, description, author, rate, imgLink } = req.body;
        const newProduct = new Product({
            title,
            author,
            description,
            rate,
            imgLink,
            id_user: req.user._id, // assuming req.user is set by isAuth middleware
        });
        await newProduct.save();
        res.status(200).send({ msg: "Product added successfully.", newProduct });
    } catch (error) {
        res.status(400).send({ msg: "Cannot add product.", error });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const listProducts = await Product.find();
        res.status(200).send({ msg: "List of all products.", listProducts });
    } catch (error) {
        res.status(400).send({ msg: "Cannot get products.", error });  
    }
};

exports.getOneProduct = async (req, res) => {
    try {
        const productToGet = await Product.findOne({ _id: req.params.id });
        res.status(200).send({ msg: "Product retrieved successfully.", productToGet });
    } catch (error) {
        res.status(400).send({ msg: "Cannot get product with this ID.", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        await Product.findOneAndDelete({ _id });
        res.status(200).send({ msg: "Product deleted successfully." });
    } catch (error) {
        res.status(400).send({ msg: "Cannot delete product with this ID.", error });
    }
};

exports.editProduct = async (req, res) => {
    try {
        const { _id } = req.params;
        const result = await Product.updateOne({ _id }, { $set: { ...req.body } });
        res.status(200).send({ msg: "Product updated successfully." });
    } catch (error) {
        res.status(400).send({ msg: "Cannot edit product with this ID.", error });
    }
};
