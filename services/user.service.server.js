module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.put('/api/profile', updateUser);
  app.post('/api/logout', logout);
  app.post('/api/login', login);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
        .then(function(user) {
          if(user == null){
             res.send({errorLogin: 0})
          }
          else{
             req.session['currentUser'] = user;
             res.json(user);
          }
        })
  }

  function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
    var user = req.session['currentUser'];
    if(user == null){
      res.sendStatus(503);
    }//res.send(req.session['currentUser']);
    else{
      userModel.findUserById(user._id)
        .then(function (user) {
          res.json(user)
        })
    }
  }



  function updateUser(req, res) {
    var user = req.body;
      userModel.updateUser(user)
        .then(function (user){
          res.send(user);
          })
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.findUserByUsername(user)
        .then(function (count){
          if(count === 0){
              userModel.createUser(user)
                  .then(function (user){
                      req.session['currentUser'] = user;
                      res.send(user);
                  })
          }
          else{
              res.send({errorResponse: 0})
          }
        })

  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
