import { expect, test } from '@playwright/test'

test.describe('JSON-Tools Application', () => {
  test('Home page', async ({ page }) => {
    await page.goto('/')

    const title = page.locator('shade-app-bar')
    await page.hover('shade-app-bar')
    await expect(title).toHaveScreenshot('title.png')

    const home = page.locator('shade-home')
    await expect(home).toHaveScreenshot('home-content.png')
  })
})
