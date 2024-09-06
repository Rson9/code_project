const ProductService = require('../../services/admin/ProductService')

const ProductController = {
  add: async (req, res) => {
    const { title, introduction, detail } = req.body
    const cover = req.file ? `/coveruploads/${req.file.filename}` : ""
    await ProductService.add({
      title,
      introduction,
      detail,
      cover,
      editTime: new Date()
    })
    res.send({
      ActionType: "OK"
    }
    )
  },
  getlist: async (req, res) => {
    const result = await ProductService.getlist({ _id: req.params.id })
    res.send({
      ActionType: "OK",
      data: result
    })
  },
  deleteproduct: async (req, res) => {
    await ProductService.deleteproduct({ _id: req.params.id })
    res.send({
      ActionType: "OK"
    })

  },
  updatelist: async (req, res) => {
    const cover = req.file ? `/coveruploads/${req.file.filename}` : ""
    const { title, introduction, detail, _id } = req.body
    await ProductService.updatelist({
      _id,
      title,
      introduction,
      detail,
      cover,
      editTime: new Date()
    })
    res.send({
      ActionType: "OK"
    })
  }
}
module.exports = ProductController