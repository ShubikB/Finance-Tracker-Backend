import express from "express"
import { authenticate } from "../authenticate.js"
import {
  getTransaction,
  deleteTransactions,
  createTransaction,
} from "../models/transaction/transactionModel.js"
const router = express.Router()

router.post("/", authenticate, async (req, res) => {
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
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

router.get("/", authenticate, async (req, res) => {
  try {
    const transactionData = await getTransaction({ userID: req.user._id })
    res.status(200).json({
      status: "success",
      message: "Data Recieved Succesfully",
      transactions: transactionData,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

router.delete("/:id", authenticate, async (req, res) => {
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
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

router.delete("/", authenticate, async (req, res) => {
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
    console.log(error)
    res.status(500).json({
      status: "Error",
      message: error.message,
    })
  }
})

export default router
