const initState = {
  token: undefined,
  username: undefined
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case 'AUTH_SIGNIN':
      localStorage.setItem('user', JSON.stringify({ ...payload, expiresIn: (new Date()).getTime() + 86400000 }))
      return { ...payload, expiresIn: undefined }
    case 'AUTH_SIGNOUT':
      localStorage.removeItem('user')
      return initState
    default:
      return state
  }
}
