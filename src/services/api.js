import { HIERARCHICAL_DATA } from "../mocks/hierarchicalData.js";

const API_CONFIG = {
  baseDelay: 800,
  errorRate: 0,
};
const simulateDelay = (ms = API_CONFIG.baseDelay) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const shouldSimulateError = () => {
  return Math.random() < API_CONFIG.errorRate;
};

const successResponse = (data) => ({
  success: true,
  data,
  error: null,
});
const errorResponse = (message, code = "API_ERROR") => ({
  success: false,
  data: null,
  error: {
    message,
    code,
  },
});

/**
 * Obtiene todos los datos jerárquicos (países, ciudades, oficinas)
 * @returns {Promise} Datos jerárquicos completos
 */
export const fetchHierarchicalData = async () => {
  await simulateDelay();

  if (shouldSimulateError()) {
    throw errorResponse(
      "Error al cargar los datos. Por favor, intenta nuevamente.",
      "FETCH_ERROR",
    );
  }

  return successResponse(HIERARCHICAL_DATA);
};

/**
 * Simula login de usuario
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise} Token de autenticación
 */
export const loginUser = async (username, password) => {
  await simulateDelay(1000);

  if (shouldSimulateError()) {
    throw errorResponse(
      "Error de conexión con el servidor.",
      "CONNECTION_ERROR",
    );
  }

  if (username === "frontend@ikusi.com" && password === "ikusi123") {
    return successResponse({
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: 1,
        username: "admin",
        name: "Administrador",
        email: "admin@example.com",
      },
    });
  }

  throw errorResponse(
    "Usuario o contraseña incorrectos.",
    "INVALID_CREDENTIALS",
  );
};

/**
 * Simula logout de usuario
 * @returns {Promise} Confirmación
 */
export const logoutUser = async () => {
  await simulateDelay(500);

  if (shouldSimulateError()) {
    throw errorResponse("Error al cerrar sesión.", "LOGOUT_ERROR");
  }

  return successResponse({ message: "Sesión cerrada exitosamente" });
};
