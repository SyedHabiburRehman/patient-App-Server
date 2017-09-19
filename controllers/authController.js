const Signup = require('../models/signup');

module.exports = {

    getUser: (req, res, next) => {
        const userProps = req.body;
        console.log('---------', userProps);
        // Signup.findOne({ email: 'syed@gmail.com', password: '123456' })
        Signup.findOne({ email: userProps.email, password: userProps.password })
            .then((user) => {
                if (user !== null) {
                    console.log(user)
                    res.send(user)
                } else {
                    res.send({ error: 'email or password is incorrect' })
                }
            })
            .catch(next);
    },


    create: (req, res, next) => {
        const userProps = req.body;
        console.log('************', userProps)
        Signup.findOne({ email: userProps.email })
        // Signup.findOne({ email: 'syed@gmail.com' })
            .then((user) => {
                if (user === null) {
                    Signup.create(userProps)
                        .then((user) => res.send(user))
                        .catch("0000000000000000000", next);
                } else {
                    console.log('ELSE STATEMENT', user)
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