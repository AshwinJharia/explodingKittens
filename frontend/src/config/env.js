const env = import.meta.env.VITE_ENVIRONMENT || 'development';
const isProduction = env === 'production';

const config = {
  API_URL: import.meta.env.VITE_API_URL || (isProduction 
    ? 'https://exploding-kittens-api.onrender.com'
    : 'http://localhost:8080'),
  IS_PRODUCTION: isProduction,
};

export default config;