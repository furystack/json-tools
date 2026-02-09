import { createComponent, NestedRouteLink, Shade } from '@furystack/shades'
import { Button, Card, CardActions, CardContent, CardHeader, PageContainer } from '@furystack/shades-common-components'

export const Home = Shade({
  shadowDomName: 'shade-home',
  css: {
    '& .hero': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '48px 24px 24px',
      gap: '12px',
    },
    '& .hero-icon': {
      fontSize: '64px',
    },
    '& .hero-title': {
      fontSize: '2.5rem',
      fontWeight: '700',
      margin: '0',
    },
    '& .hero-subtitle': {
      fontSize: '1.1rem',
      opacity: '0.7',
      margin: '0',
      maxWidth: '480px',
    },
    '& .features': {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      width: '100%',
    },
    '& .card-icon': {
      fontSize: '32px',
      marginRight: '12px',
    },
  },
  render: () => {
    return (
      <PageContainer maxWidth="800px" centered padding="24px" gap="32px">
        <div className="hero">
          <i className="material-symbols-outlined hero-icon">data_object</i>
          <h1 className="hero-title">JSON Tools</h1>
          <p className="hero-subtitle">
            A collection of browser-based utilities for working with JSON data — compare, validate, and more.
          </p>
        </div>

        <div className="features">
          <Card variant="outlined">
            <CardHeader
              title="Compare"
              subheader="Side-by-side JSON diff"
              avatar={<i className="material-symbols-outlined card-icon">compare_arrows</i>}
            />
            <CardContent>
              <p style={{ margin: '0' }}>
                Show differences in a two-pane view to compare JSON data with a possibility to order the object fields
                from the context menu.
              </p>
            </CardContent>
            <CardActions>
              <NestedRouteLink href="/compare">
                <Button variant="outlined">Open Compare</Button>
              </NestedRouteLink>
            </CardActions>
          </Card>

          <Card variant="outlined">
            <CardHeader
              title="Validate"
              subheader="JSON Schema validation"
              avatar={<i className="material-symbols-outlined card-icon">check_circle</i>}
            />
            <CardContent>
              <p style={{ margin: '0' }}>
                Validate JSON data against a specified JSON Schema with a "$schema" field and URL — get instant feedback
                on structural issues.
              </p>
            </CardContent>
            <CardActions>
              <NestedRouteLink href="/validate">
                <Button variant="outlined">Open Validate</Button>
              </NestedRouteLink>
            </CardActions>
          </Card>
        </div>
      </PageContainer>
    )
  },
})
