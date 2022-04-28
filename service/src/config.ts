import { join } from 'path'
import { InMemoryStore, User } from '@furystack/core'
import { FileSystemStore } from '@furystack/filesystem-store'
import { Injector } from '@furystack/inject'
import { VerboseConsoleLogger } from '@furystack/logging'
import { AuthorizationResult } from '@furystack/repository'
import '@furystack/repository/dist/injector-extension'
import { DefaultSession } from '@furystack/rest-service'
import { PasswordCredential } from '@furystack/security'

export const authorizedOnly = async (options: { injector: Injector }): Promise<AuthorizationResult> => {
  const isAllowed = await options.injector.isAuthenticated()
  return isAllowed
    ? { isAllowed }
    : {
        isAllowed,
        message: 'You are not authorized :(',
      }
}

export const authorizedDataSet = {
  authorizeAdd: authorizedOnly,
  authorizeGet: authorizedOnly,
  authorizeRemove: authorizedOnly,
  authorizeUpdate: authorizedOnly,
  authroizeRemoveEntity: authorizedOnly,
}

export const injector = new Injector()
injector
  .useLogging(VerboseConsoleLogger)
  .setupStores((stores) =>
    stores
      .addStore(
        new FileSystemStore({
          model: User,
          primaryKey: 'username',
          tickMs: 30 * 1000,
          fileName: join(__filename, '..', '..', 'users.json'),
        }),
      )
      .addStore(
        new FileSystemStore({
          model: PasswordCredential,
          primaryKey: 'userName',
          tickMs: 30 * 1000,
          fileName: join(__filename, '..', '..', 'credentials.json'),
        }),
      )
      .addStore(new InMemoryStore({ model: DefaultSession, primaryKey: 'sessionId' })),
  )
  .setupRepository((repo) =>
    repo.createDataSet<User, 'username'>(User, 'username', {
      ...authorizedDataSet,
    }),
  )
