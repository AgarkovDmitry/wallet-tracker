import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import { compose, branch, renderComponent, mapProps } from 'recompose'
import * as actions from 'store/actions'

import WalletItem from 'components/list-items/wallet-item'
import Loader from 'components/loader'

const query = gql`query wallet ($item: ID!){
  wallet(_id: $item) {
    title,
    createDate,
    updateDate,
    USD,
    EUR,
    UAH,
    RUB,
    OTHER
  }
}`

export default compose(
  connect(state => ({ ...state.account }), actions),
  graphql(query),
  branch(
    ({ data }) => !data.wallet,
    renderComponent(Loader)
  ),
  mapProps(
    (props) => {
      let money = ''
      if (props.data.wallet.USD != 0) money = `${money}${props.data.wallet.USD} USD, `
      if (props.data.wallet.EUR != 0) money = `${money}${props.data.wallet.EUR} EUR, `
      if (props.data.wallet.UAH != 0) money = `${money}${props.data.wallet.UAH} UAH, `
      if (props.data.wallet.RUB != 0) money = `${money}${props.data.wallet.RUB} RUB, `
      if (props.data.wallet.OTHER != 0) money = `${money}${props.data.wallet.OTHER} other, `
      money = money.slice(0, -2)

      return ({
        money,
        id: props.item,
        wallet: {
          ...props.data.wallet,
          createDate: (new Date(props.data.wallet.createDate).toLocaleString().slice(0, -3))
        },
        select: () => props.selectWallet(props.item),
        itemClass: `wallet-item${props.wallet == props.item ? '-selected': ''}`
      })
    }
  )
)(WalletItem)
