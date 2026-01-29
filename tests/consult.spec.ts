import { test, expect } from '@playwright/test';

test('consult flow basic', async ({ page }) => {
  await page.goto('/consult');
  await expect(page.getByText('対話型相談フロー')).toBeVisible();
  await page.getByText('体調・症状のこと').click();
  await page.getByText('緊急性はありますか？').waitFor();
});
