import { createComponent, RouteLink, Shade } from '@furystack/shades'
import { Button, ThemeProviderService } from '@furystack/shades-common-components'

export const Home = Shade({
  shadowDomName: 'shade-home',
  render: ({ injector }) => {
    const style = injector.getInstance(ThemeProviderService).theme.getValue()
    return (
      <div
        style={{
          padding: '4em',
          color: style.text.primary,
        }}>
        <h1>JSON Tools</h1>
        <h2>Compare</h2>
        <p>
          Show diff in a two-pane view to compare JSON data with a possibility to order the object fields from the
          context menu.
          <RouteLink href="/compare">
            <Button variant="outlined">Go</Button>
          </RouteLink>
        </p>

        <h2>Validate</h2>
        <p>
          Validate JSON data against a specified JSON Schema with a "$schema" field
          <RouteLink href="/validate">
            <Button disabled variant="outlined">
              Go
            </Button>
          </RouteLink>
        </p>
      </div>
    )
  },
})
