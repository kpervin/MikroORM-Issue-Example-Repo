import {
  BaseEntity,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
} from "@mikro-orm/core";
import { Foo } from "./foo.entity";

@Entity()
export class Bar extends BaseEntity<Bar, "id"> {
  @PrimaryKey()
  id: number;

  @OneToMany({
    entity: () => Foo,
    mappedBy: (foo) => foo.bar,
  })
  foos = new Collection<Foo>(this);
}
