const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controllers', () => {
    it('Post to /api/drivers createa a new driver', (done) => {
        Driver.count().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'test@test.com' })  // This .send just customizing our post request by sending some info
                .end(() => {
                    Driver.count().then((newCount) => {
                        assert(count + 1 === newCount)
                        done();
                    });
                });
        });
    });

    it('PUT to /api/drivers/id edits an existing driver', (done) => {
        const driver = new Driver({ email: 't@t.com', driving: false });

        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ driving: true })
                .end(() => {
                    Driver.findOne({ email: 't@t.com' })
                        .then((driver) => {
                            console.log(driver)
                            assert(driver.driving === true);
                            done();
                        });
                });
        });

    });

    it('DELETE to /api/drivers/id can delete a driver', (done) => {
        const driver = new Driver({ email: 'test@test.com' });
        console.log(driver._id);
        driver.save().then((driver) => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findOne({ email: 'test@test.com' })
                        .then((driver) => {
                            assert(driver === null);
                            done();
                        });
                });
        });
    });
    it.only('GET to /api/drivers finds drivers in a location', (done) => {
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.54645, 47.614651] }
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.65465, 25.54651] }
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, response) => {
                        assert(response.body.length === 1);
                        assert(response.body[0].obj.email === 'miami@test.com');
                        done();
                    });
            });

    });
});