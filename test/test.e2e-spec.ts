import { MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import express from "express";
import { Baz } from "../src/database/foo/entities/baz.entity";
import { FooModule } from "../src/database/foo/foo.module";

import config from "../src/mikro-orm.config";

describe("Test Process", () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
        }),
        FooModule,
      ],
    }).compile();

    app = module.createNestApplication({ bodyParser: false });
    app.use(express.json());

    expect(app).toBeDefined();
    await app.init();
    orm = await module.resolve(MikroORM);

    await app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Process started on port ${process.env.PORT || 3000} in ${
          process.env.NODE_ENV
        } environment.`,
      );
    });
  });

  afterEach(async () => {
    await orm.close();
  });

  it("will reject inserting without explicitly defining virtual property", async () => {
    const baz = orm.em.create(Baz, {
      text: "Hello World!",
    });
    await expect(orm.em.persistAndFlush(baz)).rejects.toThrow();
  });
});
