import { createComponent, Shade } from '@furystack/shades'
import { Button, Form, Input, Paper, ThemeProviderService } from '@furystack/shades-common-components'
import { I18NService } from './service/i18n-service.js'
import type { TranslationFileEntry } from './service/translation-file-entry.js'

export const I18NImportForm = Shade<{ onTranslationFilesLoaded: (files: TranslationFileEntry[]) => void }>({
  shadowDomName: 'shade-i18n-import-form',
  render: ({ injector, props }) => {
    const { theme } = injector.getInstance(ThemeProviderService)
    const i18nService = injector.getInstance(I18NService)

    return (
      <Paper
        style={{
          position: 'fixed',
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.text.primary,
        }}
      >
        <Form
          validate={(data): data is { include: string } => {
            return 'include' in data && typeof (data as { include: unknown }).include === 'string'
          }}
          onSubmit={(data) => {
            i18nService
              .readFromRoot({
                include: data.include,
              })
              .then((entries) => {
                props.onTranslationFilesLoaded(entries)
              })
              .catch((error) => {
                console.error(error)
              })
          }}
        >
          <h1>i18n</h1>
          <Input
            name="include"
            required
            getHelperText={({ validationResult }) => {
              const defaultMessage = 'e.g.: "/:locale/:namespace.json" or "/packages/:namespace/src/i18n/:locale.json"'
              return validationResult?.isValid ? defaultMessage : validationResult?.message || defaultMessage
            }}
            getValidationResult={({ state }) => {
              if (!state.value?.length) {
                return { isValid: false, message: 'Please enter a value' }
              }
              if (!state.value.includes(':locale')) {
                return { isValid: false, message: 'The path must contain a :locale segment' }
              }
              return { isValid: true }
            }}
            value="/:locale/:namespace.json"
            placeholder="The input value glob"
          />
          <Button variant="outlined" type="submit">
            Import
          </Button>
        </Form>
      </Paper>
    )
  },
})
