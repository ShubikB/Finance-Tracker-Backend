import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectMongodb from "./src/config/mongodbConfig.js"
import userRouter from "./src/routers/userRouter.js"
import logger from "./src/middleware/logger.js"
import transactionRouter from "./src/routers/transactionRouter.js"
import errorHandler from "./src/middleware/errorHandler.js"

dotenv.config()
connectMongodb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(logger)

app.get("/", (req, res) => {
  res.json({
    message: "Server Is Live",
  })
})

app.use("/api/v1/users", userRouter)

app.use("/api/v1/transaction", transactionRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server Started AT PORT https://localhost:${PORT} `)
})
