import { Shade, createComponent } from '@furystack/shades'
import { Button, Modal, Paper, fadeIn, fadeOut } from '@furystack/shades-common-components'
import { MonacoEditor } from './monaco/monaco-editor.js'

type JsonSchemaSelectorProps = {
  schema: string
  onSchemaChange: (schema: string) => void
}

export const JsonSchemaSelector = Shade<JsonSchemaSelectorProps>({
  shadowDomName: 'shade-json-schema-selector',
  css: {
    '& .material-symbols-outlined': {
      fontSize: '1.15em',
      marginRight: '8px',
    },
  },
  render: ({ props, useState }) => {
    const [isVisible, setIsVisible] = useState('isVisible', false)
    const [value, setValue] = useState('value', props.schema)

    return (
      <>
        <Button
          title="Edit JSON schema"
          variant="outlined"
          onclick={() => {
            setIsVisible(true)
          }}
        >
          <i className="material-symbols-outlined">data_object</i>
          Schema
        </Button>
        <Modal
          isVisible={isVisible}
          onClose={() => {
            setIsVisible(false)
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
                  setIsVisible(false)
                }
              }}
            >
              <h5>Edit JSON schema</h5>
              <MonacoEditor
                value={value}
                options={{
                  automaticLayout: true,
                  language: 'json',
                }}
                onValueChange={(newValue) => {
                  setValue(newValue)
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '.5em' }}>
                <Button
                  onclick={() => {
                    setIsVisible(false)
                  }}
                >
                  Close
                </Button>
                <Button
                  onclick={() => {
                    props.onSchemaChange(value)
                    setIsVisible(false)
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
