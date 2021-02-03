import { createComponent, Shade } from '@furystack/shades'
import { Injector } from '@furystack/inject'
import { defaultLightTheme, ThemeProviderService } from '@furystack/shades-common-components'
import { Body } from './body'
import { Header } from './header'

const lightBackground = 'linear-gradient(to right bottom, #ebebf8, #e3e3f6, #dcdcf4, #d4d4f2, #cdcdf0)'
const darkBackground = 'linear-gradient(to right bottom, #2b3036, #292c31, #27282d, #242428, #212023)'

const getStyles = (injector: Injector): Partial<CSSStyleDeclaration> => {
  const themeProvider = injector.getInstance(ThemeProviderService)
  const isLight = themeProvider.theme.getValue() === defaultLightTheme
  const backgroundImage = isLight ? lightBackground : darkBackground
  const color = themeProvider.getTextColor(themeProvider.theme.getValue().background.paper)
  return {
    backgroundImage,
    color,
  }
}

export const Layout = Shade({
  shadowDomName: 'shade-app-layout',
  constructed: ({ injector, element }) => {
    const themeChange = injector.getInstance(ThemeProviderService).theme.subscribe(() => {
      const styles = getStyles(injector)
      Object.assign((element.querySelector('div') as HTMLDivElement).style, styles)
    }, true)
    return () => themeChange.dispose()
  },
  render: ({ injector }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)
    return (
      <div
        id="Layout"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: themeProvider.theme.getValue().background.default, //'#1e1e1e',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Arial, Helvetica, sans-serif',
          lineHeight: '1.6',
          overflow: 'hidden',
        }}
        className="eee">
        <Header />
        <Body style={{ width: '100%', height: '100%', overflow: 'auto' }} />
      </div>
    )
  },
})
