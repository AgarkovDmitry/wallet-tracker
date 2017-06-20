import { connect } from 'react-redux'
import { graphql, gql } from 'react-apollo'
import { compose, branch, renderComponent, withState, withHandlers, mapProps } from 'recompose'

import List from 'components/list'
import Loader from 'components/loader'
import ZeroEvents from 'components/exceptions/zero-events'
import LogItem from './log-item'

const maxCount = 10

const query = gql`query logs ($wallet: ID){
  logs(wallet: $wallet)
}`

export default compose(
  connect(state => ({ ...state.account })),
  graphql(query),
  branch(
    ({ data }) => !data.logs,
    renderComponent(Loader)
  ),
  branch(
    ({ data }) => data.logs && data.logs.length == 0,
    renderComponent(ZeroEvents)
  ),
  withState('index', 'select', 0),
  withHandlers({
    setIndex: ({ select }) => (index) => select(index)
  }),
  mapProps(
    (props) => ({
      index: (props.data.logs.length > maxCount) ? props.index : undefined,
      setIndex: props.setIndex,
      pages: Math.ceil(props.data.logs.length / maxCount),
      items: (props.data.logs.length - props.index * maxCount > maxCount)
            ? props.data.logs.slice(props.index * maxCount, maxCount)
            : props.data.logs.slice(props.index * maxCount),
      ItemComponent: LogItem,
      listClassName: 'log-list'
    })
  )
)(List)
