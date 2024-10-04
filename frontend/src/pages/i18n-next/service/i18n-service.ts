import { Injectable } from '@furystack/inject'
import { EventHub } from '@furystack/utils'
import { match } from 'path-to-regexp'
import { TranslationFileEntry } from './translation-file-entry.js'

const PATH_SEPARATOR = '/'

type ReadFromRootOptions = {
  /**
   * The JSON files that should be included in the import
   * Tokens can be: locale (e.g.: en, de, fr), namespace (e.g.: common, home, about)
   * @example: /:locale/:namespace.json
   */
  include: string
}

type ReadTranslationFilesOptions = ReadFromRootOptions & {
  /**
   * The relative path to the directory root
   */
  relativePath: string

  /**
   * The root entry to read
   */
  rootEntry: FileSystemDirectoryHandle
}

@Injectable({ lifetime: 'singleton' })
export class I18NService extends EventHub<{
  onFailedToReadFile: { relativePath: string; name: string; error: unknown }
}> {
  public async readTranslationFiles(options: ReadTranslationFilesOptions): Promise<TranslationFileEntry[]> {
    const matchFn = match(options.include)

    const entries = options.rootEntry.entries()

    const translationFileEntries: TranslationFileEntry[] = []

    for await (const [entryName, entry] of entries) {
      if (entry.kind === 'file') {
        const matchResult = matchFn(options.relativePath + PATH_SEPARATOR + entryName)
        if (!matchResult) {
          continue
        }
        const { locale, namespace } = matchResult.params
        if (!locale || !namespace) {
          continue
        }
        try {
          const file = await entry.getFile()
          const fileText = await file.arrayBuffer().then((buffer) => new TextDecoder().decode(buffer))
          const values = JSON.parse(fileText) as Record<string, string>

          translationFileEntries.push(
            new TranslationFileEntry(entry, locale as string, namespace as string, options.relativePath, values),
          )
        } catch (error) {
          this.emit('onFailedToReadFile', { relativePath: options.relativePath, name: entryName, error })
        }
      } else {
        const subEntries = await this.readTranslationFiles({
          ...options,
          rootEntry: entry,
          relativePath: `${options.relativePath}${PATH_SEPARATOR}${entryName}`,
        })
        translationFileEntries.push(...subEntries)
      }
    }

    return translationFileEntries
  }

  public async readFromRoot(options: ReadFromRootOptions) {
    const directoryRoot = await window.showDirectoryPicker()
    return await this.readTranslationFiles({
      ...options,
      rootEntry: directoryRoot,
      relativePath: '',
    })
  }
}
