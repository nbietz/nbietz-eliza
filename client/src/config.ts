// In the browser, we only use the environment variable or default value
export const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Log the API base URL
console.log("API Base URL:", API_BASE);
