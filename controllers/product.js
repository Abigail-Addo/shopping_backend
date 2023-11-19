const Product = require('../model/product')

// route for uploading the image
exports.uploadProductImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    req.body.filename = req.file.filename;
    res.status(200).json({
        message: 'File uploaded successfully',
        filename: req.body.filename,
    });

};

//register new user
exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, stock, filename } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'name is required' });
        }
        if (!price) {
            return res.status(400).json({ error: 'price is required' });
        }
        if (!description) {
            return res.status(400).json({ error: 'description is required' });
        }
        if (!stock) {
            return res.status(400).json({ error: 'stock is required' });
        }
        const product = await Product.query().insertGraph({
            name: name,
            price: price,
            stocks: stock,
            description: description,
            image: `${process.env.SERVER_URL}uploads/products/${filename}`
        });
        return res.status(201).json(product);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'failed to add product' });
    }
};

// get all products
exports.getProducts = async (req, res) => {

    try {
        const products = await Product.query().select('*');
        if (!products) {
            throw new Error('failed to get products from db')
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }

}