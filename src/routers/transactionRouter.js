import express from "express"
import { authenticate } from "../middleware/authenticate.js"
import errorHandler from "../middleware/errorHandler.js"
import {
  getTransaction,
  deleteTransactions,
  createTransaction,
} from "../models/transaction/transactionModel.js"
const router = express.Router()

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { type, amount, description, date } = req.body

    const newTransaction = await createTransaction({
      userID: req.user._id,
      type,
      amount,
      description,
      date,
    })

    res.status(200).json({
      status: "Success",
      message: "Transaction Added Succesfully",
      transactionDetails: newTransaction,
    })
  } catch (error) {
    next(error)
  }
})

router.get("/", authenticate, async (req, res, next) => {
  try {
    const transactionData = await getTransaction({ userID: req.user._id })
    res.status(200).json({
      status: "success",
      message: "Data Recieved Succesfully",
      transactions: transactionData,
    })
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const transactionId = req.params.id

    console.log(10000, transactionId)
    console.log(transactionId)
    const transaction = await deleteTransactions({
      _id: transactionId,
      userID: req.user._id,
    })

    if (transaction) {
      res.status(200).json({
        status: "success",
        message: transaction,
      })
    } else {
      res.status(404).json({
        status: "Error",
        message: "Transaction not found",
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete("/", authenticate, async (req, res, next) => {
  try {
    const { transactions } = req.body
    const result = await deleteTransactions({
      _id: { $in: transactions },
      userID: req.user._id,
    })

    if (result) {
      res.status(200).json({
        status: "success",
        message: result,
      })
    } else {
      res.status(404).json({
        status: "Error",
        message: "Transactions not found",
      })
    }
  } catch (error) {
    next(error)
  }
})

router.use(errorHandler)

export default router
