const express = require('express')
const multer = require('multer')
const { registerNewUser, loginUser, logoutUser } = require('../controller/login-registerController')
const { getUser, getUserById, updateUser, deleteUser, searchUser, getAllTeacher } = require('../controller/userController')
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

//config multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage })

const initUserRoutes = (app) => {

    router.post('/register', isAdmin, upload.single('profileImage'), registerNewUser)
    router.post('/login', loginUser)
    router.post('/logout', checkUserJWT, logoutUser)

    router.get('/user', checkUserJWT, getUser)
    router.get('/detailUser', checkUserJWT, getUserById)
    router.put('/user', checkUserJWT, isAdmin, upload.single('profileImage'), updateUser)
    router.delete('/user', checkUserJWT, isAdmin, deleteUser)
    router.get('/searchUser', checkUserJWT, isAdmin, searchUser)
    router.get('/getAllTeacher', checkUserJWT, getAllTeacher)

    return app.use('/api/v1', router);
}

module.exports = initUserRoutes;