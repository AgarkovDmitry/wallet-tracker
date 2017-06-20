import { graphql, gql } from 'react-apollo'
import { compose, branch, renderComponent, mapProps } from 'recompose'

import List from 'components/list'
import Loader from 'components/loader'
import ZeroWallets from 'components/exceptions/zero-wallets'
import WalletItem from './wallet-item'

const query = gql`query wallets{
  wallets
}`

export default compose(
  graphql(query),
  branch(
    ({ data }) => !data.wallets,
    renderComponent(Loader)
  ),
  branch(
    ({ data }) => data.wallets && data.wallets.length == 0,
    renderComponent(ZeroWallets)
  ),
  mapProps(
    (props) => ({
      items: props.data.wallets,
      ItemComponent: WalletItem,
      listClassName: 'wallet-list'
    })
  )
)(List)