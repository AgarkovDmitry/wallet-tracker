const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email: { type: String, unique: true },
  name: String,
  password: String
})

export default mongoose.model('User', User, 'User')