const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Ініціалізуємо Express-додаток
const app = express();

// Встановлюємо EJS як механізм шаблонів
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Додаємо middleware для парсингу URL-кодованих тіл запитів (форм)
app.use(express.urlencoded({ extended: true }));

// Визначаємо папку для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Імпортуємо та використовуємо маршрути
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Визначаємо порт для запуску сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));

module.exports = app; // Експортуємо екземпляр додатку
