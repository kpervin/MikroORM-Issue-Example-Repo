import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Bar } from "./bar.entity";

@Entity()
export class Foo extends BaseEntity<Foo, "id"> {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  text: string;

  @ManyToOne(() => Bar, { onUpdateIntegrity: "cascade", onDelete: "cascade" })
  bar: Bar;

  @Property()
  optionalText?: string;
}
