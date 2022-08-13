import { BoilerplateApi } from 'common'
import '@furystack/security'
import { JsonResult, useHttpAuthentication, useRestService } from '@furystack/rest-service'
import { GetCurrentUser, IsAuthenticated, LoginAction, LogoutAction } from '@furystack/rest-service'
import { injector } from './config'
import { RegisterAction } from './actions/register-action'
import { disposeOnProcessExit } from '@furystack/core'
import { usePasswordPolicy } from '@furystack/security'

disposeOnProcessExit(injector)

useHttpAuthentication(injector)
usePasswordPolicy(injector)
useRestService<BoilerplateApi>({
  injector,
  root: 'api',
  port: parseInt(process.env.APP_SERVICE_PORT as string, 10) || 9090,
  cors: {
    credentials: true,
    origins: ['http://localhost:8080'],
    headers: ['cache', 'content-type'],
  },
  api: {
    GET: {
      '/currentUser': GetCurrentUser,
      '/isAuthenticated': IsAuthenticated,
    },
    POST: {
      '/login': LoginAction,
      '/logout': LogoutAction,
      '/register': RegisterAction,
      '/testPostBody': async (options) => {
        const body = await options.getBody()
        return JsonResult({ bodyValue: body.value })
      },
    },
  },
})
