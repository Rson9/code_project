const ProductModel = require('../../models/ProductModel')
const ProductService = {
  add: async (data) => {
    return ProductModel.create(data)
  },
  getlist: async ({ _id }) => {
    return _id ? ProductModel.find({ _id }) : ProductModel.find({})
  },

  deleteproduct: async ({ _id }) => {

    return ProductModel.deleteOne({ _id })
  },

  updatelist: async ({ _id, cover, ...data }) => {
    if (cover) {
      data.cover = cover
      return ProductModel.updateOne({ _id }, data)
    }
    else {
      return ProductModel.updateOne({ _id }, data)
    }
  }
}

module.exports = ProductService