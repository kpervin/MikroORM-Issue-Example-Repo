import {
  BaseEntity,
  Check,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Bar } from "./bar.entity";

@Entity()
@Check<Foo>({
  name: "text_length_gt_3",
  expression: (cols) => `LENGTH(${cols.text}) > 3`,
})
export class Foo extends BaseEntity<Foo, "id"> {
  @PrimaryKey()
  id: number;

  @Property()
  text: string;

  @ManyToOne(() => Bar, { onUpdateIntegrity: "cascade", onDelete: "cascade" })
  bar?: Bar;
}
