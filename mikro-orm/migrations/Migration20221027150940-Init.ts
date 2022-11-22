import { Migration } from "@mikro-orm/migrations";

export class Migration20221027150940 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
        CREATE TABLE bar
        (
            id INT unsigned NOT NULL auto_increment PRIMARY KEY
        ) DEFAULT CHARACTER SET utf8mb4 engine = InnoDB;
    `);

    this.addSql(`
        CREATE TABLE foo
        (
            id     INT unsigned NOT NULL auto_increment PRIMARY KEY,
            text   VARCHAR(255) NOT NULL,
            bar_id INT unsigned NOT NULL
        ) DEFAULT CHARACTER SET utf8mb4 engine = InnoDB;
    `);
    this.addSql(`
        ALTER TABLE foo
            ADD index foo_bar_id_index(bar_id);
    `);

    this.addSql(`
        ALTER TABLE foo
            ADD CONSTRAINT foo_bar_id_foreign FOREIGN KEY (bar_id) REFERENCES bar (id) ON UPDATE CASCADE ON DELETE CASCADE;
    `);
  }
}
