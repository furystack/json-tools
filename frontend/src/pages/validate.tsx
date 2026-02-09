import { LocationService, Shade, createComponent } from '@furystack/shades'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { JsonSchemaSelector } from '../components/json-schema-selector.js'
import { MonacoEditor } from '../components/monaco/monaco-editor.js'
import { ShareButton } from '../components/share-button.js'
import { MonacoModelProvider } from '../services/monaco-model-provider.js'

export const ValidatePage = Shade({
  shadowDomName: 'shade-validate-page',
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
  render: ({ injector, useObservable, useRef, useSearchState }) => {
    const containerRef = useRef<HTMLDivElement>('container')
    const locationService = injector.getInstance(LocationService)
    const modelProvider = injector.getInstance(MonacoModelProvider)

    const [value, setValue] = useObservable(
      'value',
      locationService.useSearchParam('value', JSON.stringify({ value: 'Enter a value to verify' }, undefined, 2)),
      {
        onChange: (newValue) => {
          const editorInstance = containerRef.current?.querySelector<
            HTMLElement & { editorInstance?: editor.IStandaloneCodeEditor }
          >('monaco-editor')?.editorInstance
          const pos = editorInstance?.getPosition()
          editorInstance?.setValue(newValue)

          if (pos) {
            editorInstance?.setPosition(pos)
          }
        },
      },
    )

    const [jsonSchema] = useSearchState('jsonSchema', '')

    const [, setJsonSchema] = useObservable('schema', locationService.useSearchParam('jsonSchema', ''), {
      onChange: (newValue) => {
        const editorInstance = containerRef.current?.querySelector<
          HTMLElement & { editorInstance?: editor.IStandaloneCodeEditor }
        >('monaco-editor')?.editorInstance
        const oldModel = editorInstance?.getModel()

        const uri = modelProvider.getModelUriForEntityType({
          schemaName: JSON.stringify(newValue).replace(/[^a-zA-Z0-9]/g, ''),
          jsonSchema: JSON.parse(newValue),
        })

        if (editorInstance && oldModel) {
          editorInstance?.setModel(editor.createModel(oldModel.getValue(), 'json', uri))
          oldModel?.dispose()
        }
      },
    })

    const uri = jsonSchema
      ? modelProvider.getModelUriForEntityType({
          schemaName: JSON.stringify(jsonSchema).replace(/[^a-zA-Z0-9]/g, ''),
          jsonSchema: JSON.parse(jsonSchema),
        })
      : undefined

    return (
      <div className="page-container" ref={containerRef}>
        <MonacoEditor
          value={value}
          onValueChange={(newValue) => setValue(newValue)}
          modelUri={uri}
          options={{
            language: 'json',
            automaticLayout: true,
            readOnly: false,
          }}
        />

        <div className="actions">
          <JsonSchemaSelector
            schema={jsonSchema}
            onSchemaChange={(schema) => {
              setJsonSchema(schema)
            }}
          />
          <ShareButton />
        </div>
      </div>
    )
  },
})
