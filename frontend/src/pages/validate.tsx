import { LocationService, Shade, createComponent } from '@furystack/shades'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { MonacoEditor } from '../components/monaco/monaco-editor.js'

export const ValidatePage = Shade({
  shadowDomName: 'shade-validate-page',
  render: ({ injector, useObservable, element }) => {
    const locationService = injector.getInstance(LocationService)

    const [original, setOriginal] = useObservable('value', locationService.useSearchParam('value', ''), {
      onChange: (newValue) => {
        const originalEditor = (
          element.querySelector<any>('monaco-diff-editor')?.editorInstance as editor.IDiffEditor
        )?.getOriginalEditor()
        const pos = originalEditor.getPosition()
        originalEditor.setValue(newValue)
        pos && originalEditor.setPosition(pos)
      },
    })
    return (
      <div
        style={{
          position: 'fixed',
          top: '65px',
          height: 'calc(100% - 65px)',
          width: '100%',
        }}>
        <MonacoEditor
          value={original}
          onValueChange={(newValue) => setOriginal(newValue)}
          options={{
            language: 'json',
            automaticLayout: true,
            readOnly: false,
            theme: 'vs-dark',
          }}
        />
      </div>
    )
  },
})
