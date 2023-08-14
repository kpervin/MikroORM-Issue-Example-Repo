import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Foo } from "../../src/database/foo/entities/foo.entity";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await em.upsert(Foo, {
      id: 1,
      text: "hello world",
    });
  }
}
