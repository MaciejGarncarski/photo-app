import test from '@playwright/test'

test.beforeEach(async ({ page }) => {
	await page.goto('/')
	await page.goto('/auth/sign-in')

	await page
		.getByRole('button', { name: 'continue without an account' })
		.click()

	await page.waitForTimeout(200)
	await page.goto('/create-post')
})

test('file chooser works', async ({ page }) => {
	// const fileChooserPromise = page.waitForEvent('filechooser')
	await page.getByRole('button', { name: 'Select file from device' }).click()
	// const fileChooser = await fileChooserPromise
})
