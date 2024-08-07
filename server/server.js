const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const initSubjectRoute = require('./src/routes/subjectRoute');
const initMajorRoute = require('./src/routes/majorRoute');
const initSemesterRoute = require('./src/routes/semesterRoute');
const initRoleRoute = require('./src/routes/roleRoute');
const initUserRoutes = require('./src/routes/userRoute');
const initEnrollmentRoute = require('./src/routes/enrollmentRoute');
const initTuitionRoute = require('./src/routes/tuitionRoute');
const initPeriodRoute = require('./src/routes/periodRoute');
const configCors = require('./src/config/cors');

//config
const PORT = process.env.PORT || 1507
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configCors(app)
app.use(cookieParser())
app.use("/images", express.static('src/uploads'))

//config routes
initUserRoutes(app)
initSubjectRoute(app)
initMajorRoute(app)
initSemesterRoute(app)
initRoleRoute(app)
initEnrollmentRoute(app)
initTuitionRoute(app)
initPeriodRoute(app)

app.listen(PORT, () => {
    console.log('app listen on port: ', PORT);
})