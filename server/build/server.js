"use strict";

var express = require('express');
require('dotenv').config();
var cookieParser = require('cookie-parser');
var initSubjectRoute = require('./routes/subjectRoute');
var initMajorRoute = require('./routes/majorRoute');
var initSemesterRoute = require('./routes/semesterRoute');
var initRoleRoute = require('./routes/roleRoute');
var initUserRoutes = require('./routes/userRoute');
var initEnrollmentRoute = require('./routes/enrollmentRoute');
var initTuitionRoute = require('./routes/tuitionRoute');
var initPeriodRoute = require('./routes/periodRoute');
var configCors = require('./config/cors');

//config
var PORT = process.env.PORT || 1507;
var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
configCors(app);
app.use(cookieParser());
app.use("/images", express["static"]('src/uploads'));

//config routes
initUserRoutes(app);
initSubjectRoute(app);
initMajorRoute(app);
initSemesterRoute(app);
initRoleRoute(app);
initEnrollmentRoute(app);
initTuitionRoute(app);
initPeriodRoute(app);
app.listen(PORT, function () {
  console.log('app listen on port: ', PORT);
});