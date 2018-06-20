var mongoose = require('mongoose');
var enrollmentSchema = mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SectionModel'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  grade: String
}, {collection: 'enrollments'});
module.exports = enrollmentSchema;