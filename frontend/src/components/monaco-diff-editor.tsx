import '@furystack/utils'
import { Shade, createComponent } from '@furystack/shades'

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { defaultLightTheme, ThemeProviderService } from '@furystack/shades-common-components'

export const orderFields = (obj: unknown): any => {
  if (obj && typeof obj === 'object') {
    if (obj instanceof Array) {
      return obj.map(orderFields)
    }
    const entries = Object.entries(obj)
    const fieldsInOrder = entries
      .map(([field]) => ({
        field,
      }))
      .sortBy('field', 'asc')
    return Object.fromEntries(
      fieldsInOrder
        .map((field) => entries.find((entry) => entry[0] === field.field) as [string, any])
        .map(([field, value]) => [field, orderFields(value)]),
    )
  }
  return obj
}

export interface MonacoDiffEditorProps {
  options: monaco.editor.IDiffEditorOptions
  originalValue: string
  modifiedValue: string
  onOriginalChange?: (value: string) => void
  onModifiedChange?: (value: string) => void
}
export const MonacoDiffEditor = Shade<MonacoDiffEditorProps>({
  constructed: ({ element, props, injector }) => {
    const editor = monaco.editor.createDiffEditor(element.firstChild as HTMLElement, props.options)
    const original = monaco.editor.createModel(props.originalValue, 'json')
    const modified = monaco.editor.createModel(props.modifiedValue, 'json')
    editor.setModel({
      original,
      modified,
    })
    props.onOriginalChange &&
      editor.getOriginalEditor().onKeyUp(() => props.onOriginalChange?.(editor.getOriginalEditor().getValue()))

    props.onModifiedChange &&
      editor.getModifiedEditor().onKeyUp(() => props.onOriginalChange?.(editor.getModifiedEditor().getValue()))
    const orderFieldsAction: monaco.editor.IActionDescriptor = {
      id: 'order-json-fields',
      label: 'Order Fields',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: (ed) => {
        const object = JSON.parse(ed.getValue())
        const ordered = orderFields(object)
        ed.setValue(JSON.stringify(ordered, undefined, 4))
        ed.getAction('editor.action.format').run()
      },
    }
    editor.getOriginalEditor().addAction(orderFieldsAction)
    editor.getModifiedEditor().addAction(orderFieldsAction)
    const themeChange = injector.getInstance(ThemeProviderService).theme.subscribe((t) => {
      if (t === defaultLightTheme) {
        editor.updateOptions({ theme: 'vs-light' } as any)
        editor.getOriginalEditor().updateOptions({ theme: 'vs-light' })
        editor.getModifiedEditor().updateOptions({ theme: 'vs-light' })
      } else {
        editor.updateOptions({ theme: 'vs-dark' } as any)
        editor.getOriginalEditor().updateOptions({ theme: 'vs-dark' })
        editor.getModifiedEditor().updateOptions({ theme: 'vs-dark' })
      }
    }, true)
    return () => themeChange.dispose()
  },
  render: () => {
    return <div style={{ width: '100%', height: '100%' }}> </div>
  },
})
