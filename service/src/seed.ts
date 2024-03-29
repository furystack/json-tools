import { PhysicalStore, StoreManager, FindOptions, User, WithOptionalId } from '@furystack/core'
import { Injector } from '@furystack/inject'
import { injector } from './config'
import { PasswordAuthenticator, PasswordCredential } from '@furystack/security'
import { getLogger } from '@furystack/logging'

/**
 * gets an existing instance if exists or create and return if not. Throws error on multiple result
 *
 * @param filter The filter term
 * @param instance The instance to be created if there is no instance present
 * @param store The physical store to use
 * @param i The Injector instance
 * @returns The retrieved or created object
 */
export const getOrCreate = async <T, TKey extends keyof T>(
  filter: FindOptions<T, Array<keyof T>>,
  instance: WithOptionalId<T, TKey>,
  store: PhysicalStore<T, TKey>,
  i: Injector,
): Promise<T> => {
  const result = await store.find(filter)
  const logger = getLogger(i).withScope('seeder')
  if (result.length === 1) {
    return result[0]
  } else if (result.length === 0) {
    logger.verbose({
      message: `Entity of type '${store.model.name}' not exists, adding: '${JSON.stringify(filter)}'`,
    })
    const createResult = await store.add(instance)
    return createResult.created[0]
  } else {
    const message = `Seed filter contains '${result.length}' results for ${JSON.stringify(filter)}`
    logger.warning({ message })
    throw Error(message)
  }
}

/**
 * Seeds the databases with predefined values
 *
 * @param i The injector instance
 */
export const seed = async (i: Injector): Promise<void> => {
  const logger = getLogger(i).withScope('seeder')
  logger.verbose({ message: 'Seeding data...' })
  const sm = i.getInstance(StoreManager)
  const userStore = sm.getStoreFor(User, 'username')
  const credential = await i.getInstance(PasswordAuthenticator).getHasher().createCredential('testuser', 'password')
  await getOrCreate(
    { filter: { username: { $eq: 'testuser' } } },
    {
      username: 'testuser',
      roles: [],
    },
    userStore,
    i,
  )
  await getOrCreate(
    { filter: { userName: { $eq: credential.userName } } },
    credential,
    sm.getStoreFor(PasswordCredential, 'userName'),
    i,
  )

  logger.verbose({ message: 'Seeding data completed.' })
}

seed(injector).then(() => injector.dispose())
