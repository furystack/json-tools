import { RestApi } from '@furystack/rest'
import { User } from '@furystack/core'

export interface BoilerplateApi extends RestApi {
  GET: {
    '/isAuthenticated': { result: { isAuthenticated: boolean } }
    '/currentUser': { result: User }
  }
  POST: {
    '/login': { result: User; body: { username: string; password: string } }
    '/logout': { result: unknown }
    '/testPostBody': { body: { value: string }; result: { bodyValue: string } }
    '/register': { result: User; body: { username: string; password: string } }
  }
}
