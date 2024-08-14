import { Shade, createComponent } from '@furystack/shades'
import { Button, NotyService } from '@furystack/shades-common-components'

export const ShareButton = Shade({
  shadowDomName: 'shade-share-button',
  render: ({ injector }) => {
    return (
      <Button
        title="Copy a shareable URL to the clipboard"
        variant="outlined"
        onclick={() => {
          const url = new URL(location.href)
          navigator.clipboard.writeText(url.href)
          injector.getInstance(NotyService).emit('onNotyAdded', {
            type: 'success',
            title: 'Copied to clipboard',
            body: (
              <>
                A shareable URL has been copied to the clipboard.{' '}
                <a href={url.href} target="_blank">
                  Click here
                </a>{' '}
                to open it in a new window.
              </>
            ),
          })
        }}
      >
        <i
          style={{
            fontSize: 'inherit',
            marginRight: '8px',
          }}
          className="material-symbols-outlined"
        >
          share
        </i>
        Share
      </Button>
    )
  },
})
