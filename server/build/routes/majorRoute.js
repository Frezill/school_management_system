"use strict";

var express = require('express');
var _require = require('../controller/majorController'),
  postCreateMajor = _require.postCreateMajor,
  getMajor = _require.getMajor,
  putUpdateMajor = _require.putUpdateMajor,
  deleteMajor = _require.deleteMajor;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initMajorRoute = function initMajorRoute(app) {
  router.post('/major', checkUserJWT, isAdmin, postCreateMajor);
  router.get('/major', getMajor);
  router.put('/major', checkUserJWT, isAdmin, putUpdateMajor);
  router["delete"]('/major', checkUserJWT, isAdmin, deleteMajor);
  return app.use('/api/v1', router);
};
module.exports = initMajorRoute;