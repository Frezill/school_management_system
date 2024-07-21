const express = require('express')
const initSubjectRoute = require('./src/routes/subjectRoute');
const initMajorRoute = require('./src/routes/majorRoute');
const initSemesterRoute = require('./src/routes/semesterRoute');
const initRoleRoute = require('./src/routes/roleRoute');

//config
const PORT = process.env.PORT || 1507
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config routes
// initUserRoutes(app)
initSubjectRoute(app)
initMajorRoute(app)
initSemesterRoute(app)
initRoleRoute(app)

app.listen(PORT, () => {
    console.log('app listen on port: ', PORT);
})