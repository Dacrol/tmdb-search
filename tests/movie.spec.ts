import { test, expect } from '@playwright/test';

test('should have a title and image', async ({ page }) => {
  await page.goto('http://localhost:3000/movie/872585');
  await page.waitForSelector('h2:has-text("Cast")');
  expect(await page.innerText('#movie-title')).toBe('Oppenheimer');
  expect(await page.getAttribute('img.poster', 'src')).toBeTruthy();
});
