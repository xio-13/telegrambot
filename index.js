const TelegramApi = require('node-telegram-bot-api');


const { start } = require('repl');


const token = '7387699378:AAEx7D3EoR7VrxCITMOR7wBH5zUvbEJCNUM';  // Замініть на ваш токен

const bot = new TelegramApi(token, { polling: true });

const chats = {};
bot.setMyCommands([
    {command: '/start', description: 'Початок'},
])


// Обробка повідомлень від користувача
bot.on('message', async msg => {
    console.log('Отримано повідомлення:', msg); 
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Добрий день! Вас вітає "ALUMINIUM BODY SHOP". Вже більше 10 років, ми робимо життя наших клієнтів кращим, та спокійнішим, тому що використовуємо тільки спеціалізоване обладнання та найефективніші підходи до ремонту гарантуючи найвищу якість, також ми єдиний сервіс у Тернополі який спеціалізується, не тільки на кузовному ремонті, а й на ремонті алюмінієвих деталей авто, що суттєво зменшує Ваші витрати на ремонт, оскільки немає постійної необхідності купувати повністю нову деталь.      Що Вас цікавить?', {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'Консультація', callback_data: 'consultation' }],
                    [{ text: 'Підбір запчастини', callback_data: 'parts_selection' }],
                    [{ text: 'Ремонт Авто/Деталі', callback_data: 'repair' }],
                    [{text: 'Молотки для рихтовки', callback_data: 'hammers'}],
                    [{ text: 'Назад', callback_data: 'back_to_main' }]
                ]
            })
        });
    } 
   
});



// Головне меню
const messageOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Консультація', callback_data: 'consultation' }],
            [{ text: 'Підбір запчастини', callback_data: 'parts_selection' }],
            [{ text: 'Ремонт Авто/Деталі', callback_data: 'repair' }],
            [{text: 'Молотки для рихтовки', callback_data: 'hammers'}],
            [{ text: 'Назад', callback_data: 'back_to_main' }]
        ]
    })
}

// Підменю для консультації
const consultationMenu = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '1. Де ви знаходитесь?', callback_data: 'location' }],
            [{ text: '2. Чи можна глянути приклади ваших робіт?', callback_data: 'examples' }],
            [{ text: '3. Чи є у вас прайс-лист?', callback_data: 'price_list' }],
            [{ text: '4. Чи можна відправити фото пошкоджень?', callback_data: 'send_photo' }],
            [{ text: '5. Чи довга черга?', callback_data: 'queue' }],
            [{ text: '6. Чи робите авто під ключ?', callback_data: 'full_service' }],
            [{ text: '7. Інше запитання', callback_data: 'other' }],
            [{ text: 'Назад', callback_data: 'back_to_main' }]
        ]
    })
}

// Додаткові кнопки після запитання "Чи можна глянути приклади ваших робіт?"
const examplesButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Ремонт основного кузову', callback_data: 'body' }],
            [{ text: 'Ремонт алюмінієвих деталей', callback_data: 'aluminium' }],
            [{ text: 'Назад', callback_data: 'back_to_main' }]
        ]
    })
}
// молотки для рихтовки
const hammersButtons = {
    reply_markup: JSON.stringify ({
        inline_keyboard:[
            [{ text: 'Латунні молотки',  callback_data:'brass_hammers' }],
            [{ text: 'Молотки з інструментальної сталі', callback_data:'steel' }]
        ]
    })
}

// кнопка стоп
const stopButtons = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Стоп', callback_data: 'stop' }],
           
        ]
    })
}


