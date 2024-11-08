import { Shade } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { Uri } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main'

import './worker-config'
import { ThemeProviderService } from '@furystack/shades-common-components'
import { darkTheme } from '../../themes/dark.js'
import { orderFieldsAction } from './order-fields.js'
import { ScrollService } from '../../services/scroll-service.js'

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

    const [editorInstance] = useState(
      'editorInstance',
      editor.create(element as HTMLElement, {
        ...props.options,
        theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
        smoothScrolling: true,
        scrollBeyondLastLine: false,
      }),
    )

    editorInstance.onDidScrollChange(() => {
      injector.getInstance(ScrollService).emit('onScroll', { top: editorInstance.getScrollTop() === 0 })
    })

    useDisposable('themeChange', () =>
      themeProvider.subscribe('themeChanged', () => {
        editorInstance.updateOptions({
          theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
        })
      }),
    )

    editorInstance.onDidChangeModelContent(() => {
      props.onValueChange?.(editorInstance.getValue())
    })

    if (props.modelUri) {
      useDisposable('monacoModelUri', () => {
        const model = editor.createModel(props.value || '', 'json', props.modelUri)
        editorInstance.setModel(model)
        return {
          [Symbol.dispose]: () => {
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
    element.style.height = '100%'
    return null
  },
})
