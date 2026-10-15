const Product = require('../models/Product');

const ALLOWED_CATEGORIES = [
  'Coffee',
  'Milkshakes',
  'Cakes & Slices',
  'Iced Drinks',
];

// Mahsulot ma'lumotlarini tekshirish
const validateProduct = (body) => {
  const { name, price, description, category, image } = body;

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return 'Mahsulot nomi va musbat narxi kerak';
  }

  if (
    description !== undefined &&
    typeof description !== 'string'
  ) {
    return 'Tavsif matn ko‘rinishida bo‘lishi kerak';
  }

  if (
    category !== undefined &&
    !ALLOWED_CATEGORIES.includes(category)
  ) {
    return 'Mahsulot kategoriyasi noto‘g‘ri';
  }

  if (
    image !== undefined &&
    typeof image !== 'string'
  ) {
    return 'Rasm manzili matn ko‘rinishida bo‘lishi kerak';
  }

  return null;
};

// GET — barcha mahsulotlar
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Mahsulotlarni olish xatosi:', error.message);

    res.status(500).json({
      success: false,
      message: 'Mahsulotlarni olishda xatolik',
    });
  }
};

// GET — ID orqali bitta mahsulot
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Mahsulot topilmadi',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Mahsulot ID noto‘g‘ri',
    });
  }
};

// POST — yangi mahsulot qo‘shish
const createProduct = async (req, res) => {
  try {
    const validationError = validateProduct(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const { name, price, description, category, image } = req.body;

    const product = await Product.create({
      name: name.trim(),
      price,
      description: description?.trim() || '',
      category: category || 'Coffee',
      image: image?.trim() || '',
    });

    res.status(201).json({
      success: true,
      message: 'Mahsulot muvaffaqiyatli qo‘shildi',
      product,
    });
  } catch (error) {
    console.error('Mahsulot qo‘shish xatosi:', error.message);

    res.status(400).json({
      success: false,
      message: 'Mahsulot qo‘shishda xatolik',
    });
  }
};

// PUT — mahsulotni to‘liq yangilash
const updateProduct = async (req, res) => {
  try {
    const validationError = validateProduct(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const { name, price, description, category, image } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        price,
        description: description?.trim() || '',
        category: category || 'Coffee',
        image: image?.trim() || '',
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Mahsulot topilmadi',
      });
    }

    res.json({
      success: true,
      message: 'Mahsulot muvaffaqiyatli yangilandi',
      product,
    });
  } catch (error) {
    console.error('Mahsulot yangilash xatosi:', error.message);

    res.status(400).json({
      success: false,
      message: 'Mahsulotni yangilashda xatolik',
    });
  }
};

// DELETE — mahsulotni o‘chirish
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Mahsulot topilmadi',
      });
    }

    res.json({
      success: true,
      message: 'Mahsulot muvaffaqiyatli o‘chirildi',
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Mahsulot ID noto‘g‘ri',
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};