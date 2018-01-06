//Zazwyczaj sie robi 1 kontroler dla jednego zadania w naszej aplikacji
//Tu eksportujemy obiekt
//stary greeting wygladalby tak greeting:function(req,res){}

module.exports ={
    greeting(req,res){
        res.send({hi: 'there'});
    }

};