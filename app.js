const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

/*Polaczenie z baza danych*/
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/muber');

/*Sekcja 14 wyklad 101
* Express bedzie składał się z Routera, Kontrolera (ktory laczy sie z mongo) i Modelu laczacego sie z kontrolerm
* Create a Driver => router =>Controller => (MongoDB , Model)
* app jest pobierana w index.js
* */
const app = express();

/*Aby podlaczyc nasz body-parser musimy napisac
* bodyParser musi byc podlaczony powyzej routingu*/

app.use(bodyParser.json());
routes(app);

module.exports = app;