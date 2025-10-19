// Configuration for API endpoints
const config = {
  // Development API URL
  development: {
    API_BASE_URL: "http://127.0.0.1:8000/api",
  },
  // Production API URL (replace with your actual Railway URL)
  production: {
    API_BASE_URL: "https://YOUR_RAILWAY_URL_HERE/api", // Replace with your Railway URL
  },
};

// Get the current environment
const environment = process.env.NODE_ENV || "development";

// Export the appropriate configuration
export default config[environment];
