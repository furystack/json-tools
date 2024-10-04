import { createComponent, Shade } from '@furystack/shades'
import { I18NImportForm } from './i18n-import-form.js'
import { OverviewTable } from './overview-table/index.js'
import type { TranslationFileEntry } from './service/translation-file-entry.js'

export const I18NPage = Shade({
  shadowDomName: 'shade-i18n-page',
  render: ({ useState }) => {
    const [translationFiles, setTranslationFiles] = useState<TranslationFileEntry[]>('translationFiles', [])

    if (!translationFiles?.length) {
      return (
        <I18NImportForm
          onTranslationFilesLoaded={(files) => {
            setTranslationFiles(files)
          }}
        />
      )
    }

    return <OverviewTable files={translationFiles} />
  },
})
