const Product = require('../models/Product');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { isActive: true } });
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) { next(err); }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.update(req.body);
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await product.update({ isActive: false });
    res.json({ success: true, message: 'Product removed' });
  } catch (err) { next(err); }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };