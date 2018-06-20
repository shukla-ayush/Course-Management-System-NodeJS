var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
  name: String,
  seats: Number,
  courseId: Number,
  courseName: String,
  students: [String]
}, {collection: 'section'});
module.exports = sectionSchema;