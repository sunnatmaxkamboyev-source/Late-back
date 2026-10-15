
const express = require('express');
const router = express.Router();

// Controller funksiyalarini import qilish
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/menuController');

// Barcha mahsulotlar
router.get('/', getAllProducts);

// ID orqali bitta mahsulot
router.get('/:id', getProductById);

// Yangi mahsulot qo‘shish
router.post('/', createProduct);

// Mahsulotni yangilash
router.put('/:id', updateProduct);

// Mahsulotni o‘chirish
router.delete('/:id', deleteProduct);

module.exports = router;
