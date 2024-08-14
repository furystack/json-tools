import { Shade, createComponent } from '@furystack/shades'
import { Button, Modal, Paper, fadeIn, fadeOut } from '@furystack/shades-common-components'
import { ObservableValue } from '@furystack/utils'
import { MonacoEditor } from './monaco/monaco-editor.js'

type JsonSchemaSelectorProps = {
  schema: string
  onSchemaChange: (schema: string) => void
}

export const JsonSchemaSelector = Shade<JsonSchemaSelectorProps>({
  shadowDomName: 'shade-json-schema-selector',
  render: ({ props, useDisposable }) => {
    const isVisible = useDisposable('isVisible', () => new ObservableValue(false))
    const value = useDisposable('value', () => new ObservableValue(props.schema))

    return (
      <>
        <Button
          title="Edit JSON schema"
          variant="outlined"
          onclick={() => {
            isVisible.setValue(true)
          }}
        >
          <i className="material-symbols-outlined" style={{ fontSize: '1.15em', marginRight: '8px' }}>
            data_object
          </i>
          Schema
        </Button>
        <Modal
          title="Select JSON Schema"
          isVisible={isVisible}
          onClose={() => {
            isVisible.setValue(false)
          }}
          backdropStyle={{
            background: 'rgba(128,128,128, 0.3)',
            backdropFilter: 'blur(5px)',
            zIndex: '5',
          }}
          showAnimation={fadeIn}
          hideAnimation={fadeOut}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}
          >
            <Paper
              style={{ padding: '.5em', width: 'calc(100% - 14em)', height: 'calc(100% - 32em)' }}
              onclick={(ev) => ev.stopPropagation()}
              onkeyup={(ev) => {
                if (ev.key === 'Escape') {
                  isVisible.setValue(false)
                }
              }}
            >
              <h5>Edit JSON schema</h5>
              <MonacoEditor
                value={value.getValue()}
                options={{
                  automaticLayout: true,
                  language: 'json',
                }}
                onValueChange={(newValue) => {
                  value.setValue(newValue)
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '.5em' }}>
                <Button
                  onclick={() => {
                    isVisible.setValue(false)
                  }}
                >
                  Close
                </Button>
                <Button
                  onclick={() => {
                    props.onSchemaChange(value.getValue())
                    isVisible.setValue(false)
                  }}
                >
                  Apply
                </Button>
              </div>
            </Paper>
          </div>
        </Modal>
      </>
    )
  },
})
