const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const PointSchema = new Schema({
//     type: { type: String, default: 'Point' },
//     coordinates: { type: [Number], index: '2dSphere' }
// });

const SignupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createPatient: [{
        type: Schema.Types.ObjectId,
        ref: 'createPatient'
    }]
});

const Signup = mongoose.model('signup', SignupSchema);

module.exports = Signup;