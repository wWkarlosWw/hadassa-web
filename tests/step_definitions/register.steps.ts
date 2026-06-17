import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "../support/common";

Given("que estoy en la página de registro", async function () {
  const page = getPage();
  await page.goto("/login");
  await page.locator("text=Regístrate aquí").click();
});

Then("veo el formulario de registro", async function () {
  await expect(getPage().locator("text=Únete a nosotros")).toBeVisible();
});

Then("veo el campo de nombre completo", async function () {
  await expect(getPage().locator("#name")).toBeVisible();
});

Then("veo el campo de teléfono", async function () {
  await expect(getPage().locator("#phone")).toBeVisible();
});

Then("veo el campo de confirmar contraseña", async function () {
  await expect(getPage().locator("#confirmPassword")).toBeVisible();
});

When("intento registrarme sin completar los campos", async function () {
  await getPage().locator("form").dispatchEvent("submit");
});

When("ingreso {string} en el campo nombre", async function (nombre: string) {
  await getPage().locator("#name").fill(nombre);
});

When("ingreso {string} en el campo confirmar contraseña", async function (password: string) {
  await getPage().locator("#confirmPassword").fill(password);
});

When("completo los demás campos obligatorios", async function () {
  const page = getPage();
  await page.locator("#email").fill("test@hadassa.com");
  await page.locator("#phone").fill("+591 12345678");
  await page.locator("#password").fill("password123");
  await page.locator("#confirmPassword").fill("password123");
});

When("completo todos los campos con datos válidos", async function () {
  const page = getPage();
  await page.locator("#name").fill("Juan Pérez");
  await page.locator("#email").fill("juan@hadassa.com");
  await page.locator("#phone").fill("+591 12345678");
  await page.locator("#password").fill("password123");
  await page.locator("#confirmPassword").fill("password123");
});

When("acepto los términos y condiciones", async function () {
  await getPage().locator('input[type="checkbox"]').check();
});

When("intento registrarme", async function () {
  await getPage().locator("form").dispatchEvent("submit");
});

When("intento registrarme sin aceptar términos", async function () {
  await getPage().locator("form").dispatchEvent("submit");
});

Given("la API de registro responde exitosamente", async function () {
  const page = getPage();
  await page.route(/\/auth\/register/, async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        accessToken: "fake-jwt-token",
        tokenType: "Bearer",
        expiresIn: "3600",
        user: {
          id: "2",
          email: "juan@hadassa.com",
          name: "Juan Pérez",
          role: "USER",
        },
      }),
    });
  });
});

Given("la API de registro responde con error 409", async function () {
  const page = getPage();
  await page.route(/\/auth\/register/, async (route) => {
    await route.fulfill({
      status: 409,
      contentType: "application/json",
      body: JSON.stringify({ message: "El correo electrónico ya está registrado" }),
    });
  });
});
