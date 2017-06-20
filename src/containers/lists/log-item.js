import { graphql, gql } from 'react-apollo'
import { compose, branch, renderComponent, mapProps } from 'recompose'

import LogItem from 'components/list-items/log-item'
import Loader from 'components/loader'

const query = gql`query log($item: ID!){
  log(_id: $item) {
    date
    comment
    type
    currency
    amount
  }
}`

export default compose(
  graphql(query),
  branch(
    ({ data }) => !data.log,
    renderComponent(Loader)
  ),
  mapProps(
    (props) => ({
      id: props.item,
      log: {
        ...props.data.log,
        date: (new Date(props.data.log.date).toLocaleString().slice(0, -3))
      }
    })
  )
)(LogItem)
