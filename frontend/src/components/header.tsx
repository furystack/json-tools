import { createComponent, Shade, styledShade, type ChildrenList } from '@furystack/shades'
import {
  AppBar,
  Button,
  AppBarLink as ShadeAppBarLink,
  type AppBarLinkProps,
} from '@furystack/shades-common-components'
import { environmentOptions } from '../environment-options.js'
import { GithubLogo } from './github-logo/index.js'
import { ThemeSwitch } from './theme-switch/index.js'

const AppBarLink = styledShade(
  ShadeAppBarLink as unknown as (props: Omit<AppBarLinkProps, 'children'>, children?: ChildrenList) => JSX.Element,
  {
    display: 'flex',
    gap: '8px',
  },
)

export const Header = Shade({
  customElementName: 'shade-app-header',
  render: () => {
    return (
      <AppBar id="header">
        <AppBarLink title="JSON Tools" path="/">
          <i className="material-symbols-outlined">data_object</i> JSON Tools
        </AppBarLink>
        <AppBarLink path="/validate">
          <i className="material-symbols-outlined">check_circle</i>
          Validate
        </AppBarLink>
        <AppBarLink path="/compare">
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
