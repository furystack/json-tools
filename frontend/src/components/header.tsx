import { createComponent, Shade } from '@furystack/shades'
import { AppBar, AppBarLink, Button } from '@furystack/shades-common-components'
import { environmentOptions } from '../environment-options.js'
import { GithubLogo } from './github-logo/index.js'
import { ThemeSwitch } from './theme-switch/index.js'

export const Header = Shade({
  shadowDomName: 'shade-app-header',
  render: () => {
    return (
      <AppBar id="header">
        <AppBarLink title="JSON Tools" href="/">
          {`{ `} JSON Tools {` }`}
        </AppBarLink>
        <AppBarLink href="/validate"> ✅ Validate</AppBarLink>
        <AppBarLink href="/compare"> 🔎 Compare</AppBarLink>

        <div style={{ flex: '1' }} />
        <div style={{ display: 'flex', placeContent: 'center', marginRight: '24px' }}>
          <ThemeSwitch variant="outlined" />
          <a href={environmentOptions.repository} target="_blank">
            <Button variant="outlined" style={{ verticalAlign: 'baseline' }}>
              <GithubLogo style={{ height: '25px' }} />
            </Button>
          </a>
        </div>
      </AppBar>
    )
  },
})
