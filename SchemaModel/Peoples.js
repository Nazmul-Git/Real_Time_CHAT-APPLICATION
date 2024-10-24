const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const peopleSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, 
{
    timestamps: true
});

const People = model('People', peopleSchema);

module.exports = People;
