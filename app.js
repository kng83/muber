const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');


/*Sekcja 14 wyklad 101
* Express bedzie składał się z Routera, Kontrolera (ktory laczy sie z mongo) i Modelu laczacego sie z kontrolerm
* Create a Driver => router =>Controller => (MongoDB , Model)
* app jest pobierana w index.js
* */

const app = express();

/*Polaczenie z baza danych*/
mongoose.Promise = global.Promise;

//Jezeli nie jestesmy w srodowisku testowym to polacz z baza muber
if(process.env.NODE_ENV !== "test"){
    mongoose.connect('mongodb://localhost/muber');
}


/*Aby podlaczyc nasz body-parser musimy napisac
* bodyParser musi byc podlaczony powyzej routingu. On jest wlasciwiie middlewarem wykonywanym przed
* routes tak by zformatowac nam odpowiedz (dodar req.body)*/

app.use(bodyParser.json());
routes(app);

/*app.use rejestruje nam middlewara , wazna jest kolejnosc w kodzie javascript co mamy po kolei najpierw parser
* do json potem routes potem obsluga responsu
* mamy taka kolejnosc sekcja 14 wyklad 117 5:58:
* req=>middleware=>middleware=>request handler =>tu jest blad => middleware nasz =>res
* parametr err odpowiada bledowi zgloszonemy przez ostatni middleware przed bledem czyli request handler
* req to nasz request
* res to nasz response
* next to jest funkcja taka aby wywolac nasz nastepny middleware (robic lancuch)
* ale pierwsza pruba nie dziala bo nasz poprzedni middleware nie wykonal next czyli controller w driver_controller
* jezeli nie udalo nam sie poprawnego email wyslac to dostaniemy odpowiedz err.message= " driver validation failed"
* zeby poinformowac uzytkonika ze jest jednak cos nie tak zminiamy status http response z 200 na 422
* 422 to dobry kod dla bledow sematycznych jako odpowiedz przy validacji
* */

app.use((err,req,res,next)=>{
   // console.log(err.message);
    res.status(422).send({error:err.message});

});

/*robimy middleware ktory obsluzy nam blad jezeli nie wpiszemy email w wysylanym poscie ten middleware
* powinien uruchomic sie po naszym routes handler aby przechwycic z niego blad i go obslużyc
* */



module.exports = app;