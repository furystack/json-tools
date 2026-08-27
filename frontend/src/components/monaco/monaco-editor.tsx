import { createComponent, Shade } from '@furystack/shades'
import { ThemeProviderService } from '@furystack/shades-common-components'
import 'monaco-editor/editor'
import type { editor as editorTypes, Uri } from 'monaco-editor/editor'
import { editor } from 'monaco-editor/editor/editor.api'
import 'monaco-editor/languages/features/json/register'
import { registerShadesTheme } from './register-shades-theme.js'

export interface MonacoEditorProps {
  options: editor.IStandaloneEditorConstructionOptions
  value?: string
  onValueChange?: (value: string) => void
  onchange?: (value: string) => void
  style?: Partial<CSSStyleDeclaration>
  modelUri?: Uri
}
export const MonacoEditor = Shade<MonacoEditorProps>({
  customElementName: 'monaco-editor',
  css: {
    display: 'block',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  render: ({ props, useDisposable, injector, useHostProps, useRef }) => {
    const containerRef = useRef<HTMLDivElement>('editorContainer')

    if (props.style) {
      useHostProps({ style: props.style as Record<string, string> })
    }

    useDisposable('editor-init', () => {
      let editorInstance: editorTypes.IStandaloneCodeEditor | undefined
      let themeSub: Disposable | undefined

      queueMicrotask(() => {
        if (!containerRef.current) return
        const themeProvider = injector.get(ThemeProviderService)

        const themeName = registerShadesTheme({ themeProvider, editor })

        editorInstance = editor.create(containerRef.current, {
          theme: themeName,
          ...props.options,
        })

        if (props.modelUri) {
          editorInstance.setModel(editor.createModel(props.value || '', 'json', props.modelUri))
        }

        editorInstance.setValue(props.value || '')
        if (props.onchange) {
          editorInstance.onKeyUp(() => {
            const value = editorInstance!.getValue()
            props.onchange?.(value)
          })
        }

        if (props.onValueChange) {
          editorInstance.onDidChangeModelContent(() => {
            const value = editorInstance!.getValue()
            props.onValueChange?.(value)
          })
        }

        themeSub = themeProvider.subscribe('themeChanged', () => {
          const updatedName = registerShadesTheme({ themeProvider, editor })
          editor.setTheme(updatedName)
        })
      })

      return {
        [Symbol.dispose]: () => {
          themeSub?.[Symbol.dispose]()
          editorInstance?.dispose()
        },
      }
    })

    return <div ref={containerRef} data-spatial-nav-passthrough="" style={{ width: '100%', height: '100%' }} />
  },
})
