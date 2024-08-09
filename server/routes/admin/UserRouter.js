var express = require('express')
const UserController = require('../../controllers/admin/UserController')
var usersRouter = express.Router()

usersRouter.post('/adminapi/user/login', UserController.login)

module.exports = usersRouter

