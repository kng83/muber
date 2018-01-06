const assert = require('assert');
const request = require('supertest');
const app = require('../app.js');

/*mocha "test": "nodemon --exec 'mocha --recursive -R min'" => recursive znaczy ze cale drzewo folderu testu
* -R specifikuje test reporter ktory dajemy na min */


/*Aby latwo robilo sie test zainstalujemy paczke supertest ktora bedzie
* nam robila fake testy npm install --save supertest
* bedzie ona symulowala request
*/

describe('The express app',()=>{

    it('handles a GET request to /api',(done)=>{
        /*praktyczne uzywanie supertestu bierzemy aplikacje robit request i patrzymy na odpowiedz*/
        request(app)
            .get('/api')
            .end((err,response)=>{
                //console.log(response);
                assert(response.body.hi ==='there');
                done();
            });
    });
});