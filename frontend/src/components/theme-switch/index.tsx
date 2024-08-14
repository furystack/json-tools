import { createComponent, Shade } from '@furystack/shades'
import type { ButtonProps } from '@furystack/shades-common-components'
import { getCssVariable } from '@furystack/shades-common-components'
import { Button, defaultDarkTheme, defaultLightTheme, ThemeProviderService } from '@furystack/shades-common-components'

export const ThemeSwitch = Shade<Omit<ButtonProps, 'onclick'>>({
  shadowDomName: 'theme-switch',
  render: ({ props, injector, useStoredState }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)
    const [theme, setTheme] = useStoredState<'light' | 'dark'>(
      'theme',
      getCssVariable(themeProvider.theme.background.default) === defaultDarkTheme.background.default ? 'dark' : 'light',
    )

    return (
      <Button
        {...props}
        onclick={() => {
          themeProvider.setAssignedTheme(theme === 'dark' ? defaultLightTheme : defaultDarkTheme)
          setTheme(theme === 'dark' ? 'light' : 'dark')
        }}
      >
        {theme === 'dark' ? (
          <i style={{ fontSize: '1.27em' }} className="material-symbols-outlined">
            light_mode
          </i>
        ) : (
          <i style={{ fontSize: '1.27em' }} className="material-symbols-outlined">
            dark_mode
          </i>
        )}
      </Button>
    )
  },
})
