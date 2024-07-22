const express = require('express');
const { postCreateMajor, getMajor, putUpdateMajor, deleteMajor } = require('../controller/majorController');
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initMajorRoute = (app) => {

    router.post('/major', checkUserJWT, isAdmin, postCreateMajor)
    router.get('/major', checkUserJWT, getMajor)
    router.put('/major', checkUserJWT, isAdmin, putUpdateMajor)
    router.delete('/major', checkUserJWT, isAdmin, deleteMajor)

    return app.use('/api/v1', router);
}

module.exports = initMajorRoute;