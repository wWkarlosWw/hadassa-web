import { BeforeAll, AfterAll, Before, Given, Then } from "@cucumber/cucumber";
import { Builder, By, until, WebDriver } from "selenium-webdriver";

let driver: WebDriver;

BeforeAll(async function () {
  driver = await new Builder().forBrowser("chrome").build();
});

AfterAll(async function () {
  if (driver) {
    await driver.quit();
  }
});

Before(async function () {
  await driver.manage().deleteAllCookies();
  await driver.executeScript("localStorage.clear();");
});

export function getDriver(): WebDriver {
  if (!driver) throw new Error("Driver not initialized");
  return driver;
}

export async function waitForText(text: string, timeout = 5000): Promise<void> {
  await driver.wait(
    until.elementLocated(By.xpath(`//*[contains(text(), '${text}')]`)),
    timeout
  );
}

export async function isTextVisible(text: string): Promise<boolean> {
  try {
    const elements = await driver.findElements(By.xpath(`//*[contains(text(), '${text}')]`));
    for (const el of elements) {
      if (await el.isDisplayed()) return true;
    }
    return false;
  } catch {
    return false;
  }
}

Given("que estoy en la página de login", async function () {
  await driver.get("http://localhost:5173/login");
  await waitForText("Bienvenido de nuevo");
});

Given("que estoy en la página de registro", async function () {
  await driver.get("http://localhost:5173/login");
  await waitForText("Bienvenido de nuevo");
  await driver.findElement(By.xpath("//*[contains(text(), 'Regístrate aquí')]")).click();
  await waitForText("Únete a nosotros");
});

Then("veo el mensaje {string}", async function (mensaje: string) {
  await waitForText(mensaje);
});

Then("soy redirigido al dashboard", async function () {
  await driver.wait(until.urlContains("/dashboard"), 5000);
});
