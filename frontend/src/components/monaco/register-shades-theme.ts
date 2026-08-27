import type { ThemeProviderService } from '@furystack/shades-common-components'
import type { editor as editorTypes } from 'monaco-editor/editor'
import { createMonacoTheme } from './create-monaco-theme.js'

export const registerShadesTheme = ({
  themeProvider,
  editor,
}: {
  themeProvider: ThemeProviderService
  editor: typeof editorTypes
}) => {
  const monacoTheme = createMonacoTheme(themeProvider.getAssignedTheme())
  editor.defineTheme(monacoTheme.name, monacoTheme.data)
  return monacoTheme.name
}
