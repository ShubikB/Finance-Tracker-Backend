import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getUserByEmail, createUser } from "../models/user/userModel.js"
const router = express.Router()

router.post("/signup", async (req, res) => {
  try {
    const { username, email } = req.body
    let { password } = req.body
    const saltround = 10
    password = await bcrypt.hash(password, saltround)

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
    res.status(400).json({
      status: "Credentials unmatched",
      message: error.message,
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const userData = await getUserByEmail(email)

    if (userData) {
      console.log(userData)
      const isLoginSuccess = await bcrypt.compare(password, userData.password)

      const tokendata = {
        email: userData.email,
      }

      const token = await jwt.sign(tokendata, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
      })

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
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    })
  }
})

export default router
