const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Log = new Schema({
  date: Date,
  type: String,
  comment: String,
  currency: String,
  amount: Number,
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Log', Log, 'Log')
