"use strict";

var express = require('express');
var _require = require('../controller/roleController'),
  postCreateRole = _require.postCreateRole,
  getRole = _require.getRole,
  putUpdateRole = _require.putUpdateRole,
  getRoleById = _require.getRoleById,
  deleteRole = _require.deleteRole;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isPayTuitionPeriod = _require2.isPayTuitionPeriod;
var router = express.Router();
var initRoleRoute = function initRoleRoute(app) {
  router.post('/role', checkUserJWT, isAdmin, postCreateRole);
  router.get('/role', checkUserJWT, getRole);
  router.get('/detailRole', checkUserJWT, getRoleById);
  router.put('/role', checkUserJWT, isAdmin, putUpdateRole);
  router["delete"]('/role', checkUserJWT, isAdmin, deleteRole);
  return app.use('/api/v1', router);
};
module.exports = initRoleRoute;