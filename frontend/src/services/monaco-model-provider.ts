import { defineService } from '@furystack/inject'
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api.js'
import { json } from 'monaco-editor/esm/vs/editor/editor.main.js'

export const MonacoModelProvider = defineService({
  name: 'monacoModelProvider',
  lifetime: 'singleton',
  factory: () => {
    const nameUriCache = new Map<string, Uri>()

    return {
      getModelUriForEntityType({ schemaName, jsonSchema }: { schemaName: string; jsonSchema: any }) {
        if (nameUriCache.has(schemaName)) {
          return nameUriCache.get(schemaName) as Uri
        }
        const modelUri = Uri.parse(`furystack://json-tools/model-schemas-${schemaName}.json`)
        json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          enableSchemaRequest: true,
          schemaRequest: 'warning',
          schemaValidation: 'error',
          schemas: [
            ...(json.jsonDefaults.diagnosticsOptions.schemas || []),
            {
              uri: `furystack://json-tools/model-schemas-${schemaName}.json`,
              fileMatch: [modelUri.toString()],
              schema: { ...jsonSchema },
            },
          ],
        })
        nameUriCache.set(schemaName, modelUri)
        return modelUri
      },
    }
  },
})
