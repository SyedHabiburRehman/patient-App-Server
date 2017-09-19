const AuthController = require('../controllers/authController');
const PatientController = require('../controllers/patientController');

module.exports = (app) => {
    // watch for incoming requests of method GET
    // to the route http://localhost:3050/api 
    // app.get('/', (req, res, next) => {
    //     res.send('hello world')
    // })
    app.post('/api/signup', AuthController.create);
    app.get('/api/login', AuthController.get);
    
    app.post('/api/createPatient',PatientController.create);
    app.get('/api/getPatient',PatientController.get);
};