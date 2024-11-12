const express = require('express');
const router = express.Router();

// Визначаємо маршрути
router.get('/', (req, res) => {
    res.render('users/index'); // Відображаємо шаблон 'views/users/index.ejs'
});

router.get('/profile', (req, res) => {
    res.render('users/profile'); // Відображаємо шаблон 'views/users/profile.ejs'
});

module.exports = router;
