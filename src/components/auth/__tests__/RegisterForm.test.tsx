import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../RegisterForm";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("RegisterForm", () => {
  const onRegister = vi.fn();
  const onSwitchToLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el título y todos los campos del formulario", () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    expect(screen.getByText("Únete a nosotros")).toBeDefined();
    expect(screen.getByLabelText("Nombre Completo")).toBeDefined();
    expect(screen.getByLabelText("Correo Electrónico")).toBeDefined();
    expect(screen.getByLabelText("Teléfono")).toBeDefined();
    expect(screen.getByLabelText("Contraseña")).toBeDefined();
    expect(screen.getByLabelText("Confirmar Contraseña")).toBeDefined();
    expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeDefined();
  });

  it("muestra validaciones al enviar formulario vacío", async () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeDefined();
      expect(screen.getByText("El correo electrónico es requerido")).toBeDefined();
      expect(screen.getByText("El teléfono es requerido")).toBeDefined();
      expect(screen.getByText("La contraseña es requerida")).toBeDefined();
      expect(screen.getByText("Debes confirmar tu contraseña")).toBeDefined();
      expect(screen.getByText("Debes aceptar los términos y condiciones")).toBeDefined();
    });

    expect(onRegister).not.toHaveBeenCalled();
  });

  it("muestra error para nombre muy corto", async () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Jo");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "test@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El nombre debe tener al menos 3 caracteres")).toBeDefined();
    });
  });

  it("muestra error para email inválido", async () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "email-mal");
    await userEvent.type(screen.getByLabelText("Teléfono"), "12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El correo electrónico no es válido")).toBeDefined();
    });
  });

  it("muestra error cuando las contraseñas no coinciden", async () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "juan@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password456");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Las contraseñas no coinciden")).toBeDefined();
    });
  });

  it("llama a onRegister y navega al dashboard en registro exitoso", async () => {
    onRegister.mockResolvedValue({ success: true });

    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "juan@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "+591 12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(onRegister).toHaveBeenCalledWith(
        "Juan Pérez",
        "juan@hadassa.com",
        "+591 12345678",
        "password123"
      );
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("muestra error del servidor cuando el registro falla", async () => {
    onRegister.mockResolvedValue({
      success: false,
      error: "El correo electrónico ya está registrado",
    });

    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "existente@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "+591 12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El correo electrónico ya está registrado")).toBeDefined();
    });
  });

  it("muestra error genérico cuando no hay mensaje", async () => {
    onRegister.mockResolvedValue({ success: false });

    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "juan@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "+591 12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("Error al registrarse")).toBeDefined();
    });
  });

  it("limpia errores de campo al escribir", async () => {
    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      expect(screen.getByText("El nombre es requerido")).toBeDefined();
    });

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");

    await waitFor(() => {
      expect(screen.queryByText("El nombre es requerido")).toBeNull();
    });
  });

  it("deshabilita el botón mientras carga", async () => {
    onRegister.mockImplementation(() => new Promise(() => {}));

    render(
      <RegisterForm
        onRegister={onRegister}
        onSwitchToLogin={onSwitchToLogin}
      />
    );

    await userEvent.type(screen.getByLabelText("Nombre Completo"), "Juan Pérez");
    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "juan@hadassa.com");
    await userEvent.type(screen.getByLabelText("Teléfono"), "+591 12345678");
    await userEvent.type(screen.getByLabelText("Contraseña"), "password123");
    await userEvent.type(screen.getByLabelText("Confirmar Contraseña"), "password123");
    await userEvent.click(screen.getByRole("checkbox"));

    fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

    await waitFor(() => {
      const btn = screen.getByRole("button", { name: /cargando/i });
      expect(btn).toBeDefined();
    });
  });
});
