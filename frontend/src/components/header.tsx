import { createComponent, Shade, styledShade } from '@furystack/shades'
import { AppBar, AppBarLink as ShadeAppBarLink, Button } from '@furystack/shades-common-components'
import { environmentOptions } from '../environment-options.js'
import { GithubLogo } from './github-logo/index.js'
import { ThemeSwitch } from './theme-switch/index.js'
import { ScrollService } from '../services/scroll-service.js'

const AppBarLink = styledShade(ShadeAppBarLink, {
  display: 'flex',
  gap: '8px',
})

export const Header = Shade({
  shadowDomName: 'shade-app-header',
  render: ({ useDisposable, injector, element }) => {
    useDisposable('scrollListener', () =>
      injector.getInstance(ScrollService).subscribe('onScroll', ({ top }) => {
        console.log('top', top)
        element.style.top = top ? '0' : '-64px'
      }),
    )

    element.style.position = 'absolute'
    element.style.transition = 'top 0.3s ease-in-out'

    return (
      <AppBar id="header">
        <AppBarLink title="JSON Tools" href="/">
          <i className="material-symbols-outlined">data_object</i> JSON Tools
        </AppBarLink>
        <AppBarLink href="/validate">
          <i className="material-symbols-outlined">check_circle</i>
          Validate
        </AppBarLink>
        <AppBarLink href="/compare">
          <i className="material-symbols-outlined">compare_arrows</i>
          Compare
        </AppBarLink>

        <div style={{ flex: '1' }} />
        <div style={{ display: 'flex', placeContent: 'center', marginRight: '24px' }}>
          <ThemeSwitch variant="outlined" />
          <a href={environmentOptions.repository} target="_blank">
            <Button variant="outlined" style={{ verticalAlign: 'baseline' }}>
              <GithubLogo style={{ height: '18px' }} />
            </Button>
          </a>
        </div>
      </AppBar>
    )
  },
})
