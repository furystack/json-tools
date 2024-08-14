import type { editor } from 'monaco-editor'

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

export const orderFieldsAction: editor.IActionDescriptor = {
  id: 'order-json-fields',
  label: 'Order Fields',
  contextMenuGroupId: 'navigation',
  contextMenuOrder: 1.5,
  run: async (ed) => {
    const object = JSON.parse(ed.getValue())
    const ordered = orderFields(object)
    ed.setValue(JSON.stringify(ordered, undefined, 4))
    await ed.getAction('editor.action.format')?.run()
  },
}
