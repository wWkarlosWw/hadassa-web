import { Before, BeforeAll, AfterAll, Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { chromium, Browser, Page } from "playwright";

let browser: Browser | null = null;
let page: Page | null = null;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});

Before(async function () {
  if (browser) {
    const context = await browser.newContext({
      baseURL: "http://localhost:5173",
    });
    page = await context.newPage();
  }
});

export function getPage(): Page {
  if (!page) throw new Error("Page not initialized");
  return page;
}

Given("que estoy en la página de login", async function () {
  await getPage().goto("/login");
});

Then("veo el mensaje {string}", async function (mensaje: string) {
  await expect(getPage().locator(`text=${mensaje}`)).toBeVisible();
});

Then("soy redirigido al dashboard", async function () {
  await expect(getPage()).toHaveURL(/\/dashboard/);
});

Then("veo un mensaje de error del servidor", async function () {
  await expect(getPage().locator("text=Error interno del servidor")).toBeVisible();
});
