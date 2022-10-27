import { MikroORM } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Bar } from "./entities/bar.entity";
import { Foo } from "./entities/foo.entity";

@Injectable()
export class FooService {
  constructor(private readonly orm: MikroORM) {}

  async createBar(): Promise<Bar> {
    const bar = this.orm.em.create(Bar, {});

    await this.orm.em.persistAndFlush(bar);

    return bar;
  }

  async test(barId: number): Promise<Foo> {
    const bar = await this.orm.em.findOneOrFail(Bar, barId);
    const foo = new Foo().assign({
      text: "Hello World",
      bar,
    });

    this.orm.em.persist(foo);
    await this.orm.em.flush();

    return foo;
  }

  async getBar(barId: number): Promise<Bar | null> {
    return this.orm.em.findOne(Bar, barId, {
      populate: ["foos"],
    });
  }
}
