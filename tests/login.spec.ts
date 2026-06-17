import { test, expect } from '@playwright/test';

const SCREENSHOT_DIR = 'tests/screenshots';

async function submitForm(page: any) {
  await page.evaluate(() => {
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  });
}

test.describe('Login Page - Pruebas E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(/\/auth\/login/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          accessToken: 'fake-jwt-token',
          tokenType: 'Bearer',
          expiresIn: '3600',
          user: {
            id: '1',
            email: 'test@hadassa.com',
            name: 'Test User',
            role: 'USER',
          },
        }),
      });
    });
  });

  test('01 - Muestra el formulario de login vacío', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Bienvenido de nuevo')).toBeVisible();
    await expect(page.getByText('Inicia sesión para continuar ayudando')).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/01-formulario-vacio.png`, fullPage: true });
  });

  test('02 - Muestra errores de validación al enviar vacío', async ({ page }) => {
    await page.goto('/login');
    await submitForm(page);
    await expect(page.getByText('El correo electrónico es requerido')).toBeVisible();
    await expect(page.getByText('La contraseña es requerida')).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/02-errores-validacion.png`, fullPage: true });
  });

  test('03 - Muestra error de email inválido', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#email').fill('email-invalido');
    await page.locator('#password').fill('12345');
    await submitForm(page);
    await expect(page.getByText('El correo electrónico no es válido')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('La contraseña debe tener al menos 6 caracteres')).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/03-email-invalido.png`, fullPage: true });
  });

  test('04 - Login exitoso redirige al dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#email').fill('admin@hadassa.com');
    await page.locator('#password').fill('password123');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/04-formulario-relleno.png`, fullPage: true });
    await submitForm(page);
    await expect(page).toHaveURL('/dashboard');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/05-dashboard.png`, fullPage: true });
  });

  test('05 - Muestra error del servidor en login fallido', async ({ page }) => {
    await page.unroute(/\/auth\/login/);
    await page.route(/\/auth\/login/, async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Credenciales inválidas' }),
      });
    });
    await page.goto('/login');
    await page.locator('#email').fill('user@hadassa.com');
    await page.locator('#password').fill('wrongpassword');
    await submitForm(page);
    await expect(page.getByText('Credenciales inválidas')).toBeVisible();
    await page.screenshot({ path: `${SCREENSHOT_DIR}/06-error-servidor.png`, fullPage: true });
  });
});
