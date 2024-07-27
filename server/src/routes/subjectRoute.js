const express = require('express')
const { postCreateSubject, getSubject, putUpdateSubject,
    deleteSubject, getSubjectById, searchSubjectController,
    getAllSubject } = require('../controller/subjectController.js')
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initSubjectRoute = (app) => {

    router.post('/subject', postCreateSubject)
    router.get('/subject', getSubject)
    router.get('/detailSubject', getSubjectById)
    router.put('/subject', checkUserJWT, isAdmin, putUpdateSubject)
    router.delete('/subject', checkUserJWT, isAdmin, deleteSubject)
    router.get('/searchSubject', searchSubjectController)
    router.get('/getAllSubject', checkUserJWT, getAllSubject)

    return app.use('/api/v1', router);
}

module.exports = initSubjectRoute;