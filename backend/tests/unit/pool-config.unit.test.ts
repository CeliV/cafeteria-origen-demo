import { configurarPool } from "../../config/pool-config";

describe("configurarPool", () => {
    it("usa DATABASE_URL como cadena de conexión cuando existe", () => {
        const config = configurarPool({
        DATABASE_URL: "postgresql://usuario:clave@host.ejemplo/neondb?sslmode=require",
        });

        expect(config.connectionString).toBe(
        "postgresql://usuario:clave@host.ejemplo/neondb?sslmode=require",
        );
    });

    it("limita las conexiones por instancia cuando usa DATABASE_URL", () => {
        const config = configurarPool({ DATABASE_URL: "postgresql://u:c@h/db" });

        expect(config.max).toBe(3);
    });

    it("sin DATABASE_URL usa las variables DB_* como antes", () => {
        const config = configurarPool({
        DB_HOST: "localhost",
        DB_USER: "cafeteria",
        DB_PASSWORD: "secreta",
        DB_NAME: "cafeteria",
        DB_PORT: "5433",
        });

        expect(config).toEqual({
        host: "localhost",
        user: "cafeteria",
        password: "secreta",
        database: "cafeteria",
        port: 5433,
        max: 10,
        idleTimeoutMillis: 30000,
        });
    });

    it("ignora DATABASE_URL si está vacía", () => {
        const config = configurarPool({ DATABASE_URL: "", DB_HOST: "localhost", DB_PORT: "5432" });

        expect(config.connectionString).toBeUndefined();
        expect(config.host).toBe("localhost");
    });
});