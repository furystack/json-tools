import { createComponent, Shade, Router } from '@furystack/shades'
import { ComparePage } from '../pages/compare.js'
import { ValidatePage } from '../pages/validate.js'
import { Home } from '../pages/home.js'
import { NotyList } from '@furystack/shades-common-components'

export const Body = Shade<{ style?: Partial<CSSStyleDeclaration> }>({
  shadowDomName: 'shade-app-body',
  render: () => {
    return (
      <div id="Body">
        <Router
          routes={[
            { url: '/compare', routingOptions: { end: false }, component: () => <ComparePage /> },
            { url: '/validate', routingOptions: { end: false }, component: () => <ValidatePage /> },
            { url: '/', routingOptions: { end: false }, component: () => <Home /> },
          ]}
        />
        <NotyList style={{ marginBottom: '2em' }} />
      </div>
    )
  },
})
