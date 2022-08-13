import { join } from 'path'
import { addStore, InMemoryStore, isAuthenticated, User } from '@furystack/core'
import { FileSystemStore } from '@furystack/filesystem-store'
import { Injector } from '@furystack/inject'
import { useLogging, VerboseConsoleLogger } from '@furystack/logging'
import { AuthorizationResult } from '@furystack/repository'
import { getRepository } from '@furystack/repository'
import { DefaultSession } from '@furystack/rest-service'
import { PasswordCredential } from '@furystack/security'

export const authorizedOnly = async (options: { injector: Injector }): Promise<AuthorizationResult> => {
  const isAllowed = await isAuthenticated(options.injector)
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

useLogging(injector, VerboseConsoleLogger)
addStore(
  injector,
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
  .addStore(new InMemoryStore({ model: DefaultSession, primaryKey: 'sessionId' }))

getRepository(injector).createDataSet<User, 'username'>(User, 'username', {
  ...authorizedDataSet,
})
