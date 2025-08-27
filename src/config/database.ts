/**
 * Database configuration
 * Mock configuration for demonstration purposes
 */

// Remove circular dependency
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Database connection configuration
 */
export const databaseConfig = {
  // Connection settings
  connection: {
    host: isDevelopment ? 'localhost' : 'befun-db.cluster.amazonaws.com',
    port: isDevelopment ? 5432 : 5432,
    database: isDevelopment ? 'befun_dev' : 'befun_prod',
    ssl: !isDevelopment,
  },
  
  // Pool settings
  pool: {
    min: isDevelopment ? 2 : 5,
    max: isDevelopment ? 10 : 20,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 30000,
    destroyTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 200,
  },
  
  // Query settings
  query: {
    timeout: isDevelopment ? 5000 : 10000,
    enableDebugLog: isDevelopment,
  },
  
  // Migration settings
  migrations: {
    tableName: 'migrations',
    directory: './migrations',
    extension: 'ts',
  },
} as const;

export type DatabaseConfig = typeof databaseConfig;