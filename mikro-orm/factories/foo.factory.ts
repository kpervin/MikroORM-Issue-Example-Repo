import type { EntityManager } from "@mikro-orm/core";
import { Foo } from "../../src/database/foo/entities/foo.entity";
import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import { BarFactory } from "./bar.factory";

export class FooFactory extends Factory<Foo> {
  model = Foo;
  private barFactory: BarFactory;

  constructor(em: EntityManager) {
    super(em);
    this.barFactory = new BarFactory(em);
  }

  definition(): Partial<Foo> {
    return {
      text: faker.lorem.paragraph(),
      bar: this.barFactory.makeOne(),
    };
  }
}
