const express = require('express');
const { postCreateSemester, getSemester, putUpdateSemester,
    deleteSemester, getSemesterById,
    updateSemesterActive } = require('../controller/semesterController');
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initSemesterRoute = (app) => {

    router.post('/semester', checkUserJWT, isAdmin, postCreateSemester)
    router.get('/semester', checkUserJWT, getSemester)
    router.get('/detailSemester', checkUserJWT, getSemesterById)
    router.put('/semester', checkUserJWT, isAdmin, putUpdateSemester)
    router.delete('/semester', checkUserJWT, isAdmin, deleteSemester)
    router.put('/semesterActive', checkUserJWT, isAdmin, updateSemesterActive)

    return app.use('/api/v1', router);
}

module.exports = initSemesterRoute;