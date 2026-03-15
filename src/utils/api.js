const BASE = import.meta.env.VITE_API_BASE_URL || "";

const getToken = () => localStorage.getItem("admin-token");

export const api = {
  get: (path) =>
    fetch(`${BASE}${path}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((r) => r.json()),

  post: (path, body) =>
    fetch(`${BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  patch: (path, body) =>
    fetch(`${BASE}${path}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    }).then((r) => r.json()),

  delete: (path) =>
    fetch(`${BASE}${path}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then((r) => (r.status === 204 ? null : r.json())),

  upload: (path, formData) =>
    fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    }).then((r) => r.json()),
};
