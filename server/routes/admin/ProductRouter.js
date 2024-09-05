var express = require('express')
const ProductController = require('../../controllers/admin/ProductController')
var ProductRouter = express.Router()

//图片上传
const multer = require('multer')
const upload = multer({
  dest: 'public/coveruploads/'
})

ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add)
ProductRouter.get('/adminapi/product/list', ProductController.getlist)
ProductRouter.get('/adminapi/product/list/:id', ProductController.getlist)
ProductRouter.post('/adminapi/product/list', upload.single('file'), ProductController.updatelist)
ProductRouter.delete('/adminapi/product/list/:id', ProductController.deleteproduct)

module.exports = ProductRouter