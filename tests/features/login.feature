Feature: Inicio de sesión
  Como usuario registrado en Hadassa
  Quiero iniciar sesión en la plataforma
  Para acceder al dashboard y gestionar mis donaciones

  Background:
    Given que estoy en la página de login

  Scenario: Formulario de login vacío
    Then veo el formulario de inicio de sesión
    And veo el campo de correo electrónico
    And veo el campo de contraseña

  Scenario: Validación de campos obligatorios
    When intento iniciar sesión sin completar los campos
    Then veo el mensaje "El correo electrónico es requerido"
    And veo el mensaje "La contraseña es requerida"

  Scenario: Validación de formato de email
    When ingreso "email-invalido" en el campo email
    And ingreso "12345" en el campo contraseña
    And intento iniciar sesión
    Then veo el mensaje "El correo electrónico no es válido"
    And veo el mensaje "La contraseña debe tener al menos 6 caracteres"

  Scenario: Inicio de sesión exitoso
    When ingreso "admin@hadassa.com" en el campo email
    And ingreso "123456" en el campo contraseña
    And intento iniciar sesión
    Then soy redirigido al dashboard

  Scenario: Credenciales inválidas
    When ingreso "user@hadassa.com" en el campo email
    And ingreso "wrongpassword" en el campo contraseña
    And intento iniciar sesión
    Then veo el mensaje "Invalid credentials"
