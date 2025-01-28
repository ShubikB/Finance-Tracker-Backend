import transactionModel from "./transactionSchema.js"
export const createTransaction = (transactionObj) => {
  return transactionModel(transactionObj).save()
}

export const getTransaction = (filter) => {
  return transactionModel.find(filter)
}

export const deleteTransactions = (filter) => {
  return transactionModel.deleteMany(filter)
}
