export const signIn = payload => ({ type: 'AUTH_SIGNIN', payload })

export const signOut = () => ({ type: 'AUTH_SIGNOUT' })

export const selectWallet = payload => ({ type: 'SELECT_WALLET', payload })