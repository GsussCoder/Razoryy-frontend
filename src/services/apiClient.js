/**
 * Cliente HTTP centralizado para todas las llamadas a la API.
 * Agrega automáticamente el header Authorization: Bearer <token> desde sessionStorage.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

async function request(endpoint, options = {}, isFormData) {
  const token = sessionStorage.getItem("authToken");

  const headers = {
    ...options.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json"
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (
    config.body &&
    typeof config.body === "object" &&
    !(config.body instanceof FormData)
  ) {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return await response.text();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export const apiClient = {
  get: (endpoint) => request(endpoint, { method: "GET" }),
  post: (endpoint, body, isFormData) => request(endpoint, { method: "POST", body }, isFormData),
  patch: (endpoint, body) => request(endpoint, { method: "PATCH", body }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
