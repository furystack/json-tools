import { createComponent, Router, Shade } from '@furystack/shades'
import { NotyList } from '@furystack/shades-common-components'
import { ComparePage } from '../pages/compare.js'
import { Home } from '../pages/home.js'
import { I18NPage } from '../pages/i18n-next/index.js'
import { ValidatePage } from '../pages/validate.js'

export const Body = Shade<{ style?: Partial<CSSStyleDeclaration> }>({
  shadowDomName: 'shade-app-body',
  render: () => {
    return (
      <div id="Body">
        <Router
          routes={[
            { url: '/compare', routingOptions: { end: false }, component: () => <ComparePage /> },
            { url: '/validate', routingOptions: { end: false }, component: () => <ValidatePage /> },
            { url: '/i18n', routingOptions: { end: false }, component: () => <I18NPage /> },
            { url: '/', routingOptions: { end: false }, component: () => <Home /> },
          ]}
        />
        <NotyList style={{ marginBottom: '2em' }} />
      </div>
    )
  },
})
