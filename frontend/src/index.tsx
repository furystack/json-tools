import { createComponent, initializeShadeRoot, useCustomSearchStateSerializer } from '@furystack/shades'
import { useLogging, VerboseConsoleLogger } from '@furystack/logging'
import { Injector } from '@furystack/inject'
import { getLogger } from '@furystack/logging'
import { Layout } from './components/layout.js'
import { environmentOptions } from './environment-options.js'
import { darkTheme } from './themes/dark.js'
import { ThemeProviderService } from '@furystack/shades-common-components'
import { gunzipSync, gzipSync, strFromU8, strToU8 } from 'fflate'
import { orderFields } from './components/monaco/order-fields.js'
import { lightTheme } from './themes/light.js'

const shadeInjector = new Injector()

const serializeValue = (value: any) => {
  const compressed = gzipSync(strToU8(JSON.stringify(orderFields(value))), {
    mtime: 0,
  })
  const stringified = strFromU8(compressed, true)
  const base64Encoded = btoa(stringified)
  return encodeURIComponent(base64Encoded)
}

export const serializeToQueryString = <T extends object>(queryObject: T): string => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(queryObject)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, serializeValue(value)]),
    ),
  ).toString()
}

const decode = (value: string): unknown => {
  const decoded = decodeURIComponent(value)
  const base64Decoded = atob(decoded)
  const uintArrayed = strToU8(base64Decoded, true)
  const decompressed = gunzipSync(uintArrayed)
  return JSON.parse(strFromU8(decompressed))
}

export const deserializeQueryString = (fullQueryString: string) => {
  const params = [...new URLSearchParams(fullQueryString).entries()]
    .filter(([key, value]) => key && value)
    .map(([key, value]) => [key, decode(value)] as const)

  return Object.fromEntries(params)
}

useCustomSearchStateSerializer(shadeInjector, serializeToQueryString, deserializeQueryString)

const themeName = JSON.parse(localStorage.getItem('theme') || '"dark"') || 'dark'
const themeProviderService = shadeInjector.getInstance(ThemeProviderService)
themeProviderService.setAssignedTheme(themeName === 'light' ? lightTheme : darkTheme)

useLogging(shadeInjector, VerboseConsoleLogger)

void getLogger(shadeInjector).withScope('Startup').verbose({
  message: 'Initializing Shade Frontend...',
  data: { environmentOptions },
})

const rootElement: HTMLDivElement = document.getElementById('root') as HTMLDivElement

initializeShadeRoot({
  injector: shadeInjector,
  rootElement,
  jsxElement: <Layout />,
})
