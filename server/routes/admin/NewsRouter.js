var express = require('express')
const NewsController = require('../../controllers/admin/NewsController')
var newsRouter = express.Router()
//图片上传
const multer = require('multer')
const upload = multer({
  dest: 'public/newsuploads/'
})

newsRouter.post('/adminapi/news/add', upload.single('file'), NewsController.add)
newsRouter.get('/adminapi/news/list', NewsController.getList)
newsRouter.post('/adminapi/news/list', upload.single('file'), NewsController.updateList)
newsRouter.get('/adminapi/news/list/:id', NewsController.getList)
newsRouter.delete('/adminapi/news/list/:id', NewsController.delList)
newsRouter.put('/adminapi/news/publish', NewsController.publish)
module.exports = newsRouter