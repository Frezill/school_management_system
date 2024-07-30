"use strict";

var express = require('express');
var _require = require('../controller/periodController'),
  updatePayTuitionActive = _require.updatePayTuitionActive,
  updateSubjectRegistrationActive = _require.updateSubjectRegistrationActive,
  getPeriod = _require.getPeriod;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initPeriodRoute = function initPeriodRoute(app) {
  router.put('/payTuitionPeriod', checkUserJWT, isAdmin, updatePayTuitionActive);
  router.put('/subjectRegistrationPeriod', checkUserJWT, isAdmin, updateSubjectRegistrationActive);
  router.get('/period', checkUserJWT, getPeriod);
  return app.use('/api/v1', router);
};
module.exports = initPeriodRoute;