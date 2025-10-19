// Configuration for API endpoints
const config = {
  // Development API URL
  development: {
    API_BASE_URL: "http://127.0.0.1:8000/api",
  },
  // Production API URL
  production: {
    API_BASE_URL: "https://proiect-final-pandacar-production.up.railway.app/api",
  },
};

// Get the current environment - default to production for deployed apps
const environment = process.env.NODE_ENV === 'development' ? 'development' : 'production';

// Export the appropriate configuration
export default config[environment];
