import { Shade } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import type { Uri } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main'

import './worker-config.js'
import { ThemeProviderService } from '@furystack/shades-common-components'
import { darkTheme } from '../../themes/dark.js'
import { orderFieldsAction } from './order-fields.js'
import { ScrollService } from '../../services/scroll-service.js'

export interface MonacoEditorProps {
  options: editor.IStandaloneEditorConstructionOptions
  originalValue?: string
  onOriginalValueChange?: (value: string) => void
  modifiedValue?: string
  onModifiedValueChange?: (value: string) => void
  originalModelUri?: Uri
  modifiedModelUri?: Uri
}
export const MonacoDiffEditor = Shade<MonacoEditorProps>({
  shadowDomName: 'monaco-diff-editor',
  constructed: ({ element, props, injector, useDisposable }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)

    const editorInstance = editor.createDiffEditor(element as HTMLElement, {
      ...props.options,
      theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
      smoothScrolling: true,
      scrollBeyondLastLine: false,
    })

    useDisposable('themeChange', () =>
      themeProvider.subscribe('themeChanged', () => {
        editorInstance.updateOptions({
          theme: themeProvider.getAssignedTheme().name === darkTheme.name ? 'vs-dark' : 'vs-light',
        } as any)
      }),
    )

    const originalModel = editor.createModel(props.originalValue || '', 'json')
    const modifiedModel = editor.createModel(props.modifiedValue || '', 'json')

    editorInstance.setModel({ original: originalModel, modified: modifiedModel })

    props.onOriginalValueChange &&
      editorInstance.getOriginalEditor().onKeyUp(() => {
        props.onOriginalValueChange?.(editorInstance.getOriginalEditor().getValue())
      })

    if (props.originalModelUri) {
      useDisposable('monacoOriginalModelUri', () => {
        const model = editor.createModel(editorInstance.getOriginalEditor().getValue(), 'json', props.originalModelUri)
        editorInstance.getOriginalEditor().setModel(model)
        return {
          dispose: () => {
            model.dispose()
          },
        }
      })
    }

    props.onModifiedValueChange &&
      editorInstance.getModifiedEditor().onKeyUp(() => {
        props.onModifiedValueChange?.(editorInstance.getModifiedEditor().getValue())
      })

    if (props.modifiedModelUri) {
      useDisposable('monacoModifiedModelUri', () => {
        const model = editor.createModel(editorInstance.getModifiedEditor().getValue(), 'json', props.modifiedModelUri)
        editorInstance.getModifiedEditor().setModel(model)
        return {
          dispose: () => {
            model.dispose()
          },
        }
      })
    }

    editorInstance.addAction(orderFieldsAction)
    editorInstance.getOriginalEditor().addAction(orderFieldsAction)

    editorInstance.getOriginalEditor().onDidScrollChange(() => {
      injector
        .getInstance(ScrollService)
        .emit('onScroll', { top: editorInstance.getOriginalEditor().getScrollTop() === 0 })
    })

    editorInstance.getModifiedEditor().onDidScrollChange(() => {
      injector
        .getInstance(ScrollService)
        .emit('onScroll', { top: editorInstance.getModifiedEditor().getScrollTop() === 0 })
    })

    Object.assign(element, { editorInstance })

    return () => editorInstance.dispose()
  },
  render: ({ element }) => {
    element.style.display = 'block'
    element.style.height = '100%'
    return null
  },
})
