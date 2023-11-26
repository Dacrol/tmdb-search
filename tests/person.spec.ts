import { test, expect } from '@playwright/test';

test('should have a name and image', async ({ page }) => {
  await page.goto('http://localhost:3000/person/1892');
  await page.waitForSelector('h2:has-text("Biography")');
  expect(await page.innerText('#person-name')).toBe('Matt Damon');
  expect(await page.getAttribute('img.profile', 'src')).toBeTruthy();
});
