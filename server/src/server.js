const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const initSubjectRoute = require('./routes/subjectRoute');
const initMajorRoute = require('./routes/majorRoute');
const initSemesterRoute = require('./routes/semesterRoute');
const initRoleRoute = require('./routes/roleRoute');
const initUserRoutes = require('./routes/userRoute');
const initEnrollmentRoute = require('./routes/enrollmentRoute');
const initTuitionRoute = require('./routes/tuitionRoute');
const initPeriodRoute = require('./routes/periodRoute');
const configCors = require('./config/cors');

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