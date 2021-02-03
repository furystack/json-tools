import { Shade, createComponent } from '@furystack/shades'
import { MonacoDiffEditor } from '../components/monaco-diff-editor'

export const ComparePage = Shade<unknown, { originalValue: string; modifiedValue: string }>({
  getInitialState: () => ({ originalValue: '', modifiedValue: '' }),
  shadowDomName: 'shade-compare-page',
  render: ({ updateState }) => (
    <div
      style={{
        position: 'fixed',
        top: '63px',
        height: 'calc(100% - 63px)',
        width: '100%',
      }}>
      <MonacoDiffEditor
        originalValue=""
        modifiedValue=""
        onOriginalChange={(originalValue) => updateState({ originalValue }, true)}
        onModifiedChange={(modifiedValue) => updateState({ modifiedValue }, true)}
        options={
          {
            automaticLayout: true,
            readOnly: false,
            originalEditable: true,
            theme: 'vs-dark',
          } as any
        }
      />
    </div>
  ),
})
