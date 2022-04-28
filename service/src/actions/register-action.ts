import { PasswordAuthenticator } from '@furystack/security'
import { User, StoreManager } from '@furystack/core'
import { JsonResult, RequestAction } from '@furystack/rest-service'
export const RegisterAction: RequestAction<{
  result: User
  body: { username: string; password: string }
}> = async ({ injector, getBody }) => {
  const body = await getBody()
  const userStore = injector.getInstance(StoreManager).getStoreFor(User, 'username')

  const existing = await userStore.find({ filter: { username: { $eq: body.username } } })
  if (existing) {
    throw Error('User already exists')
  }

  const password = await injector.getInstance(PasswordAuthenticator).getHasher().createCredential(body.username, body.password)

  const createdUser = await userStore.add({
    username: body.username,
    password,
    roles: [],
  } as any)
  return JsonResult(createdUser.created[0], 201)
}
