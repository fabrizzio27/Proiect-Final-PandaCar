// Configuration for API endpoints
const config = {
  // Development API URL
  development: {
    API_BASE_URL: "http://127.0.0.1:8000/api",
  },
  // Production API URL
  production: {
    API_BASE_URL:
      "https://proiect-final-pandacar-production.up.railway.app/api",
  },
};

// Force production mode for deployed apps
const environment = "production";

// Debug log
console.log("Environment:", environment);
console.log("API_BASE_URL:", config[environment].API_BASE_URL);

// Export the appropriate configuration
export default config[environment];
