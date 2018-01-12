const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

/*Dlatego tak dziwnie robimy poniewaz mongoose i mocha dziwnie razem pracuja i mocha
* jak by bylo require stworzyla by model 2-krotnie*/
const Driver = mongoose.model('driver');



describe('Drivers controller',()=>{

    it('Post to /api/drivers creates a new driver', (done)=>{

        /*Sprawdzamy ile razy pojawilo  sie driver i sprwdzamy czy to jeden
        * kierowca bierzy count przed postem i po poscie
        * dajemy count + 1 bo caly czas sie tworza kierowcy bo nie kasujemy ich z bazy danych
        * sprawdzamy prze postem i po postcie*/

        Driver.count().then((count)=>{
            request(app)
                .post('/api/drivers')
                .send({email:'test@test.com'}) //ta nazwa jest troche niewlasciwa bo ten email jest wysylany przez drivera
                .end(()=>{
                    Driver.count().then(newCount=> {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });

    });
    it('Put to /api/drivers/:id edits an existing driver',done =>{
        //musimy utworzyc kierowce
        //updetowac kierowce
        //ponownie go zaladowac z bazy i sprawdzic assert
        //zapisujemy kierowce i dostajemy sie do jego id aby utworzyc url


        const driver = new Driver({email: 't@t.com', driving:false});
        driver.save().then(()=>{
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({driving:true})
                .end(()=>{
                    Driver.findOne({email:'t@t.com'})
                        .then(driver =>{
                            assert(driver.driving === true);
                            done();
                        })
                });
        });
    });

    it('DELETE to /api/drivers/id can delete a driver', done => {
        const driver = new Driver({email: 'ts@t.com'});
        driver.save().then(()=>{
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(()=>{
                   Driver.findOne({email:driver.email})
                       .then(driver =>{
                           assert(driver===null);
                           done();
                       }).catch(err =>console.log(err.message));
                    });
                });
        });

    /*Mamy tu problem bo jak robimy drop kolekcji to kasuje sie nasz obiekt geoNear
    * w bazie. Jest on tworzony tylko raz jak robimy Schema.*/
    it('Get to /api/drivers finds drivers in location',(done)=>{
        const seattleDrvier = new Driver({
            email: 'settle@test.com',
            geometry: {type: 'Point', coordinates:[-122.4759902,47.6147628]}
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: {type: 'Point', coordinates:[-80.253, 25.791]}
        });

        Promise.all([seattleDrvier.save(),miamiDriver.save()])
            .then(()=>{
                request(app)
                    .get('/api/drivers/?lng=-80&lat=25')
                    .end((err,response)=>{
                        console.log(response);
                        done();
                    })
            })

    })
});