import { Injectable } from '@furystack/inject'
import { Uri, languages } from 'monaco-editor/esm/vs/editor/editor.api.js'

@Injectable({ lifetime: 'singleton' })
export class MonacoModelProvider {
  private schemaUriCache = new Map<any, Map<string, Uri>>()
  public getModelUriForEntityType({ schemaName, jsonSchema }: { schemaName: string; jsonSchema: any }) {
    const nameUriCache = this.schemaUriCache.get(jsonSchema) || new Map<string, Uri>()

    if (!this.schemaUriCache.has(jsonSchema)) {
      this.schemaUriCache.set(jsonSchema, nameUriCache)
    }

    if (nameUriCache.has(schemaName)) {
      return nameUriCache.get(schemaName) as Uri
    }

    const schemaUriString = `furystack://json-tools/model-schemas-${schemaName}.json`
    const modelUri = Uri.parse(schemaUriString)
    languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [
        ...(languages.json.jsonDefaults.diagnosticsOptions.schemas || []),
        {
          uri: schemaUriString,
          fileMatch: [modelUri.toString()],
          schema: { ...jsonSchema },
        },
      ],
    })
    nameUriCache.set(schemaName, modelUri)
    return modelUri
  }
}
