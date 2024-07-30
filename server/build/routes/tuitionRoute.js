"use strict";

var express = require('express');
var _require = require('../controller/tuitionController'),
  addTuition = _require.addTuition,
  removeTuition = _require.removeTuition,
  getTuition = _require.getTuition,
  getTuitionById = _require.getTuitionById,
  payTuition = _require.payTuition,
  updateDueDate = _require.updateDueDate;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isStudent = _require2.isStudent,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isActiveSemester = _require2.isActiveSemester,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initTuitionRoute = function initTuitionRoute(app) {
  router.post('/tuition', checkUserJWT, isStudent, isSubjectRegistrationPeriod, addTuition);
  router.put('/removeTuition', checkUserJWT, isStudent, removeTuition);
  router.get('/tuition', checkUserJWT, getTuition);
  router.get('/detailTuition', checkUserJWT, isStudent, getTuitionById);
  router.put('/payTuition', checkUserJWT, isAdmin, isPayTuitionPeriod, payTuition);
  router.put('/dueDateTuition', checkUserJWT, updateDueDate);
  return app.use('/api/v1', router);
};
module.exports = initTuitionRoute;