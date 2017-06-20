const typeDefs = [
`
  type Wallet {  
    title: String
    createDate: String
    updateDate: String
    USD: Float
    EUR: Float
    UAH: Float
    RUB: Float
    OTHER: Float
  }

  type Log {
    date: String
    comment: String
    type: String
    currency: String
    amount: Float
  }

  type User {
    token: String
    email: String
    name: String
    error: String
  }

  type Query {
    wallets: [ID]!
    logs(wallet: ID): [ID]!

    wallet(_id: ID!): Wallet!
    log(_id: ID!): Log!
  }
  type Mutation {
    addWallet(name: String!, USD: Float, EUR: Float, UAH: Float, RUB: Float, OTHER: Float): ID!
    addLog(currency: String!, amount: Float!, type: String!, comment: String, wallet: ID!, receiver: ID): ID!

    updateWallet(id: ID!, name: String): Wallet!
    updateLog(id: ID!, money: String, comment: String, wallet: ID): Log!
    
    deleteWallet(_id: ID!): ID!
    deleteLog(_id: ID!): ID!

    deleteUser(_id: ID!): ID!
    updateUser(_id: ID!, email: String, password: String, name: String): User!

    checkEmail(email: String): String!
    signUp(email: String!, password: String!, name: String!): User!
    signIn(email: String!, password: String!): User!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`]

module.exports = typeDefs
