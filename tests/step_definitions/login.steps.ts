import { When, Then } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { getDriver, waitForText } from "../support/common";

When("ingreso {string} en el campo email", async function (valor: string) {
  const input = await getDriver().findElement(By.id("email"));
  await input.clear();
  await input.sendKeys(valor);
});

When("ingreso {string} en el campo contraseña", async function (valor: string) {
  const input = await getDriver().findElement(By.id("password"));
  await input.clear();
  await input.sendKeys(valor);
});

When("intento iniciar sesión", async function () {
  await getDriver().findElement(By.css("button[type='submit']")).click();
});

When("intento iniciar sesión sin completar los campos", async function () {
  await getDriver().findElement(By.css("button[type='submit']")).click();
});

Then("veo el formulario de inicio de sesión", async function () {
  await waitForText("Bienvenido de nuevo");
});

Then("veo el campo de correo electrónico", async function () {
  const el = await getDriver().findElement(By.id("email"));
  if (!(await el.isDisplayed())) throw new Error("Email field not visible");
});

Then("veo el campo de contraseña", async function () {
  const el = await getDriver().findElement(By.id("password"));
  if (!(await el.isDisplayed())) throw new Error("Password field not visible");
});

Then("veo el mensaje de error {string}", async function (mensaje: string) {
  await waitForText(mensaje);
});
