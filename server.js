import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import connectMongodb from "./mongodbConfig.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5050

connectMongodb()

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model("user", userSchema)

app.use(express.json())
app.use(cors())

// Server Live Message
app.get("/", (req, res) => {
  res.json({
    message: "Server Is Live",
  })
})



//------------------------------------ Create new User


app.post("/api/v1/users/signup", async (req, res) => {
  try {
    const { username, email } = req.body
    let { password } = req.body
    const saltround = 10
    password = await bcrypt.hash(password, saltround)

    const newUser = new User({
      username,
      email,
      password,
    })

    const data = await newUser.save()
    res.status(201).json({
      status: "user created Succesfully",
    })
  } catch (error) {
    res.status(100).json({
      status: "100",
      message: "Credentials unmatched",
    })
  }
})



// -------------------------------Login and Verification


app.post("/api/v1/users/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const userData = await User.findOne({ email })

    if (userData) {
      console.log(userData)
      const isLoginSuccess = await bcrypt.compare(password, userData.password)

      if (isLoginSuccess) {
        res.status(200).json({
          status: "success",
          message: "login Successful",
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



app.listen(PORT, () => {
  console.log(`Server Started AT PORT https://localhost:${PORT} `)
})
