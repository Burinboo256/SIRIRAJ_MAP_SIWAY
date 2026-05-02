import { expect, test } from "@playwright/test";

test("home to search to place detail flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("สวัสดี");
  await page.getByPlaceholder("ค้นหาสถานที่ที่ต้องการ").fill("OPD");
  await page.getByRole("button", { name: "นำทาง" }).first().click();
  await expect(page).toHaveURL(/\/search\/?\?q=OPD/);
  await page.getByRole("link", { name: "ดูรายละเอียด" }).first().click();
  await expect(page).toHaveURL(/\/place\/p-opd/);
});
