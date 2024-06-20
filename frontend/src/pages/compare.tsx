import { LocationService, Shade, createComponent } from '@furystack/shades'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { MonacoDiffEditor } from '../components/monaco/monaco-diff-editor.js'
import { ShareButton } from '../components/share-button.js'

export const ComparePage = Shade({
  shadowDomName: 'shade-compare-page',
  render: ({ injector, useObservable, element }) => {
    const locationService = injector.getInstance(LocationService)

    const [original, setOriginal] = useObservable('original', locationService.useSearchParam('original', ''), {
      onChange: (newValue) => {
        const originalEditor = (
          element.querySelector<any>('monaco-diff-editor')?.editorInstance as editor.IDiffEditor
        )?.getOriginalEditor()
        const pos = originalEditor.getPosition()
        originalEditor.setValue(newValue)
        pos && originalEditor.setPosition(pos)
      },
    })
    const [modified, setModified] = useObservable('modified', locationService.useSearchParam('modified', ''), {
      onChange: (newValue) => {
        const modifiedEditor = (
          element.querySelector<any>('monaco-diff-editor')?.editorInstance as editor.IDiffEditor
        )?.getModifiedEditor()

        const pos = modifiedEditor.getPosition()
        modifiedEditor.setValue(newValue)
        pos && modifiedEditor.setPosition(pos)
      },
    })

    return (
      <div
        style={{
          position: 'fixed',
          top: '63px',
          height: 'calc(100% - 10px)',
          width: '100%',
        }}>
        <MonacoDiffEditor
          originalValue={original}
          modifiedValue={modified}
          onOriginalValueChange={(newOriginalValue) => setOriginal(newOriginalValue)}
          onModifiedValueChange={(newModifiedValue) => setModified(newModifiedValue)}
          options={
            {
              automaticLayout: true,
              readOnly: false,
              originalEditable: true,
              theme: 'vs-dark',
            } as any
          }
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <ShareButton />
        </div>
      </div>
    )
  },
})
