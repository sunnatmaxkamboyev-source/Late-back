
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

// Routes
const menuRoutes = require('./routes/menuRoutes');

app.get('/', (req, res) => {
  res.send('Latte Lane Backend ishlayapti!');
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Latte Lane API ishlayapti!',
    project: 'Latte Lane',
    version: '1.0.0',
  });
});

app.use('/menu', menuRoutes);

// Topilmagan API manzillari
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API manzili topilmadi',
  });
});

// MongoDB ulanganidan keyin serverni ishga tushirish
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server http://localhost:${PORT} manzilida ishlayapti`
      );
    });
  } catch (error) {
    console.error('Serverni ishga tushirishda xatolik:', error.message);
    process.exit(1);
  }
};

startServer();
