import type { PoolConfig } from "pg";

type Entorno = Record<string, string | undefined>;

export function configurarPool(env: Entorno): PoolConfig {
    if (env.DATABASE_URL) {
        return {
        connectionString: env.DATABASE_URL,
        max: 3,
        idleTimeoutMillis: 30000,
        };
    }

    return {
        host: env.DB_HOST,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        port: Number(env.DB_PORT),
        max: 10,
        idleTimeoutMillis: 30000,
    };
}