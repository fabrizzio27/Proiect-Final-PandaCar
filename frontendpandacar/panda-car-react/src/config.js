// Configuration for API endpoints
const config = {
  // Development API URL
  development: {
    API_BASE_URL: "http://127.0.0.1:8000/api",
  },
  // Production API URL (will be updated after Railway deployment)
  production: {
    API_BASE_URL: "https://your-railway-app.railway.app/api", // This will be updated
  },
};

// Get the current environment
const environment = process.env.NODE_ENV || "development";

// Export the appropriate configuration
export default config[environment];
