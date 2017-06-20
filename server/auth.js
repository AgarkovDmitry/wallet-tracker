const jwt = require('jsonwebtoken')

const secret = 'shhhhh'
const expiresIn = 86400

exports.createToken = payload => (
  jwt.sign(payload, secret, { expiresIn: expiresIn })
)

exports.verifyToken = (token) => new Promise((res, rej) => {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) rej(err)
    res(decoded)
  })
})
