/*Pobieramy kontroler*/
const DriversController = require('../controllers/driver_controller');

/*module.exports jest to eksportowana funkcja ktora przyjm parametra app i eksportuje go zmienionego do
* pliku app.js
* w pliku app.js wywolywana jest jako zwykla funckja*/

module.exports = (app) =>{
    /*To get to the routes we must make Request routes
    * Incoming request :req
    * Outgoing response :res
    * Jezli przyjdzie nowy request to server odpowie mu obiektem
    * Watch for incoming requests of method GET
    * to the route http://localhost:3050/api
    * whenever you go to url bar on browser you making a get request
    * teraz aby to ladnie jescze rozdzielic robimy folder controler ktory bedzie obslugiwal responsy i requesty
    * pobieramby driver_controller do obslugi zadan i odpowiedzi*/
    /*Nie wywolujemy tutaj funckji DriverController tylko przekazujemy referencje do tej funkcji
    * wczesniej bylo:
    * app.get('/api', (req, res) => {
    * res.send({hi:'there'})
    * });
    *
    * get to pobieranie
    * post to tworzenie create
    * put to edycja edit
    * w put dajemy takzwany wildcard statement tak zeby rozszyfrowac kierowca z jakim id wyslal edycje
    * express wrzuci nam to id do obiektu req.params*/
    app.get('/api', DriversController.greeting);
    app.post('/api/drivers',DriversController.create);
    app.put('/api/drivers/:id',DriversController.edit);
    app.delete('/api/drivers/:id', DriversController.delete);
    /*szukamy wspolrzednych kierowcy index bedzie reprezentowal nasza liste
    * wspolrzednych*/
    app.get('/api/drivers',DriversController.index)
};

