import userModel from "./userSchema.js"

export const createUser = (userObj) => {
  return userModel(userObj).save()
}

export const getUserByEmail = (email) => {
  return userModel.findOne({ email })
}
