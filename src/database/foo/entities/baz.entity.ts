import {
  BaseEntity,
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

@Entity()
export class Baz extends BaseEntity<Baz, "id"> {
  @PrimaryKey()
  id: number;

  @Property()
  text: string;

  @Property({
    columnType: "VARCHAR(255) GENERATED ALWAYS AS (LOWER(`text`)) VIRTUAL",
    ignoreSchemaChanges: ["type", "extra"],
  })
  lowerText: string;

  [OptionalProps]?: "lowerText";
}
