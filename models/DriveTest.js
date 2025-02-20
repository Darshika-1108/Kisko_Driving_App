const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

// Schema for collection
const DriveTestSchema = new Schema ({
    firstname: {
        type: String,
        default: 'default'
    },
    lastname: {
        type: String,
        default: 'default'
    },
    licenseno: {
        type: String,
        default: 'default'
    },
    age: {
        type: Number
    },
    dob: {
        
        type: Date
    },
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Please provide password']
    },
    userType: {
        type: String,
        required: [true,'Please provide usertype'],
        enum: ['Driver', 'Examiner', 'Admin']
    },
    car_details: {
        make: {
            type: String,
            default: 'default'
        },
        model: {
            type: String,
            default: 'default'
        },
        year: {
            type: Number,
            default: 0
        },
        platno: {
            type: String,
            default: 'default'
        }
    },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment'
    }
});

DriveTestSchema.plugin(uniqueValidator);

DriveTestSchema.pre('save', async function(next) {
    const user = this

    // Encrypt password if modified
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    
    next();
    
});


// Give name to Collection and export as a model
const DriveTest = mongoose.model('DriveTest', DriveTestSchema);
module.exports = DriveTest;