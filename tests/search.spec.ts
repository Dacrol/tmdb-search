import { test, expect } from '@playwright/test';

test('page should render', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle('TMDB Search');
});

test('search should return results', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#search', 'oppenheimer');
  await page.waitForSelector('div.result-card');
  const cards = await page.$$('div.result-card');
  expect(cards.length).toBeGreaterThan(3);
});
