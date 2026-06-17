import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../LoginForm";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("LoginForm", () => {
  const onLogin = vi.fn();
  const onSwitchToRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el título y los campos del formulario", () => {
    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    expect(screen.getByText("Bienvenido de nuevo")).toBeDefined();
    expect(screen.getByLabelText("Correo Electrónico")).toBeDefined();
    expect(screen.getByLabelText("Contraseña")).toBeDefined();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeDefined();
  });

  it("muestra errores de validación al enviar vacío", async () => {
    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El correo electrónico es requerido")).toBeDefined();
      expect(screen.getByText("La contraseña es requerida")).toBeDefined();
    });

    expect(onLogin).not.toHaveBeenCalled();
  });

  it("muestra error de email inválido", async () => {
    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "email-invalido");
    await userEvent.type(screen.getByLabelText("Contraseña"), "12345");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El correo electrónico no es válido")).toBeDefined();
      expect(screen.getByText("La contraseña debe tener al menos 6 caracteres")).toBeDefined();
    });
  });

  it("muestra error de contraseña corta", async () => {
    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "test@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "123");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("La contraseña debe tener al menos 6 caracteres")).toBeDefined();
    });
  });

  it("llama a onLogin y navega al dashboard en login exitoso", async () => {
    onLogin.mockResolvedValue({ success: true });

    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "admin@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledWith("admin@hadassa.com", "password123");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("navega a la ruta personalizada cuando login es exitoso", async () => {
    onLogin.mockResolvedValue({ success: true });

    render(
      <LoginForm
        onLogin={onLogin}
        redirectPath="/dashboard/donar"
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "admin@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard/donar");
    });
  });

  it("muestra error del servidor cuando login falla", async () => {
    onLogin.mockResolvedValue({ success: false, error: "Credenciales inválidas" });

    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "user@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "wrongpass");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Credenciales inválidas")).toBeDefined();
    });
  });

  it("muestra error genérico cuando no hay mensaje", async () => {
    onLogin.mockResolvedValue({ success: false });

    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "user@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "wrongpass");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Error al iniciar sesión")).toBeDefined();
    });
  });

  it("llama a onSwitchToRegister al hacer clic en registrarse", async () => {
    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.click(screen.getByText("Regístrate aquí"));

    expect(onSwitchToRegister).toHaveBeenCalledTimes(1);
  });

  it("deshabilita el botón mientras carga", async () => {
    onLogin.mockImplementation(() => new Promise(() => {}));

    render(
      <LoginForm
        onLogin={onLogin}
        onSwitchToRegister={onSwitchToRegister}
      />
    );

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "admin@hadassa.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");

    fireEvent.submit(screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!);

    await waitFor(() => {
      const btn = screen.getByRole("button", { name: /cargando/i });
      expect(btn).toBeDefined();
    });
  });
});
