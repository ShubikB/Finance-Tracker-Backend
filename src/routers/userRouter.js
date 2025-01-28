import express from "express"
import { getUserByEmail, createUser } from "../models/user/userModel.js"
import { encryptText, compareEncryptText } from "../utils/bcrypt.js"
import { JWTsign } from "../utils/jwt.js"
import errorHandler from "../middleware/errorHandler.js"
const router = express.Router()

router.post("/signup", async (req, res, next) => {
  try {
    const { username, email } = req.body
    let { password } = req.body
    const saltround = 10
    password = await encryptText(password)

    await createUser({
      username,
      email,
      password,
    })

    res.status(200).json({
      status: "Success",
      message: "user created Succesfully",
    })
  } catch (error) {
    next(error)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body
    const userData = await getUserByEmail(email)

    if (userData) {
      console.log(userData)
      const isLoginSuccess = await compareEncryptText(password, userData.password)

      const tokenData = {
        email: userData.email,
      }

      const token = await JWTsign(tokenData)

      if (isLoginSuccess) {
        res.status(200).json({
          status: "success",
          message: "login Successful",
          accessToken: token,
        })
      } else {
        res.status(403).json({
          status: "Error",
          message: "unmatched Credentials",
        })
      }
    } else {
      res.status(404).json({
        status: "Error",
        message: "User not Found",
      })
    }
  } catch (error) {
    next(error)
  }
})

router.use(errorHandler)

export default router
