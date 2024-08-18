const NewsService = require('../../services/admin/NewsService')

const NewsController = {
  add: async (req, res) => {
    console.log(time);

    const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
    const { title, content, category, isPublish } = req.body
    await NewsService.add({
      title, content,
      category: Number(category), isPublish: Number(isPublish), cover,
      editTime: new Date()
    })
    res.send({
      ActionType: "OK"
    })
  }
}
module.exports = NewsController