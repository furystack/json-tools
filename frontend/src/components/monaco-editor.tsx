import { Shade, createComponent } from '@furystack/shades'
import { defaultLightTheme, ThemeProviderService } from '@furystack/shades-common-components'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export interface MonacoEditorProps {
  options: monaco.editor.IStandaloneEditorConstructionOptions
  value?: string
  onchange?: (value: string) => void
}
export const MonacoEditor = Shade<MonacoEditorProps>({
  shadowDomName: 'shade-monaco-editor',
  constructed: ({ element, props, injector }) => {
    ;(monaco.languages.json.jsonDefaults.diagnosticsOptions as any).enableSchemaRequest = true
    const editor = monaco.editor.create(element.firstChild as HTMLElement, props.options)
    editor.setValue(props.value || '')
    props.onchange &&
      editor.onKeyUp(() => {
        const value = editor.getValue()
        props.onchange && props.onchange(value)
      })
    const themeChange = injector.getInstance(ThemeProviderService).theme.subscribe((t) => {
      if (t === defaultLightTheme) {
        editor.updateOptions({ theme: 'vs-light' })
      } else {
        editor.updateOptions({ theme: 'vs-dark' })
      }
    }, true)
    return () => themeChange.dispose()
  },
  render: () => {
    return <div style={{ width: '100%', height: '100%' }}> </div>
  },
})
