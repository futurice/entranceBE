// --- Helpers
const env = (variable, defaultValue) => {
  const value = process.env[variable] || defaultValue;

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable '${variable}' is required!`);
  }

  return value;
};

const envInt = (variable, defaultValue) =>
  parseInt(env(variable, defaultValue), 10);

// --- Database Configuration
const db = {
  url: env('MONGODB_URL', 'mongodb://mongo:27017/entrance-app'),
};

// --- Configuration
export default {
  db,
  development: env('NODE_ENV', 'development') === 'development',
  port: envInt('PORT', '8000'),
};
