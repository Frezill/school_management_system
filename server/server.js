const express = require('express')
const initSubjectRoute = require('./src/routes/subjectRoute');
const initMajorRoute = require('./src/routes/majorRoute');

//config
const PORT = process.env.PORT || 1507
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config routes
// initUserRoutes(app)
initSubjectRoute(app)
initMajorRoute(app)

app.listen(PORT, () => {
    console.log('app listen on port: ', PORT);
})