"use strict";

var express = require('express');
var multer = require('multer');
var _require = require('../controller/login-registerController'),
  registerNewUser = _require.registerNewUser,
  loginUser = _require.loginUser,
  logoutUser = _require.logoutUser;
var _require2 = require('../controller/userController'),
  getUser = _require2.getUser,
  getUserById = _require2.getUserById,
  updateUser = _require2.updateUser,
  deleteUser = _require2.deleteUser,
  searchUser = _require2.searchUser,
  getAllTeacher = _require2.getAllTeacher;
var _require3 = require('../middleware/authentication.js'),
  checkUserJWT = _require3.checkUserJWT,
  isTeacher = _require3.isTeacher,
  isAdmin = _require3.isAdmin,
  isSubjectRegistrationPeriod = _require3.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require3.isPayTuitionPeriod;
var router = express.Router();

//config multer for file upload
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function filename(req, file, cb) {
    cb(null, "".concat(Date.now()).concat(file.originalname));
  }
});
var upload = multer({
  storage: storage
});
var initUserRoutes = function initUserRoutes(app) {
  router.post('/register', checkUserJWT, isAdmin, upload.single('profileImage'), registerNewUser);
  router.post('/login', loginUser);
  router.post('/logout', checkUserJWT, logoutUser);
  router.get('/user', checkUserJWT, getUser);
  router.get('/detailUser', checkUserJWT, getUserById);
  router.put('/user', checkUserJWT, isAdmin, upload.single('profileImage'), updateUser);
  router["delete"]('/user', checkUserJWT, isAdmin, deleteUser);
  router.get('/searchUser', checkUserJWT, isAdmin, searchUser);
  router.get('/getAllTeacher', checkUserJWT, getAllTeacher);
  return app.use('/api/v1', router);
};
module.exports = initUserRoutes;