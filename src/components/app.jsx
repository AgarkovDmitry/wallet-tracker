import React from 'react'
import { Router, Route, Switch } from 'react-router'
import { ApolloProvider } from 'react-apollo'

import 'assets/styles/style.less'
import 'assets/styles/header.less'

import loadHome from 'bundle-loader?lazy&name=home!containers/pages/home-page'
import loadAccount from 'bundle-loader?lazy&name=account!containers/pages/account-page'
import Header from 'containers/header'
import Bundle from 'components/bundle'

const Home = () => <Bundle load={loadHome}>{Comp => Comp && <Comp/>}</Bundle>
const Account = () => <Bundle load={loadAccount}>{Comp => Comp && <Comp/>}</Bundle>

export default ({ history, client, store }) => {
  return (
    <ApolloProvider client={client} store={store}>
      <Router history={history}>
        <div>
          <Header/>
          <div className='page'>
            <div className='page-wrapper'>
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/account' component={Account}/>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  )
}
