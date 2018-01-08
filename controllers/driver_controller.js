//Zazwyczaj sie robi 1 kontroler dla jednego zadania w naszej aplikacji
//Tu eksportujemy obiekt
//stary greeting wygladalby tak greeting:function(req,res){}
//Trzeba gdzies model zaimportowac
const Driver = require('../models/driver');

module.exports ={
    greeting(req,res){
        console.log('greeting');
        res.send({hi: 'there'});
    },
    /*ta nazwa to jest konwencja (ze czesto sie to tak nazywa)
    * post request sluzy do tworzenia nowy rzeczy tu jest post
    * Sekcja 14 wyklad 109 minuta: 1:38
    * Post dla node wyglada nastepujaco:
    * New request
    * => Here's a part of it
    * => Here's a part of it
    * => Here's a part of it
    * => Done! Call the route Handler
    * Node nie dostaje calego requestu dostaje poszczegolne jego czesci
    * Jest pewna faza negocjacyjna na poczatku dlatego ten request dzielony jest
    * na czesci. Express defaultowo nie robi nam laczenia tych czesci dlatego musimy
    * uzyc body-parser. On go laczy i odpowiedz req mamy w req.body (body-parser to middleware)
    * npm install --save body-parser */

    create(req,res){
       // console.log(req,res);
        /*
        * tutaj pobieramy wlasciwosci obiektu by stworzyc nowego
        * kierowce do wyslania. Tworzymy nowego kierowce i wysylamy
        * metoda post do tego co wyslal zgloszenie kierowcy
        * Tu dostalismy requesta tworzymy kierowce i wysylamy odpowiedz do tworzacego
        */
        const driverProps = req.body;
        Driver.create(driverProps)
            .then(driver => res.send(driver));

    }
};