import { graphql, gql } from 'react-apollo'
import { compose, mapProps } from 'recompose'

const mutation = gql`mutation delete($id: ID!){
  deleteWallet(id: $id)
}`

export default compose(
  graphql(mutation),
  mapProps(
    ({ mutate, id, children }) => ({
      onClick: e => {
        e.stopPropagation()
        mutate({
          variables: { id },
          updateQueries: {
            wallets: prev => ({
              ...prev,
              wallets: prev.wallets.filter(item => item != id)
            })
          }
        })
      },
      className: 'delete-wallet-button',
      children
    })
  )
)('button')
