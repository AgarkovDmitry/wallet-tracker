import { render } from 'react-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import { onSnapshot } from 'mobx-state-tree'

import createStore from 'store'
import mobStore from 'mobx-form'
import { signIn } from 'store/actions'

import createApp from 'components/app'
const history = createBrowserHistory()

const networkInterface = createNetworkInterface({ uri: `${window.location.origin}/graphql` })

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options) req.options = { header: {} }
    if (!req.options.headers) req.options.headers = {}

    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      if (user.expiresIn < (new Date()).getTime()) localStorage.removeItem('user')
      else req.options.headers.token = user.token
    }

    next()
  }
}])

const client = new ApolloClient({ networkInterface })
const store = window.store = createStore(client)
window.mobStore = mobStore

onSnapshot(mobStore, (snapshot) => {
    console.dir(snapshot)
})

const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  if (user.expiresIn < (new Date()).getTime()) localStorage.removeItem('user')
  else store.dispatch(signIn(user))
}

render(createApp({ history, client, store }), document.getElementById('Main'))
