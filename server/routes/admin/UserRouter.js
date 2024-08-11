var express = require('express')
const UserController = require('../../controllers/admin/UserController')
var usersRouter = express.Router()

//图片上传
const multer = require('multer')
const upload = multer({
  dest: 'public/avataruploads/'
})

usersRouter.post('/adminapi/user/login', UserController.login)
usersRouter.post('/adminapi/user/upload', upload.single('file'), UserController.upload)

module.exports = usersRouter

