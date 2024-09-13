var express = require('express')
const newsRouter = express.Router()
const NewsController = require('../../controllers/web/NewsController')

newsRouter.get('/webapi/news/list', NewsController.getList)
newsRouter.get('/webapi/news/list/:id', NewsController.getList)
newsRouter.get('/webapi/news/toplist', NewsController.getToplist)

module.exports = newsRouter