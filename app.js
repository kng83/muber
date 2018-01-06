const express = require('express');
const routes = require('./routes/routes');



/*Sekcja 14 wyklad 101
* Express bedzie składał się z Routera, Kontrolera (ktory laczy sie z mongo) i Modelu laczacego sie z kontrolerm
* Create a Driver => router =>Controller => (MongoDB , Model)
* app jest pobierana w index.js
* */
const app = express();


routes(app);
module.exports = app;