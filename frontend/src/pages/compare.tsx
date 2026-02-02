import { LocationService, Shade, createComponent } from '@furystack/shades'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { MonacoDiffEditor } from '../components/monaco/monaco-diff-editor.js'
import { ShareButton } from '../components/share-button.js'

export const ComparePage = Shade({
  shadowDomName: 'shade-compare-page',
  css: {
    '& .page-container': {
      position: 'fixed',
      height: '100%',
      width: '100%',
    },
    '& .actions': {
      position: 'fixed',
      bottom: '0',
      right: '0',
      zIndex: '100',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
  render: ({ injector, useObservable, element }) => {
    const locationService = injector.getInstance(LocationService)

    const [original, setOriginal] = useObservable(
      'original',
      locationService.useSearchParam('original', JSON.stringify({ foo: 'bar' }, undefined, 2)),
      {
        onChange: (newValue) => {
          const originalEditor = element
            .querySelector<HTMLElement & { editorInstance?: editor.IDiffEditor }>('monaco-diff-editor')
            ?.editorInstance?.getOriginalEditor()
          const pos = originalEditor?.getPosition()
          originalEditor?.setValue(newValue)
          if (pos) {
            originalEditor?.setPosition(pos)
          }
        },
      },
    )
    const [modified, setModified] = useObservable(
      'modified',
      locationService.useSearchParam('modified', JSON.stringify({ foo: 'baz' }, undefined, 2)),
      {
        onChange: (newValue) => {
          const modifiedEditor = element
            .querySelector<HTMLElement & { editorInstance?: editor.IDiffEditor }>('monaco-diff-editor')
            ?.editorInstance?.getModifiedEditor()
          const pos = modifiedEditor?.getPosition()
          modifiedEditor?.setValue(newValue)
          if (pos) {
            modifiedEditor?.setPosition(pos)
          }
        },
      },
    )

    return (
      <div className="page-container">
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
        <div className="actions">
          <ShareButton />
        </div>
      </div>
    )
  },
})
