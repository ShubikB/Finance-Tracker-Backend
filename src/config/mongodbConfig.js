import mongoose from "mongoose"

const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connection Successful")
  } catch (error) {
    console.log("Database Connection Failed")
  }
}

export default connectMongodb
