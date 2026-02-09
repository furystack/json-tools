import { Shade, createComponent } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { Uri } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main'

import './worker-config'
import { ThemeProviderService } from '@furystack/shades-common-components'
import { darkTheme } from '../../themes/dark.js'
import { orderFieldsAction } from './order-fields.js'
import { ScrollService } from '../../services/scroll-service.js'

export type MonacoEditorProps = {
  options: editor.IStandaloneEditorConstructionOptions
  value?: string
  onValueChange?: (value: string) => void
  modelUri?: Uri
}

export const MonacoEditor = Shade<MonacoEditorProps>({
  shadowDomName: 'monaco-editor',
  render: ({ useRef, useDisposable, injector, props, useHostProps }) => {
    const containerRef = useRef<HTMLDivElement>('container')
    const themeProvider = injector.getInstance(ThemeProviderService)
    const scrollService = injector.getInstance(ScrollService)

    useHostProps({ style: { display: 'block', height: '100%' } })

    useDisposable('editorLifecycle', () => {
      let editorInstance: editor.IStandaloneCodeEditor | null = null
      let isDisposed = false
      const disposables: Array<{ [Symbol.dispose](): void }> = []

      queueMicrotask(() => {
        if (isDisposed || !containerRef.current) return

        editorInstance = editor.create(containerRef.current, {
          ...props.options,
          theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
          smoothScrolling: true,
          scrollBeyondLastLine: false,
        })

        editorInstance.onDidScrollChange(() => {
          scrollService.emit('onScroll', { top: editorInstance?.getScrollTop() === 0 })
        })

        disposables.push(
          themeProvider.subscribe('themeChanged', () => {
            editorInstance?.updateOptions({
              theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
            })
          }),
        )

        editorInstance.onDidChangeModelContent(() => {
          props.onValueChange?.(editorInstance?.getValue() ?? '')
        })

        if (props.modelUri) {
          const model = editor.createModel(props.value || '', 'json', props.modelUri)
          editorInstance.setModel(model)
          disposables.push({ [Symbol.dispose]: () => model.dispose() })
        } else {
          editorInstance.setValue(props.value || '')
        }

        editorInstance.addAction(orderFieldsAction)

        const hostElement = containerRef.current.parentElement
        if (hostElement) {
          Object.assign(hostElement, { editorInstance })
        }
      })

      return {
        [Symbol.dispose]() {
          isDisposed = true
          disposables.forEach((d) => d[Symbol.dispose]())
          editorInstance?.dispose()
        },
      }
    })

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  },
})
