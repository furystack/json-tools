import { createComponent, RouteLink, Shade } from '@furystack/shades'
import { Button, Paper } from '@furystack/shades-common-components'

export const Home = Shade({
  shadowDomName: 'shade-home',
  render: () => {
    return (
      <Paper
        style={{
          paddingTop: '4em',
        }}
      >
        <h3>Compare</h3>
        <p>
          Show diff in a two-pane view to compare JSON data with a possibility to order the object fields from the
          context menu.
          <RouteLink href="/compare">
            <Button>Go {`>>`} </Button>
          </RouteLink>
        </p>

        <h3>Validate</h3>
        <p>
          Validate JSON data against a specified JSON Schema with a "$schema" field and URL
          <RouteLink href="/validate">
            <Button>Go {`>>`}</Button>
          </RouteLink>
        </p>
      </Paper>
    )
  },
})
