const express = require('express')
const { postCreateSubject, getSubject, putUpdateSubject,
    deleteSubject, getSubjectById, searchSubjectController,
    getAllSubject } = require('../controller/subjectController.js')
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initSubjectRoute = (app) => {

    router.post('/subject', checkUserJWT, isAdmin, postCreateSubject)
    router.get('/subject', checkUserJWT, getSubject)
    router.get('/detailSubject', getSubjectById)
    router.put('/subject', checkUserJWT, isAdmin, putUpdateSubject)
    router.delete('/subject', checkUserJWT, isAdmin, deleteSubject)
    router.get('/searchSubject', checkUserJWT, searchSubjectController)
    router.get('/getAllSubject', checkUserJWT, isAdmin, getAllSubject)

    return app.use('/api/v1', router);
}

module.exports = initSubjectRoute;