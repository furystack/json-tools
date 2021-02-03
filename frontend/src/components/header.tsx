import { createComponent, RouteLink, Shade } from '@furystack/shades'
import {
  AppBar,
  Button,
  defaultDarkTheme,
  defaultLightTheme,
  ThemeProviderService,
} from '@furystack/shades-common-components'
import { SessionService, sessionState } from '../services/session'

export const Header = Shade<{}, { sessionState: sessionState }>({
  shadowDomName: 'shade-app-header',
  getInitialState: ({ injector }) => ({
    sessionState: injector.getInstance(SessionService).state.getValue(),
  }),
  constructed: ({ injector, updateState }) => {
    const observable = injector.getInstance(SessionService).state.subscribe((newState) => {
      updateState({ sessionState: newState })
    })
    return () => observable.dispose()
  },
  render: ({ injector, getState }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)
    return (
      <AppBar id="header">
        <h3 style={{ margin: '0 2em 0 0', cursor: 'pointer' }}>
          <RouteLink title={'FuryStack JSON Tools'} href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            FuryStack JSON Tools
          </RouteLink>
        </h3>

        <div style={{ flex: '1' }} />
        {getState().sessionState === 'authenticated' ? (
          <Button
            variant="outlined"
            onclick={() => injector.getInstance(SessionService).logout()}
            style={{ marginRight: '1em' }}>
            Log Out
          </Button>
        ) : null}
        <Button
          onclick={() => {
            const currentTheme = themeProvider.theme.getValue()
            themeProvider.theme.setValue(currentTheme === defaultDarkTheme ? defaultLightTheme : defaultDarkTheme)
          }}>
          Theme
        </Button>
      </AppBar>
    )
  },
})
