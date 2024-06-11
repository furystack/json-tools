import { Shade } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { Uri } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main'

import './worker-config'
import { ThemeProviderService, getCssVariable } from '@furystack/shades-common-components'
import { darkTheme } from '../../themes/dark.js'
import { orderFieldsAction } from './order-fields.js'

export interface MonacoEditorProps {
  options: editor.IStandaloneEditorConstructionOptions
  value?: string
  onValueChange?: (value: string) => void
  modelUri?: Uri
}
export const MonacoEditor = Shade<MonacoEditorProps>({
  shadowDomName: 'monaco-editor',
  constructed: ({ element, props, injector, useState, useDisposable }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)

    const [theme] = useState<'vs-light' | 'vs-dark'>(
      'theme',
      getCssVariable(themeProvider.theme.background.default) === darkTheme.background.default ? 'vs-dark' : 'vs-light',
    )

    const [editorInstance] = useState(
      'editorInstance',
      editor.create(element as HTMLElement, { ...props.options, theme }),
    )

    editorInstance.onDidChangeModelContent(() => {
      props.onValueChange?.(editorInstance.getValue())
    })

    if (props.modelUri) {
      useDisposable('monacoModelUri', () => {
        const model = editor.createModel(props.value || '', 'json', props.modelUri)
        editorInstance.setModel(model)
        return {
          dispose: () => {
            model.dispose()
          },
        }
      })
    } else {
      editorInstance.setValue(props.value || '')
    }

    editorInstance.addAction(orderFieldsAction)

    Object.assign(element, { editorInstance })

    return () => editorInstance.dispose()
  },
  render: ({ element }) => {
    element.style.display = 'block'
    element.style.height = 'calc(100% - 96px)'
    element.style.width = '100%'
    element.style.position = 'relative'
    return null
  },
})
