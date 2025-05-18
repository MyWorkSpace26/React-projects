import Cookies from "js-cookie";

const API_URL = "https://reqres.in/api";

export async function registerUser(email, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  const data = await response.json();

  // Store token in cookie
  if (data.token) {
    Cookies.set("auth_token", data.token, {
      expires: 1, // 1 day
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }

  return data;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // Store token in cookie
  if (data.token) {
    Cookies.set("auth_token", data.token, {
      expires: 1, // 1 day
      path: "/",
      secure: true,
      sameSite: "strict",
    });
  }

  return data;
}

export function logout() {
  Cookies.remove("auth_token", { path: "/" });
}

export function getAuthToken() {
  return Cookies.get("auth_token");
}
