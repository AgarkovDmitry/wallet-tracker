const { createToken, verifyToken } = require('./auth')

import User from './models/user'
import Wallet from './models/wallet'
import Log from './models/log'

const getUserFromToken = async(token) => {
  if (token) {
    const _id = await verifyToken(token).then(res => res.id)
    const user = await User.findOne({ _id })
    if (user) return { user }
    else return { error: 'Invalid token' }
  }
  else return { error: 'Token was not provided' }
}

const addExpense = async({ currency, amount, type, comment, wallet }, user) => {
  const walletObj = await Wallet.findOne({ _id: wallet })
  if (!walletObj) return { error: 'Wallet was not found' }

  if (walletObj[currency] < amount) return { error: 'Expenses can\'t be bigger than amount of money in your Waller' }

  await Wallet.update({ _id: wallet }, { $set: {
    [currency]: walletObj[currency] - amount
  } })

  return await Log.create({
    date: new Date(),
    type,
    comment,
    amount,
    currency,
    wallet,
    user
  })
}

const addIncome = async({ currency, amount, type, comment, wallet }, user) => {
  const walletObj = await Wallet.findOne({ _id: wallet })
  if (!walletObj) return { error: 'Wallet was not found' }

  await Wallet.update({ _id: wallet }, { $set: {
    [currency]: walletObj[currency] + amount
  } })

  return await Log.create({
    date: new Date(),
    type,
    comment,
    amount,
    currency,
    wallet,
    user
  })
}

const addTransfer = async({ currency, amount, type, comment, wallet, receiver }, user) => {
  const walletObj = await Wallet.findOne({ _id: wallet })
  if (!walletObj) return { error: 'Wallet was not found' }
  const receiverObj = await Wallet.findOne({ _id: receiver })
  if (!receiverObj) return { error: 'Wallet was not found' }

  if (walletObj[currency] < amount) return { error: 'Expenses can\'t be bigger than amount of money in your Waller' }

  await Wallet.update({ _id: wallet }, { $set: {
    [currency]: walletObj[currency] - amount
  } })

  await Wallet.update({ _id: receiver }, { $set: {
    [currency]: walletObj[currency] + amount
  } })

  await Log.create({
    date: new Date(),
    type: 'receive' + type,
    comment,
    currency,
    amount,
    receiver,
    user
  })

  return await Log.create({
    date: new Date(),
    type: 'send' + type,
    comment,
    currency,
    amount,
    wallet,
    user
  })
}

const resolvers = {
  Query: {
    async wallets(root, args, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      
      return (await Wallet.find({ user: user._id })).map(item => item._id)
    },
    async logs(root, { wallet }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      
      if (wallet) return (await Log.find({ wallet }).sort({ date: -1 })).map(item => item._id)
      else return (await Log.find({ user: user._id }).sort({ date: -1 })).map(item => item._id)
    },


    async wallet(root, { _id }, token){
      const { error } = await getUserFromToken(token)
      if (error) return { error }
      
      return await Wallet.findOne({ _id })
    },
    async log(root, { _id }, token){
      const { error } = await getUserFromToken(token)
      if (error) return { error }
      
      return await Log.findOne({ _id })
    },
  },
  Mutation: {
    async addWallet(root, { name, USD = 0, EUR = 0, UAH = 0, RUB = 0, OTHER = 0 }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      
      const wallet = await Wallet.create({
        title: name,
        USD,
        EUR,
        UAH,
        RUB,
        OTHER,
        createDate: new Date(),
        updateDate: new Date(),
        user: user._id
      })

      return wallet._id
    },
    async addLog(root, args, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      
      let log
      if (args.type == 'Expense') log = await addExpense(args, user._id)
      if (args.type == 'Income') log = await addIncome(args, user._id)
      if (args.type == 'Transfer') log = await addTransfer(args, user._id)

      return log._id
    },
    
    async deleteWallet(root, { _id }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      if (user) {
        await Wallet.remove({ _id })
        return _id
      }
      else throw new Error('Invalid token')
    },
    async deleteLog(root, { _id }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      if (user) {
        await Log.remove({ _id })
        return _id
      }
      else throw new Error('Invalid token')
    },

    async deleteUser(root, { _id }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      if (user) {
        await User.remove({ _id })
        return _id
      }
      else throw new Error('Invalid token')
    },
    async updateUser(root, { _id, email, password, name }, token){
      const { user, error } = await getUserFromToken(token)
      if (error) return { error }
      if (user) {
        await User.update({ _id }, { $set: {
          email: email || user.email,
          password: password || user.password,
          name: name || user.name
        } })
        return _id
      }
      else throw new Error('Invalid token')
    },

    async checkEmail(root, { email }){
      const user = await User.findOne({ email })
      if (user) return 'Selected email is taken'
      else return 'You can use this email'
    },
    async signUp(root, args){
      const user = await User.findOne({ email: args.email })
      if (user) return { 'error': 'Selected email is taken' }
      const nUser = await User.create({ ...args })
      return {
        token: await createToken({ id: nUser._id }),
        email: nUser.email,
        name: nUser.name
      }
    },
    async signIn(root, args){
      const user = await User.findOne({ email: args.email, password: args.password })
      if (user) return {
        token: await createToken({ id: user._id }),
        email: user.email,
        name: user.name
      }
      else return { error: 'Authentication failed. User not found.' }
    }
  }
}

module.exports = resolvers
