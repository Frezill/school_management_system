"use strict";

var express = require('express');
var _require = require('../controller/subjectController.js'),
  postCreateSubject = _require.postCreateSubject,
  getSubject = _require.getSubject,
  putUpdateSubject = _require.putUpdateSubject,
  deleteSubject = _require.deleteSubject,
  getSubjectById = _require.getSubjectById,
  searchSubjectController = _require.searchSubjectController,
  getAllSubject = _require.getAllSubject;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initSubjectRoute = function initSubjectRoute(app) {
  router.post('/subject', checkUserJWT, isAdmin, postCreateSubject);
  router.get('/subject', checkUserJWT, getSubject);
  router.get('/detailSubject', getSubjectById);
  router.put('/subject', checkUserJWT, isAdmin, putUpdateSubject);
  router["delete"]('/subject', checkUserJWT, isAdmin, deleteSubject);
  router.get('/searchSubject', checkUserJWT, searchSubjectController);
  router.get('/getAllSubject', checkUserJWT, isAdmin, getAllSubject);
  return app.use('/api/v1', router);
};
module.exports = initSubjectRoute;