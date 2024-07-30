"use strict";

var express = require('express');
var _require = require('../controller/enrollmentController'),
  postCreateEnrollment = _require.postCreateEnrollment,
  putUpdateScore = _require.putUpdateScore,
  putUpdateAttendance = _require.putUpdateAttendance,
  getEnrollment = _require.getEnrollment,
  deleteEnrollment = _require.deleteEnrollment,
  getEnrollmentByStudentId = _require.getEnrollmentByStudentId,
  getEnrollmentForTeacher = _require.getEnrollmentForTeacher,
  getStudentForTeacher = _require.getStudentForTeacher,
  getTeacherForAssign = _require.getTeacherForAssign,
  postCreateAssign = _require.postCreateAssign;
var _require2 = require('../middleware/authentication.js'),
  checkUserJWT = _require2.checkUserJWT,
  isStudent = _require2.isStudent,
  isTeacher = _require2.isTeacher,
  isAdmin = _require2.isAdmin,
  isSubjectRegistrationPeriod = _require2.isSubjectRegistrationPeriod,
  isActiveSemester = _require2.isActiveSemester;
var router = express.Router();
var initEnrollmentRoute = function initEnrollmentRoute(app) {
  router.post('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, isActiveSemester, postCreateEnrollment);
  router.put('/scoreEnrollment', checkUserJWT, isActiveSemester, isTeacher, putUpdateScore);
  router.put('/attendanceEnrollment', checkUserJWT, isActiveSemester, isTeacher, putUpdateAttendance);
  router.get('/enrollment', checkUserJWT, getEnrollment);
  router["delete"]('/enrollment', checkUserJWT, isActiveSemester, isSubjectRegistrationPeriod, deleteEnrollment);
  router.get('/enrollmentByStudentID', checkUserJWT, isStudent, getEnrollmentByStudentId);
  router.get('/getEnrollmentForTeacher', checkUserJWT, isTeacher, getEnrollmentForTeacher);
  router.get('/getStudentForTeacher', checkUserJWT, isTeacher, getStudentForTeacher);
  router.get('/assignTeacher', checkUserJWT, isAdmin, getTeacherForAssign);
  router.post('/assignTeacher', checkUserJWT, isActiveSemester, isAdmin, postCreateAssign);
  return app.use('/api/v1', router);
};
module.exports = initEnrollmentRoute;