// Обробка натискання кнопок
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;

    // Відображення підменю консультацій
    if (data === 'consultation') {
      await  bot.sendMessage(chatId, 'Оберіть ваше запитання:👇🏻', consultationMenu);
    }
    // Повернення до головного меню
    else if (data === 'back_to_main') {
       await bot.sendMessage(chatId, 'Оберіть опцію:👇🏻', messageOptions);
    }
    // Відправка відповідей на запитання
    else if (data === 'location') {
       await bot.sendMessage(chatId, '1. Ми знаходимося за адресою: м.Тернопіль, вул. Гайова 47.');
    } else if (data === 'examples'){
       await bot.sendMessage(chatId, '2. Оберіть опцію:👇🏻', examplesButtons);
    }
    
    // Відповіді на інші запитання
    else if (data === 'body') {
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/7-1E7ho3vjylDVuiIJjH3sAB6q6Lc9ZqQnmdSPY-2UgJpmGzzXJ4hoYOPp1q8NDhJclGkkFA4epvGNj_=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/519qJrbaMemyN-tk_8pvCo6_WFZO4dWp0Ew83CY7EEzpVkkGxclsoj2RaGEfiNSodWFjT9DEM7dE5FX_=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/wTr9RnVC78soxDDzowN-FPREHnIjdaS6y9eXWZ8ti2-JM2MJkNaDG6I03ieqeXLwKi0-K1WKGF-xleTy=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/AJtBAiE2_3N6Jh2vO5A2OKWJT7I9TmEs0lPtroyewxJIengsUnsSccM3ElD9jhpmFWyyA6qz4XWUoz8b=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/kcEMqfnoOHXu41fRFFkJSudG7mXQ8H79OZinlS6vrDJKcP0euD9Kt5oF-jxAXyUbdQbfXDBTjBMQeru_=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/vM__m60gRX4cqB0pJ8kXUaCGdBfcjsdNKGs-fasTh-Hpy0sn2Spo04UiHRi7-0qTzd3COoaErQgBT2PU=s265-w265-h265');
    } else if (data === 'aluminium') {
        await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/mdyGn2NuL3mRLNeYeG3XvcNrVP1j6sGHDT9yE4HlOEwPesSApqkgJkYHmAwH_c3ekaTZO2wcPoLHkgTR=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/Y3hWUFbiRoC_jeSRAsfbUUwB4qRG6igO1WytH_592Rv5gp3oSsl8dhC-DpIjEqssOsrAycyEd1QRUXR4=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/OWD8NijW2J1oTFRvZSsCRdOHY6zBaD9Vr9O9jbIdkAN29WHyp5XuRtxi6RNYbN-iSgjICR51HnkyiHCU=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/bCVZSZ7wv86Plo8XBdFNoGCAZ-zkZF6A7lrB_4V42ncnPwhgALLlo7LsN86XKL8zkqTXAO2xb4Zeyyqa=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/4_WyLB8sjaDNpdSFTG1dmEY1JYqzlNdEFYWhNDkozFbjbyNOh-O3b1lGFeHfVz3RbSjClZcU6BfO6_Ul=s265-w265-h265');
       await bot.sendPhoto(chatId, 'https://lh3.googleusercontent.com/JxDpAK01Azo8FGSHcUkuGfBRZD3FDbwrMW9qcFyHAXe4Pi-yB5tNpy-WxC5BejlEIQHPjWqIIBjcKpTp=s265-w265-h265');  
    } else if (data === 'price_list') {
       await bot.sendMessage(chatId, '3. Всі ціни формуються при перегляді пошкоджень авто.');
    } else if (data === 'send_photo') {
       await bot.sendMessage(chatId, '4. Звичайно, також було б чудово отримати й відео огляд пошкодження, відправити матеріал можна у розділі "Записатися на Ремонт/Авто"');
    } else if (data === 'queue') {
       await bot.sendMessage(chatId, '5. Ні, при наявності всіх деталей.');
    } else if (data === 'full_service') {
       await bot.sendMessage(chatId, '6. Так.');
    } else if (data === 'other') {
       await bot.sendMessage(chatId, '7. Поставте своє запитання за посиланням: https://forms.gle/SQwK1ZavZZKkiwM2A');
    } 
    // Відображення підменю підбір запчастин
else if (data === 'brass_hammers'){
    await bot.sendMessage(chatId, 'https://lh3.googleusercontent.com/p/AF1QipNYeg9PTZFMOu505-mkiUXOf02zlzNJ28nAZd4a=s1360-w1360-h1020');
    await  bot.sendMessage(chatId, 'Ціна: 2000 грн');
    await  bot.sendMessage(chatId, 'Довжина: 350 мм');
    await  bot.sendMessage(chatId, 'Вага: 250 г');
    await  bot.sendMessage(chatId, 'Для замовлення заповніть коротку форму:  https://forms.gle/HoLwugjhpUiqpcPAA');

} else if (data === 'steel'){
    await bot.sendMessage(chatId, 'https://lh3.googleusercontent.com/p/AF1QipNJjrUnTfZCb8h4SolFnOuI1hhrdsHMLjgF2Dj_=s1360-w1360-h1020');
    await  bot.sendMessage(chatId, 'Ціна: 800 грн');
    await  bot.sendMessage(chatId, 'Довжина: 350 мм');
    await  bot.sendMessage(chatId, 'Вага: 250 г');
    await  bot.sendMessage(chatId, 'Для замовлення заповніть коротку форму:  https://forms.gle/HoLwugjhpUiqpcPAA');

}
    
else if (data === 'parts_selection') {
  await  bot.sendMessage(chatId, 'Даний розділ на стадії розробки⚙️');
} else if (data === 'repair'){
    await bot.sendMessage(chatId, 'Чудово, для запису на ремонт авто необхідно заповнити коротку заявку: https://forms.gle/Fx6wiQc8WUpmRDBd8 . Після заповнення натисніть "Стоп" для підтвердження заявки.', stopButtons )

} else if (data === 'hammers') {
    await  bot.sendMessage(chatId,'Оберіть опцію:👇🏻' ,  hammersButtons);

}
else if (data === 'stop') {
   await bot.sendMessage(chatId, "Зафіксовано! Протягом дня з Вами зв'яжеться наш менеджер для уточнення всіх деталей.🤗")
}
});



