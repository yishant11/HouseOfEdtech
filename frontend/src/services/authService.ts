// Base URL for our API
const BASE_URL = "http://localhost:5000/api";

// Generic fetch function
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Log the request for debugging
  console.log("API Request:", {
    url,
    method: config.method || "GET",
    headers: config.headers,
    body: config.body,
  });

  try {
    const response = await fetch(url, config);

    // Check if response is OK (2xx status)
    if (!response.ok) {
      // Try to parse error response as JSON
      try {
        const errorData = await response.json();
        console.error("API Error Response:", errorData); // Log detailed error
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      } catch (jsonError) {
        // If JSON parsing fails, it might be an HTML error page
        // In this case, throw a generic error with status code
        const text = await response.text();
        console.error("API Error Text Response:", text); // Log text error
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${text}`
        );
      }
    }

    // Check content type before parsing as JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();
      console.log("API Success Response:", jsonData); // Log successful response
      return jsonData;
    } else {
      // If not JSON, return text or handle appropriately
      const text = await response.text();
      console.log("API Success Text Response:", text); // Log successful text response
      throw new Error(
        `Expected JSON response but got: ${text.substring(0, 100)}...`
      );
    }
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// User registration data type
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Login credentials type
interface LoginCredentials {
  email: string;
  password: string;
}

// Auth API functions
export const authApi = {
  register: (userData: RegisterData) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials: LoginCredentials) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: (token: string) =>
    apiFetch("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
