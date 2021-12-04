import mongoose from 'mongoose'

export const conectarDB = async () => {
  try {

    await mongoose.connect("mongodb://localhost:27017/resumenBaseMongo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log(`database connected`)
  } catch (e) {
    console.log(`error ${e}`)
    process.exit(1)
  }
}
