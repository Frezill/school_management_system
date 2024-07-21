const express = require('express')
const multer = require('multer')
const { registerNewUser } = require('../controller/login-registerController')
const { getUser, getUserById, updateUser, deleteUser } = require('../controller/userController')


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

    router.post('/register', upload.single('profileImage'), registerNewUser)

    router.get('/user', getUser)
    router.get('/detailUser', getUserById)
    router.put('/user', upload.single('profileImage'), updateUser)
    router.delete('/user', deleteUser)

    return app.use('/api/v1', router);
}

module.exports = initUserRoutes;