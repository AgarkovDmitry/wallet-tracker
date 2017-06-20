const initState = {
  wallet: undefined
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case 'SELECT_WALLET':
      return { wallet: state.wallet == payload ? undefined : payload }
    default:
      return state
  }
}
