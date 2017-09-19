const Signup = require('../models/signup');
const CreatePatient = require('../models/createPatient');

module.exports = {
    create: (req, res, next) => {
        // const date = new Date().toLocaleDateString();
        const patientProps = req.body;
        console.log('PATIENT PROPS', patientProps);
        const { _id } = patientProps;

        Signup.findById({ _id })
            .then(user => {
                if (user) {
                    const patient = new CreatePatient({ patientName: patientProps.patientName, disease: patientProps.disease, medication: patientProps.medication, cost: patientProps.cost, date: patientProps.date })
                    // const patient = new CreatePatient({ patientName: 'asd', disease: 'a', medication: 'asddsad', cost: '50', date })
                    user.createPatient.push(patient);
                    Promise.all([user.save(), patient.save()])
                        .then(([user, patient]) => {
                            res.send(patient)
                        })
                }
            })
            .catch(next)
    },

    get: (req, res, next) => {
        const { _id } = req.body
        // Signup.findOne({ email: 'syed@gmail.com' })
        Signup.findById({ _id })
            .populate('createPatient')
            .then(patients => {
                console.log(patients.createPatient)
                res.send(patients.createPatient);
            })
            .catch(next)
    }
};
