import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { getPage } from "../support/common";

Given("la API de login responde exitosamente", async function () {
  const page = getPage();
  await page.route(/\/auth\/login/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        accessToken: "fake-jwt-token",
        tokenType: "Bearer",
        expiresIn: "3600",
        user: {
          id: "1",
          email: "admin@hadassa.com",
          name: "Admin User",
          role: "USER",
        },
      }),
    });
  });
});

Given("la API de login responde con error 401", async function () {
  const page = getPage();
  await page.route(/\/auth\/login/, async (route) => {
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ message: "Credenciales inválidas" }),
    });
  });
});

Given("la API de login responde con error 500", async function () {
  const page = getPage();
  await page.route(/\/auth\/login/, async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Error interno del servidor" }),
    });
  });
});

Then("veo el formulario de inicio de sesión", async function () {
  await expect(getPage().locator("text=Bienvenido de nuevo")).toBeVisible();
});

Then("veo el campo de correo electrónico", async function () {
  await expect(getPage().locator("#email")).toBeVisible();
});

Then("veo el campo de contraseña", async function () {
  await expect(getPage().locator("#password")).toBeVisible();
});

When("intento iniciar sesión sin completar los campos", async function () {
  await getPage().locator("form").dispatchEvent("submit");
});

When("ingreso {string} en el campo email", async function (valor: string) {
  await getPage().locator("#email").fill(valor);
});

When("ingreso {string} en el campo contraseña", async function (valor: string) {
  await getPage().locator("#password").fill(valor);
});

When("intento iniciar sesión", async function () {
  await getPage().locator("form").dispatchEvent("submit");
});

Then("veo el mensaje de error {string}", async function (mensaje: string) {
  await expect(getPage().locator(`text=${mensaje}`)).toBeVisible();
});
