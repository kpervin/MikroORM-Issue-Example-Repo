import { faker } from "@faker-js/faker";
import { MikroORM, QueryOrder } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { FooFactory } from "../mikro-orm/factories/foo.factory";
import { Foo } from "../src/database/foo/entities/foo.entity";
import { FooModule } from "../src/database/foo/foo.module";
import config from "../src/mikro-orm.config";

describe("MySQL Order By Issue", () => {
  let orm: MikroORM;
  let foos: Foo[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
          debug: true,
        }),
        FooModule,
      ],
    })
      .setLogger(new Logger())
      .compile();

    orm = module.get(MikroORM);

    const fooFactory = new FooFactory(orm.em);

    foos = [
      fooFactory.makeOne({ optionalText: "a" }),
      fooFactory.makeOne({ optionalText: "b" }),
      fooFactory.makeOne(),
      fooFactory.makeOne({ optionalText: "c" }),
    ];
    await orm.em.persist(foos).flush();
  });

  afterEach(async () => {
    if (foos) {
      await orm.em.remove(foos).flush();
    }
    await orm.close();
  });

  it("should order items fine", async () => {
    const fetched = await orm.em.find(
      Foo,
      {},
      {
        orderBy: {
          optionalText: QueryOrder.ASC,
        },
      },
    );
    expect(fetched).toBeDefined();
  });
  it("will fail because it uses `asc nulls last` syntax in a MySQL call", async () => {
    await expect(
      orm.em.find(
        Foo,
        {},
        {
          orderBy: {
            optionalText: QueryOrder.ASC_NULLS_LAST,
          },
        },
      ),
    ).rejects.toThrow();
  });
});
