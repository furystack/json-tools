import { StoreManager } from '@furystack/core'
import { RequestAction, JsonResult } from '@furystack/rest'
import { HttpUserContext } from '@furystack/rest-service'
import { User } from 'common'
export const RegisterAction: RequestAction<{
  result: User
  body: { username: string; password: string }
}> = async ({ injector, getBody }) => {
  const body = await getBody()
  const userStore = injector.getInstance(StoreManager).getStoreFor(User)

  const existing = await userStore.find({ filter: { username: { $eq: body.username } } })
  if (existing) {
    throw Error('User already exists')
  }

  const createdUser = await userStore.add({
    username: body.username,
    password: injector.getInstance(HttpUserContext).authentication.hashMethod(body.password),
    roles: [],
  } as any)
  return JsonResult(createdUser.created[0], 201)
}
