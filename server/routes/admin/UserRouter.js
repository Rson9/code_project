var express = require('express')
const UserController = require('../../controllers/admin/UserController')
var usersRouter = express.Router()


usersRouter.post('/adminapi/user/login', UserController.login)
usersRouter.get('/adminapi/user/index', (req,res)=>{
    res.send({ok:1})
})

module.exports = usersRouter

