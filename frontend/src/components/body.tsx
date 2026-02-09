import { createComponent, Shade, NestedRouter } from '@furystack/shades'
import { ComparePage } from '../pages/compare.js'
import { ValidatePage } from '../pages/validate.js'
import { Home } from '../pages/home.js'

export const Body = Shade({
  shadowDomName: 'shade-app-body',
  render: () => {
    return (
      <NestedRouter
        routes={{
          '/compare': { component: () => <ComparePage /> },
          '/validate': { component: () => <ValidatePage /> },
          '/': { component: () => <Home />, routingOptions: { end: false } },
        }}
      />
    )
  },
})
