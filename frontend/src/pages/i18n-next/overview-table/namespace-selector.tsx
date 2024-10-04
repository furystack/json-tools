import { createComponent, Shade } from '@furystack/shades'
import type { I18NOverviewService } from '../service/i18n-overview-service.js'

export const NamespaceSelector = Shade<{
  overviewService: I18NOverviewService<any, any, any>
}>({
  shadowDomName: 'shade-namespace-selector',
  render: ({ props, useObservable }) => {
    const [currentNamespace, setCurrentNamespace] = useObservable(
      'currentNamespace',
      props.overviewService.currentNamespace,
    )

    return (
      <select
        title="Filter by namespace"
        onchange={(ev) => {
          const target = ev.target as HTMLSelectElement
          setCurrentNamespace(target.value)
        }}
      >
        {props.overviewService.namespaces.map((ns) => (
          <option value={ns} selected={currentNamespace === ns}>
            {ns}
          </option>
        ))}
      </select>
    )
  },
})
