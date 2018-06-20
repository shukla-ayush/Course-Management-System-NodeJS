var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserByUsername(user){
  return userModel.count({username: user.username});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function updateUser(user){
  return userModel.findOneAndUpdate({username: user.username},
      {$set: {firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              address: user.address,
              email: user.email}},
              {new: true})
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
  findUserByUsername: findUserByUsername,
  updateUser: updateUser
};

module.exports = api;