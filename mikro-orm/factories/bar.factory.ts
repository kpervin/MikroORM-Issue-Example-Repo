import { Bar } from "../../src/database/foo/entities/bar.entity";
import { Factory } from "@mikro-orm/seeder";

export class BarFactory extends Factory<Bar> {
  model = Bar;

  definition(): Partial<Bar> {
    return {};
  }
}
