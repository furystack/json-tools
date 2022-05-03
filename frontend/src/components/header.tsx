import { createComponent, LocationService, Shade } from '@furystack/shades'
import {
  AppBar,
  Button,
  defaultDarkTheme,
  defaultLightTheme,
  Theme,
  ThemeProviderService,
} from '@furystack/shades-common-components'
import { SessionService, sessionState } from '../services/session'

export const Header = Shade<{}, { sessionState: sessionState; theme: Theme }>({
  shadowDomName: 'shade-app-header',
  getInitialState: ({ injector }) => ({
    sessionState: injector.getInstance(SessionService).state.getValue(),
    theme: injector.getInstance(ThemeProviderService).theme.getValue(),
  }),
  resources: ({ injector, updateState }) => {
    return [
      injector.getInstance(SessionService).state.subscribe((newState) => {
        updateState({ sessionState: newState })
      }),
      injector.getInstance(ThemeProviderService).theme.subscribe((theme) => updateState({ theme })),
    ]
  },
  render: ({ injector, getState }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)
    const loc = injector.getInstance(LocationService)
    const { sessionState, theme } = getState()
    return (
      <AppBar id="header">
        <h3 style={{ margin: '0 2em 0 0', cursor: 'pointer' }}>
          <Button
            onclick={() => {
              history.pushState(null, '', '/')
              loc.updateState()
            }}>
            FuryStack JSON Tools
          </Button>
        </h3>

        <div style={{ flex: '1' }} />
        {sessionState === 'authenticated' ? (
          <Button
            variant="outlined"
            onclick={() => injector.getInstance(SessionService).logout()}
            style={{ marginRight: '1em' }}>
            Log Out
          </Button>
        ) : null}
        <Button
          style={{ marginRight: '1em' }}
          variant="outlined"
          title="Change theme"
          onclick={() => {
            themeProvider.theme.setValue(theme === defaultDarkTheme ? defaultLightTheme : defaultDarkTheme)
          }}>
          {theme === defaultDarkTheme ? '☀️' : '🌜'}
        </Button>
      </AppBar>
    )
  },
})
