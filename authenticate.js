import jwt from "jsonwebtoken"
import { getUserByEmail } from "./models/user/userModel.js"

export const authenticate = async (req, res, next) => {
  try {
    // get token
    const token = req.headers.authorization
    // VERIFY TOKEN
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET)

    if (decodedData?.email) {
      // find the user
      const userData = await getUserByEmail(decodedData.email)

      if (userData) {
        req.user = userData
        next()
      } else {
        const errorObj = {
          status: "Error",
          message: "Authentication Failed",
        }
        return res.status(401).send(errorObj)
      }
    } else {
      res.status(401).json({
        status: "error",
        message: "Invalid Token",
      })
    }
  } catch (error) {
    res.status(404).json({
      status: "Error",
      message: "Verification Failed",
    })
  }
}
