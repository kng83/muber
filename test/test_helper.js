const mongoose = require('mongoose');

/*Robimy tu baze danych testowa tak by nienadpisywac glupotami naszej normalnej bazy danych
* Lepiej zeby laczyc sie testowa baza danych w folderze test i nie zasmiecac app.js*/
before(done=>{
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open',() =>done())
        .on('error',err => {
            console.warn('Warning',err);
        });
});

/*Usuwamy kolekcje kierowcow musimy zrobic tu catch poniewaz jak bedzie pierwszy test to nie
* bedzie jeszcze zadnej kolekcji */
beforeEach(done =>{
    const {drivers} = mongoose.connection.collections;
        drivers.drop()
        .then(()=>done())
        .catch(()=>done());
});