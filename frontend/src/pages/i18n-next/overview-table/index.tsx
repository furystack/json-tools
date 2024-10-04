import type { FindOptions } from '@furystack/core'
import { createComponent, Shade } from '@furystack/shades'
import { Button, DataGrid, Paper } from '@furystack/shades-common-components'
import { ObservableValue } from '@furystack/utils'
import { I18NOverviewService } from '../service/i18n-overview-service.js'
import type { TranslationFileEntry } from '../service/translation-file-entry.js'
import { NamespaceSelector } from './namespace-selector.js'

export const OverviewTable = Shade<{ files: TranslationFileEntry[] }>({
  shadowDomName: 'i18n-overview-table',
  render: ({ props, useDisposable }) => {
    const overviewService = useDisposable('CollectionService', () => new I18NOverviewService(props.files))
    const findOptions = useDisposable(
      'FindOptions',
      () => new ObservableValue<FindOptions<Record<string, string>, string[]>>({}),
    )

    return (
      <Paper
        style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', width: '80%', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: '1' }} />
          <NamespaceSelector overviewService={overviewService} />
          <Button>Languages</Button>
        </div>
        <div style={{ height: '100%' }}>
          <DataGrid<Record<string, string>, string>
            collectionService={overviewService.collectionService}
            columns={['en', 'de', 'hu'] /** locales */}
            styles={{}}
            headerComponents={{}}
            rowComponents={{}}
            findOptions={findOptions}
          />
        </div>
      </Paper>
    )
  },
})
