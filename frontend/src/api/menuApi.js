const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const headers = { ...(options.headers || {}) };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function fetchMenuItems(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/menu${query}`);
}

export async function fetchMenuItemById(id) {
  const items = await fetchMenuItems();
  return items.find((item) => String(item.id) === String(id)) || null;
}

export async function loginAdmin({ username, password }) {
  return request("/menu/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function fetchAdminProfile(token) {
  return request("/menu/admin/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createMenuItem(item, token) {
  return request("/menu", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export async function updateMenuItem(id, item, token) {
  return request(`/menu/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
}

export async function deleteMenuItem(id, token) {
  return request(`/menu/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchOrders() {
  return request("/orders");
}

export async function createOrder(order) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}
