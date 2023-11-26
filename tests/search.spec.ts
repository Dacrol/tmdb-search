import { test, expect } from '@playwright/test';

test('page should render', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('TMDB Search');
});
