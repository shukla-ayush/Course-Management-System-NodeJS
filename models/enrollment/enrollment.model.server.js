var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function unEnrollStudentFromSection(enrollment) {
    return enrollmentModel.deleteOne(enrollment);
}

function deleteEnrollment(section, sectionId) {
    return enrollmentModel.remove({"section": sectionId}).exec()
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
  unEnrollStudentFromSection: unEnrollStudentFromSection,
  deleteEnrollment: deleteEnrollment
};