const Signup = require('../models/signup');

module.exports = {

    get(req, res, next) {
        const patientProps = req.body;
        console.log('************', patientProps);
        Signup.find({ email: patientProps.email })
            .then((patients) => res.send(patients))
            .catch(next);
    },

    // index(req, res, next) {
    //     const { lng, lat } = req.query;

    //     Driver.geoNear(
    //         { type: 'Point', coordinates: [lng, lat] },
    //         { spherical: true, maxDistance: 200000 }
    //     )
    //         .then((drivers) => res.send(drivers))
    //         .catch(next);
    // },

    create(req, res, next) {
        const patientProps = req.body;
        console.log('************', patientProps)
        Signup.findOne({ email: patientProps.email })
            .then((patient) => {
                if (patient === null) {
                    Signup.create(patientProps)
                        .then((patient) => res.send(patient))
                        .catch("0000000000000000000", next);
                } else {
                    console.log('ELSE STATEMENT', patient)
                    res.send({ error: 'email exist' });
                }
            })
            .catch(next);

    },

    // edit(req, res, next) {
    //     const patientId = req.params.id;
    //     console.log('============', patientId)
    //     const patientProps = req.body;
    //     console.log('-----------------', patientProps)

    //     Signup.findByIdAndUpdate({ _id: patientId }, patientProps)
    //         .then(() => Signup.findById({ _id: patientId }))
    //         .then((patient) => res.send(patient))
    //         .catch(next);
    // },

    // delete(req, res, next) {
    //     const patientId = req.params.id;
    //     Signup.findByIdAndRemove({ _id: patientId })
    //         .then((patient) => res.status(204).send(patient))
    //         .catch(next);
    // }
};