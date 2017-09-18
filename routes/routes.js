const AuthController = require('../controllers/authController');

module.exports = (app) => {
    // watch for incoming requests of method GET
    // to the route http://localhost:3050/api 
    app.get('/', (req, res, next) => {
        res.send('hello world')
    })
    app.post('/api/signup', AuthController.create);
    app.get('/api/login', AuthController.get);
    // app.put('/api/drivers/:id', AuthController.edit);
    // app.delete('/api/drivers/:id', AuthController.delete);
    // app.get('/api/drivers', DriversController.index);
};