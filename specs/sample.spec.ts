import test, { expect } from "@playwright/test";

test.describe("Sample Video Suite", () => {
  test("Sample Video Test", async ({ page }) => {
    await page.goto("https://webcamtests.com/check");
    if (await page.locator(".fc-cta-consent").isVisible({ timeout: 10000 })) {
      await page.locator(".fc-cta-consent").click();
    }
    await page.locator("button#webcam-launcher").click({ timeout: 10000 });
    await page.waitForTimeout(5000);
    await page
      .locator("button[data-action='stopWebcam']")
      .click({ timeout: 10000 });
    const text = await page
      .locator("li.notice-injected.notice-info")
      .innerText();
    const secondsString = text.split("The duration of video playback:")[1];
    const seconds = parseFloat(secondsString.split("s")[0]);
    expect(seconds).toBeGreaterThan(0);
  });
});
