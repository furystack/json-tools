import { Shade, createComponent } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import 'monaco-editor/esm/vs/editor/editor.main'

import './worker-config.js'
import { ThemeProviderService } from '@furystack/shades-common-components'
import { darkTheme } from '../../themes/dark.js'
import { orderFieldsAction } from './order-fields.js'
import { ScrollService } from '../../services/scroll-service.js'

export type MonacoDiffEditorProps = {
  options: editor.IStandaloneDiffEditorConstructionOptions
  originalValue?: string
  onOriginalValueChange?: (value: string) => void
  modifiedValue?: string
  onModifiedValueChange?: (value: string) => void
}

export const MonacoDiffEditor = Shade<MonacoDiffEditorProps>({
  shadowDomName: 'monaco-diff-editor',
  render: ({ useRef, useDisposable, injector, props, useHostProps }) => {
    const containerRef = useRef<HTMLDivElement>('container')
    const themeProvider = injector.getInstance(ThemeProviderService)
    const scrollService = injector.getInstance(ScrollService)

    useHostProps({ style: { display: 'block', height: '100%' } })

    useDisposable('editorLifecycle', () => {
      let editorInstance: editor.IStandaloneDiffEditor | null = null
      let isDisposed = false
      const disposables: Array<{ [Symbol.dispose](): void }> = []

      queueMicrotask(() => {
        if (isDisposed || !containerRef.current) return

        editorInstance = editor.createDiffEditor(containerRef.current, {
          ...props.options,
          theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
          smoothScrolling: true,
          scrollBeyondLastLine: false,
        })

        disposables.push(
          themeProvider.subscribe('themeChanged', () => {
            editorInstance?.updateOptions({
              theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
            } as editor.IStandaloneDiffEditorConstructionOptions)
          }),
        )

        const originalModel = editor.createModel(props.originalValue || '', 'json')
        const modifiedModel = editor.createModel(props.modifiedValue || '', 'json')
        disposables.push(
          { [Symbol.dispose]: () => originalModel.dispose() },
          { [Symbol.dispose]: () => modifiedModel.dispose() },
        )

        editorInstance.setModel({ original: originalModel, modified: modifiedModel })

        if (props.onOriginalValueChange) {
          editorInstance.getOriginalEditor().onKeyUp(() => {
            props.onOriginalValueChange?.(editorInstance?.getOriginalEditor().getValue() ?? '')
          })
        }

        if (props.onModifiedValueChange) {
          editorInstance.getModifiedEditor().onKeyUp(() => {
            props.onModifiedValueChange?.(editorInstance?.getModifiedEditor().getValue() ?? '')
          })
        }

        editorInstance.addAction(orderFieldsAction)
        editorInstance.getOriginalEditor().addAction(orderFieldsAction)

        editorInstance.getOriginalEditor().onDidScrollChange(() => {
          scrollService.emit('onScroll', { top: editorInstance?.getOriginalEditor().getScrollTop() === 0 })
        })

        editorInstance.getModifiedEditor().onDidScrollChange(() => {
          scrollService.emit('onScroll', { top: editorInstance?.getModifiedEditor().getScrollTop() === 0 })
        })

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
