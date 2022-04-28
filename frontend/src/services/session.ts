import { User, IdentityContext } from '@furystack/core'
import { Injectable } from '@furystack/inject'
import { ResponseError } from '@furystack/rest-client-fetch'
import { ObservableValue, usingAsync, sleepAsync } from '@furystack/utils'
import { BoilerplateApiClient } from './boilerplate-api-client'

export type sessionState = 'initializing' | 'offline' | 'unauthenticated' | 'authenticated'

@Injectable({ lifetime: 'singleton' })
export class SessionService implements IdentityContext {
  private readonly operation = () => {
    this.isOperationInProgress.setValue(true)
    return { dispose: () => this.isOperationInProgress.setValue(false) }
  }

  public state = new ObservableValue<sessionState>('initializing')
  public currentUser = new ObservableValue<User | null>(null)

  public isOperationInProgress = new ObservableValue(true)

  public loginError = new ObservableValue('')
  private async init() {
    await usingAsync(this.operation(), async () => {
      try {
        const response = await this.api.call({ method: 'GET', action: '/isAuthenticated' })
        const { isAuthenticated } = response.result
        this.state.setValue(isAuthenticated ? 'authenticated' : 'unauthenticated')
        if (isAuthenticated) {
          const userResponse = await this.api.call({ method: 'GET', action: '/currentUser' })
          this.currentUser.setValue(userResponse.result)
        }
      } catch (error) {
        this.state.setValue('offline')
      }
    })
  }

  public async login(username: string, password: string): Promise<void> {
    await usingAsync(this.operation(), async () => {
      try {
        await sleepAsync(2000)
        const userResponse = await this.api.call({ method: 'POST', action: '/login', body: { username, password } })
        this.currentUser.setValue(userResponse.result)
        this.state.setValue('authenticated')
      } catch (error) {
        if (error instanceof ResponseError) {
          const errorResponse = await error.response.json()
          this.loginError.setValue(errorResponse.message)
        } else {
          throw error
        }
      }
    })
  }

  public async register(username: string, password: string): Promise<void> {
    await usingAsync(this.operation(), async () => {
      try {
        await sleepAsync(2000)
        await this.api.call({ method: 'POST', action: '/register', body: { username, password } })
      } catch (error) {
        if (error instanceof ResponseError) {
          const errorResponse = await error.response.json()
          this.loginError.setValue(errorResponse.message)
        } else {
          throw error
        }
      }
    })
  }

  public async logout(): Promise<void> {
    await usingAsync(this.operation(), async () => {
      this.api.call({ method: 'POST', action: '/logout' })
      this.currentUser.setValue(null)
      this.state.setValue('unauthenticated')
    })
  }

  constructor(private api: BoilerplateApiClient) {
    this.init()
  }
  public async isAuthenticated(): Promise<boolean> {
    return this.state.getValue() === 'authenticated'
  }
  public async isAuthorized(...roles: string[]): Promise<boolean> {
    return roles.every((role) => this.currentUser.getValue()?.roles.includes(role))
  }
  public async getCurrentUser<TUser extends User>(): Promise<TUser> {
    return this.currentUser.getValue() as TUser
  }
}
