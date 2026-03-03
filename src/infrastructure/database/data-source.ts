import { DataSourceOptions } from "typeorm";
import { DbEnvs } from "../config";
import { config } from "dotenv";

config()

// Si estamos en ambiente de test, usamos sqlite en memoria para evitar
// dependencias externas (postgres) durante la verificación de contratos
let ds: DataSourceOptions;
if(process.env.NODE_ENV === 'test') {
  ds = {
    type: 'sqlite',
    database: ':memory:',
    entities: ["src/**/*.entity{.ts,.js}"],
    synchronize: true,
    logging: false,
  }
} else {
  ds = {
    type: 'postgres',
    host: DbEnvs.dbHost,
    port: DbEnvs.dbPort,
    database: DbEnvs.dbName,
    username: DbEnvs.dbUser,
    password: DbEnvs.dbPass,
    migrations: ["dist/infrastructure/database/migrations/*.js"],
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    applicationName: 'nutritional-advice',
    migrationsTableName: 'migraciones',
  }
}

export const dataSource: DataSourceOptions = ds;