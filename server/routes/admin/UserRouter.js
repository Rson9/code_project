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
usersRouter.post('/adminapi/user/useradd', upload.single('file'), UserController.useradd)
usersRouter.get('/adminapi/user/userlist', UserController.getlist)
usersRouter.get('/adminapi/user/userlist/:id', UserController.getlist)
usersRouter.put('/adminapi/user/userlist/:id', UserController.putlist)
usersRouter.delete('/adminapi/user/userlist/:id', UserController.userdelete)

module.exports = usersRouter

