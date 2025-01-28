import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectMongodb from "./mongodbConfig.js"
import userRouter from "./routers/userRouter.js"
import transactionRouter from "./routers/transactionRouter.js"

dotenv.config()
connectMongodb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json({
    message: "Server Is Live",
  })
})

app.use("/api/v1/users", userRouter)

app.use("/api/v1/transaction", transactionRouter)

app.listen(PORT, () => {
  console.log(`Server Started AT PORT https://localhost:${PORT} `)
})
