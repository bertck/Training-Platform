const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    sport: {
        type: String,
        required: [true, 'Należy podać rodzaj sportu'],
        trim: true,
        maxlength: [30, 'Max. 30 znaków']
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: "Activity"
    },
    time: {
        type: Date,
        required: [true, 'Należy podać czas trwania']
    },
    distance: {
        type: Number,
        default: 0
    },
    elevation: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Activity', ActivitySchema)