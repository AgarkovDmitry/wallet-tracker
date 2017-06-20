const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Wallet = new Schema({
  title: { type: String, unique: true },
  createDate: Date,
  updateDate: Date,
  USD: Number,
  EUR: Number,
  UAH: Number,
  RUB: Number,
  OTHER: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Wallet', Wallet, 'Wallet')
