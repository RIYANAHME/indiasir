const mongoose = require('mongoose');

studentSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    studentName:String,
    fname:String,
    roll:Number,
    dob:String
})

module.exports = mongoose.model('Student',studentSchema);