Feature: Registro de usuario
  Como visitante de Hadassa
  Quiero registrarme en la plataforma
  Para crear mi cuenta y comenzar a donar

  Background:
    Given que estoy en la página de registro

  Scenario: Formulario de registro vacío
    Then veo el formulario de registro
    And veo el campo de nombre completo
    And veo el campo de correo electrónico
    And veo el campo de teléfono
    And veo el campo de contraseña
    And veo el campo de confirmar contraseña

  Scenario: Validación de campos obligatorios en registro
    When intento registrarme sin completar los campos
    Then veo el mensaje "El nombre es requerido"
    And veo el mensaje "El correo electrónico es requerido"
    And veo el mensaje "El teléfono es requerido"
    And veo el mensaje "La contraseña es requerida"
    And veo el mensaje "Debes confirmar tu contraseña"

  Scenario: Validación de nombre muy corto
    When ingreso "Jo" en el campo nombre
    And completo los demás campos obligatorios
    And acepto los términos y condiciones
    And intento registrarme
    Then veo el mensaje "El nombre debe tener al menos 3 caracteres"

  Scenario: Validación de formato de email en registro
    When ingreso "email-mal" en el campo email
    And completo los demás campos obligatorios
    And acepto los términos y condiciones
    And intento registrarme
    Then veo el mensaje "El correo electrónico no es válido"

  Scenario: Contraseñas no coinciden
    When ingreso "password123" en el campo contraseña
    And ingreso "password456" en el campo confirmar contraseña
    And completo los demás campos obligatorios
    And acepto los términos y condiciones
    And intento registrarme
    Then veo el mensaje "Las contraseñas no coinciden"

  Scenario: Términos y condiciones no aceptados
    When completo todos los campos con datos válidos
    And intento registrarme sin aceptar términos
    Then veo el mensaje "Debes aceptar los términos y condiciones"

  Scenario: Registro exitoso
    When completo el registro con datos nuevos válidos
    And acepto los términos y condiciones
    And intento registrarme
    Then soy redirigido al dashboard

  Scenario: Correo electrónico ya registrado
    When completo el registro con un correo existente
    And acepto los términos y condiciones
    And intento registrarme
    Then veo el mensaje "El usuario ya existe"
