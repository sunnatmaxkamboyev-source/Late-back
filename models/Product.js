const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Mahsulot nomi kerak'],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, 'Mahsulot narxi kerak'],
      min: [0.01, 'Narx noldan katta bo‘lishi kerak'],
    },

    description: {
      type: String,
      default: '',
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Mahsulot kategoriyasi kerak'],
      enum: [
        'Coffee',
        'Milkshakes',
        'Cakes & Slices',
        'Iced Drinks',
      ],
      default: 'Coffee',
    },

    image: {
      type: String,
      default: '',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;