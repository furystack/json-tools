import { CollectionService } from '@furystack/shades-common-components'
import { ObservableValue } from '@furystack/utils'
import type { TranslationFileEntry } from './translation-file-entry.js'

export class I18NOverviewService<TLocales extends string, TNamespace extends string, TKeys extends string>
  implements Disposable
{
  public readonly locales: TLocales[]
  public readonly namespaces: TNamespace[]

  public currentNamespace: ObservableValue<TNamespace>

  public currentLocales: ObservableValue<TLocales[]>

  public readonly keys: TKeys[]

  public readonly collectionService = new CollectionService<Record<string, string>>()

  constructor(public readonly files: TranslationFileEntry[]) {
    this.locales = Array.from(new Set(files.map((file) => file.locale)) as unknown as Set<TLocales>)

    this.currentLocales = new ObservableValue<TLocales[]>(this.locales)

    this.namespaces = Array.from(new Set(files.map((file) => file.namespace)) as unknown as Set<TNamespace>)
    this.currentNamespace = new ObservableValue<TNamespace>(this.namespaces[0])
    this.keys = Array.from(new Set(files.flatMap((file) => Object.keys(file.getValues())) as unknown as Set<TKeys>))
  }

  public getValuesFromNamepsaceForLocales(): Array<Record<TLocales, Record<TKeys, string | undefined>>> {
    const locales = this.currentLocales.getValue()
    const filteredFiles = this.files.filter(
      (file) => this.locales.includes(file.locale as TLocales) && file.namespace === this.currentNamespace.getValue(),
    )

    const filteredKeys = filteredFiles.flatMap((file) => Object.keys(file.getValues())) as TKeys[]

    const dataEntries = filteredKeys.map((key) => {
      const entries = locales.map((locale) => {
        const value = filteredFiles.find((file) => file.locale === locale)?.getValues()[key]
        return [locale, value]
      })

      return Object.fromEntries(entries) as Record<TLocales, Record<TKeys, string | undefined>>
    })

    this.collectionService.data.setValue({
      count: dataEntries.length,
      entries: dataEntries as Array<Record<string, string>>,
    })

    return dataEntries
  }

  public [Symbol.dispose](): void {
    this.currentNamespace[Symbol.dispose]()
    this.collectionService[Symbol.dispose]()
  }
}
