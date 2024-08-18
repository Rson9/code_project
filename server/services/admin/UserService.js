var UserModel = require("../../models/UserModel")

const UserService = {
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password
    })
  },
  upload: async ({ _id, username, introduction, gender, avatar }) => {
    if (avatar) {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender, avatar
      })
    } else {
      return UserModel.updateOne({
        _id
      }, {
        username, introduction, gender
      })


    }
  },
  useradd: async ({ username, introduction, gender, avatar, role, password }) => {
    return UserModel.create({
      username, introduction, gender, avatar, role, password
    })
  },

  getUserList: async ({ id }) => {
    return id ? UserModel.find({ _id: id }, ['username', 'password', 'role', 'introduction']) : UserModel.find({}, { "password": 0 })
  },

  putlist: async (body) => {
    return UserModel.updateOne({ _id: body._id }, body)
  },

  userdelete: async ({ _id }) => {
    return UserModel.deleteOne({ _id })
  }

}
module.exports = UserService
