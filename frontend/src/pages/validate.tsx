import { Shade, createComponent } from '@furystack/shades'
import { MonacoEditor } from '../components/monaco-editor'

export const ValidatePage = Shade<unknown, { value: string }>({
  getInitialState: () => ({ value: '' }),
  shadowDomName: 'shade-validate-page',
  render: ({ updateState }) => (
    <div
      style={{
        position: 'fixed',
        top: '65px',
        height: 'calc(100% - 65px)',
        width: '100%',
      }}>
      <MonacoEditor
        value=""
        onchange={(value) => updateState({ value }, true)}
        options={{
          language: 'json',
          automaticLayout: true,
          readOnly: false,
          theme: 'vs-dark',
        }}
      />
    </div>
  ),
})
