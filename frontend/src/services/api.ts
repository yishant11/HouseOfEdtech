// Base URL for our API
const BASE_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// User data type
interface UserData {
  name: string;
  email: string;
  password?: string;
}

// Product data type
interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

// Generic fetch function
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  // Log the request for debugging
  console.log(`API Request: ${options.method || "GET"} ${url}`, options);

  // Add auth header if token exists
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set default content type to JSON if not already set
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    headers,
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Log the response for debugging
    console.log(
      `API Response: ${response.status} ${response.statusText}`,
      response
    );

    // Check if response is OK (2xx status)
    if (!response.ok) {
      // Try to parse error response as JSON
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      } catch (jsonError) {
        // If JSON parsing fails, it might be an HTML error page
        // In this case, throw a generic error with status code
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    // Check content type before parsing as JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();
      console.log("API Response Data:", jsonData);
      return jsonData;
    } else {
      // If not JSON, return text or handle appropriately
      const text = await response.text();
      throw new Error(
        `Expected JSON response but got: ${text.substring(0, 100)}...`
      );
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// User API functions
export const userApi = {
  getAll: () => apiFetch("/users"),
  getById: (id: string) => apiFetch(`/users/${id}`),
  create: (userData: UserData) =>
    apiFetch("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
  update: (id: string, userData: Partial<UserData>) =>
    apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
  delete: (id: string) =>
    apiFetch(`/users/${id}`, {
      method: "DELETE",
    }),
};

// Product API functions
export const productApi = {
  getAll: () => apiFetch("/products"),
  getById: (id: string) => apiFetch(`/products/${id}`),
  create: (productData: ProductData) =>
    apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    }),
  update: (id: string, productData: Partial<ProductData>) =>
    apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    }),
  delete: (id: string) =>
    apiFetch(`/products/${id}`, {
      method: "DELETE",
    }),
};
