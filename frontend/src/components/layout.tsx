import { createComponent, Shade } from '@furystack/shades'
import { PageLayout, NotyList } from '@furystack/shades-common-components'
import { Body } from './body.js'
import { Header } from './header.js'

export const Layout = Shade({
  shadowDomName: 'shade-app-layout',
  render: () => {
    return (
      <PageLayout
        appBar={{
          variant: 'auto-hide',
          component: <Header />,
        }}
      >
        <Body />
        <NotyList style={{ marginBottom: '2em' }} />
      </PageLayout>
    )
  },
})
