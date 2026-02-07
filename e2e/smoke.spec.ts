import { expect, test } from '@playwright/test';

test.describe('personal website smoke flows', () => {
  test('home page loads with projects section', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
  });

  test('projects page renders heading and list/fallback content', async ({ page }) => {
    await page.goto('/projects');

    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();
    await expect(
      page.getByText('No projects published yet.').or(page.locator('a[href^="/projects/"]'))
    ).toBeVisible();
  });

  test('unknown project slug renders not-found page', async ({ page }) => {
    const response = await page.goto('/projects/__missing_project__');

    expect(response?.status()).toBe(404);
    await expect(page.getByText(/not found|404/i)).toBeVisible();
  });

  test('skip link is keyboard reachable on home page', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeVisible();
  });

  test('draft mode enable endpoint rejects invalid request without secret', async ({ request }) => {
    const response = await request.get('/api/draft-mode/enable');

    expect(response.status()).toBe(401);
  });

  test('studio route is reachable', async ({ request }) => {
    const response = await request.get('/studio');

    expect(response.ok()).toBeTruthy();
  });
});
