const mongoose = require('mongoose');

// we placed this connect logic in this file in before rather than with app.js file coz
// we want to connect to db before any test execute
// if we place this logic in app,.ja then it is possble for mocha to execute
// any test before connection and will get error 
before((done) => {
    mongoose.createConnection('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', () => done())
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coodinates': '2dsphere'}))
        .then(() => done())
        .catch(() => done());
});
