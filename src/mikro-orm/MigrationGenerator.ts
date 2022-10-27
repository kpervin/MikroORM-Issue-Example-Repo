import { MigrationsOptions, NamingStrategy } from "@mikro-orm/core";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { MySqlDriver } from "@mikro-orm/mysql";
import fs from "fs";
import { startCase } from "lodash";

export class MigrationGenerator extends TSMigrationGenerator {
  constructor(
    driver: MySqlDriver,
    namingStrategy: NamingStrategy,
    options: MigrationsOptions,
  ) {
    super(driver, namingStrategy, options);
    this.options.fileName = this.migrationFileName;
  }

  /**
   * Asks the user for a short description and increments a counter.
   * Generates file names that follow the following naming structure.
   *
   * ex: `Migration20220105142040-ThisIsAMigration`
   */
  private migrationFileName(timestamp: string): string {
    if (process.env.CREATE === "true") {
      const DELIMITER = "";
      // Ask user for a short description (keep asking until you get something or they quit with ctrl+c)
      let name = "";
      while (!name) {
        name = startCase(
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          require("readline-sync")
            .question(
              "\nWhat does this migration do? (Keep it short, it's going in the file name)\n> ",
            )
            .replace(/[^\w\s]/gi, "") // Remove any non-alphanumeric or whitespace characters
            // Replace any number of whitespace characters with the delimiter
            .toLowerCase(),
        ).replace(/\s+/gi, DELIMITER);
      }

      // New line to find question in logs easier
      console.log();

      return `Migration${timestamp}-${name}`;
    } else {
      if (this.options.path) {
        const files = fs
          .readdirSync(this.options.path)
          .filter((file) => new RegExp(`${timestamp}`, "g").test(file));
        if (files) {
          return files[0].replace(".ts", "");
        }
      }
      throw new Error("Error finding files");
    }
  }

  /**
   * This is changed from the default {@link TSMigrationGenerator.createStatement}
   * so we can use backticks instead of double quotes for Webstorm Datagrip integration
   */
  createStatement(sql: string, padLeft: number): string {
    if (sql) {
      sql = sql.replace(/`/g, "");
      const padding = " ".repeat(padLeft);
      const queryPadding = padding.repeat(2);
      return `${padding}this.addSql(\`\n${queryPadding}${sql}\n${padding}\`);\n`;
    }
    return "\n";
  }
}
