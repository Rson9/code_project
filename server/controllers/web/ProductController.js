const ProductService = require('../../services/web/ProductsService')

const ProductController = {
  getlist: async (req, res) => {
    const result = await ProductService.getlist({ _id: req.params.id })
    res.send({
      ActionType: "OK",
      data: result
    })
  }
}

module.exports = ProductController