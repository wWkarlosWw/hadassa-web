import { When, Then } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { getDriver, waitForText } from "../support/common";

Then("veo el formulario de registro", async function () {
  await waitForText("Únete a nosotros");
});

Then("veo el campo de nombre completo", async function () {
  const el = await getDriver().findElement(By.id("name"));
  if (!(await el.isDisplayed())) throw new Error("Name field not visible");
});

Then("veo el campo de teléfono", async function () {
  const el = await getDriver().findElement(By.id("phone"));
  if (!(await el.isDisplayed())) throw new Error("Phone field not visible");
});

Then("veo el campo de confirmar contraseña", async function () {
  const el = await getDriver().findElement(By.id("confirmPassword"));
  if (!(await el.isDisplayed())) throw new Error("Confirm password field not visible");
});

When("intento registrarme sin completar los campos", async function () {
  await getDriver().findElement(By.css("button[type='submit']")).click();
});

When("ingreso {string} en el campo nombre", async function (nombre: string) {
  const input = await getDriver().findElement(By.id("name"));
  await input.clear();
  await input.sendKeys(nombre);
});

When("ingreso {string} en el campo confirmar contraseña", async function (password: string) {
  const input = await getDriver().findElement(By.id("confirmPassword"));
  await input.clear();
  await input.sendKeys(password);
});

When("completo los demás campos obligatorios", async function () {
  const d = getDriver();
  await d.findElement(By.id("email")).sendKeys("test@hadassa.com");
  await d.findElement(By.id("phone")).sendKeys("+591 12345678");
  await d.findElement(By.id("password")).sendKeys("password123");
  await d.findElement(By.id("confirmPassword")).sendKeys("password123");
});

When("completo todos los campos con datos válidos", async function () {
  const d = getDriver();
  await d.findElement(By.id("name")).sendKeys("Juan Pérez");
  await d.findElement(By.id("email")).sendKeys("juan@hadassa.com");
  await d.findElement(By.id("phone")).sendKeys("+591 12345678");
  await d.findElement(By.id("password")).sendKeys("password123");
  await d.findElement(By.id("confirmPassword")).sendKeys("password123");
});

When("acepto los términos y condiciones", async function () {
  await getDriver().findElement(By.css("input[type='checkbox']")).click();
});

When("intento registrarme", async function () {
  await getDriver().findElement(By.css("button[type='submit']")).click();
});

When("intento registrarme sin aceptar términos", async function () {
  await getDriver().findElement(By.css("button[type='submit']")).click();
});

When("completo el registro con datos nuevos válidos", async function () {
  const d = getDriver();
  const timestamp = Date.now();
  await d.findElement(By.id("name")).sendKeys(`Test User ${timestamp}`);
  await d.findElement(By.id("email")).sendKeys(`test_${timestamp}@hadassa.com`);
  await d.findElement(By.id("phone")).sendKeys("+591 12345678");
  await d.findElement(By.id("password")).sendKeys("password123");
  await d.findElement(By.id("confirmPassword")).sendKeys("password123");
});

When("completo el registro con un correo existente", async function () {
  const d = getDriver();
  await d.findElement(By.id("name")).sendKeys("Admin Hadassa");
  await d.findElement(By.id("email")).sendKeys("admin@hadassa.com");
  await d.findElement(By.id("phone")).sendKeys("+591 12345678");
  await d.findElement(By.id("password")).sendKeys("password123");
  await d.findElement(By.id("confirmPassword")).sendKeys("password123");
});
