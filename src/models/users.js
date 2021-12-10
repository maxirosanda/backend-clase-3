import mongoose from 'mongoose'

const usersCollection = 'users'

const usersSchema = new mongoose.Schema({

  email: { type: String, require: true },
  name:{type:String,require:true},
  password: { type: String, require: true }

})

export default mongoose.model(usersCollection, usersSchema)