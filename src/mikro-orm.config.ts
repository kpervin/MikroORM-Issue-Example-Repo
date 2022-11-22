import { Logger } from "@nestjs/common";
import { join } from "path";
import { LoadStrategy } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { defineConfig, MySqlDriver } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { MigrationGenerator } from "../mikro-orm/MigrationGenerator";
import * as dotEnvFlow from "dotenv-flow";

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD) {
  new Logger("MikroORM-Config").log("Setting dotenv-flow.");
  dotEnvFlow.config({
    node_env: process.env.NODE_ENV ?? "development",
  });
}
const processPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 4000;

export default defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  type: "mysql",
  driver: MySqlDriver,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: processPort,
  pool: {
    min: 0,
  },
  forceUtcTimezone: true,

  highlighter: new SqlHighlighter(),

  cache: {
    pretty: true,
    options: {
      cacheDir: join(process.cwd(), "mikro-orm", "cache"),
    },
  },
  migrations: {
    path: join(process.cwd(), "mikro-orm", "migrations"),
    /**
     * This is added in to mitigate a warning thrown with MikroORM not being able to do DDL
     * transactions in migrations
     *
     * {@see https://mikro-orm.io/docs/migrations#limitations}
     */
    transactional: false,
    disableForeignKeys: false,
    safe: true,
    generator: MigrationGenerator,
  },
  loadStrategy: LoadStrategy.JOINED,
  debug: process.env.DEPLOY_ENV !== "production",
  entities: ["./dist/**/entities/*.entity.js"], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ["./src/**/entities/*.entity.ts"], // path to your TS entities (src), relative to `baseDir`
});
