import { createComponent, Shade, Router } from '@furystack/shades'
import { User } from 'common'
import { SessionService, sessionState } from '../services/session'
import { Init, Offline, Login } from '../pages'
import { Register } from '../pages/register'
import { ComparePage } from '../pages/compare'
import { Home } from '../pages/home'
import { ValidatePage } from '../pages/validate'

export const Body = Shade<
  { style?: Partial<CSSStyleDeclaration> },
  { sessionState: sessionState; currentUser: User | null }
>({
  shadowDomName: 'shade-app-body',
  getInitialState: () => ({
    sessionState: 'initial' as sessionState,
    currentUser: null as User | null,
  }),
  constructed: async ({ injector, updateState }) => {
    const session = injector.getInstance(SessionService)
    const observables = [
      session.state.subscribe((newState) =>
        updateState({
          sessionState: newState,
        }),
      ),
      session.currentUser.subscribe((usr) => updateState({ currentUser: usr })),
    ]
    return () => observables.forEach((o) => o.dispose())
  },
  render: ({ getState }) => {
    const { sessionState: state } = getState()
    if (state === 'offline') {
      return <Offline />
    }

    if (state === 'initializing') {
      return <Init />
    }
    return (
      <div id="Body">
        <Router
          notFound={() => <Home />}
          routes={[
            { url: '/compare', component: () => <ComparePage /> },
            { url: '/validate', component: () => <ValidatePage /> },
            ...(state === 'authenticated' ? [] : []), // Authenticated routes
            ...(state === 'unauthenticated'
              ? [
                  { url: '/register', component: () => <Register /> },
                  { url: '/login', component: () => <Login /> },
                ]
              : []), // Unauthenticated routes
          ]}></Router>
      </div>
    )
  },
})
