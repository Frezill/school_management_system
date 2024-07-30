"use strict";

var express = require('express');
var _require = require('../controller/semesterController'),
  postCreateSemester = _require.postCreateSemester,
  getSemester = _require.getSemester,
  putUpdateSemester = _require.putUpdateSemester,
  deleteSemester = _require.deleteSemester,
  getSemesterById = _require.getSemesterById,
  updateSemesterActive = _require.updateSemesterActive;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initSemesterRoute = function initSemesterRoute(app) {
  router.post('/semester', checkUserJWT, isAdmin, postCreateSemester);
  router.get('/semester', checkUserJWT, getSemester);
  router.get('/detailSemester', checkUserJWT, getSemesterById);
  router.put('/semester', checkUserJWT, isAdmin, putUpdateSemester);
  router["delete"]('/semester', checkUserJWT, isAdmin, deleteSemester);
  router.put('/semesterActive', checkUserJWT, isAdmin, updateSemesterActive);
  return app.use('/api/v1', router);
};
module.exports = initSemesterRoute;