import { MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { INestApplication } from "@nestjs/common";
import { ContextIdFactory } from "@nestjs/core";
import { Test, TestingModule } from "@nestjs/testing";
import express from "express";
import { Bar } from "../src/database/foo/entities/bar.entity";
import { FooModule } from "../src/database/foo/foo.module";
import { FooService } from "../src/database/foo/foo.service";
import config from "../src/mikro-orm.config";

describe("Test Process", () => {
  let app: INestApplication;
  let fooService: FooService;
  let orm: MikroORM;
  let bar: Bar;

  beforeAll(async () => {
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

    const contextId = ContextIdFactory.create();
    jest
      .spyOn(ContextIdFactory, "getByRequest")
      .mockImplementation(() => contextId);

    fooService = await module.resolve(FooService, contextId);
    orm = await module.resolve(MikroORM);

    await app.listen(process.env.PORT || 3000, () => {
      console.log(
        `Process started on port ${process.env.PORT || 3000} in ${
          process.env.NODE_ENV
        } environment.`,
      );
    });
  });

  afterAll(async () => {
    if (bar) {
      await orm.em.fork().removeAndFlush(bar);
    }
  });

  it("test", async () => {
    bar = await fooService.createBar();

    await fooService.test(bar.id);

    const resp = await fooService.getBar(bar.id);

    expect(resp).not.toBeNull();
    if (!resp) return;

    const foos = await resp.foos.loadItems();
    expect(foos.length).toBeGreaterThan(0);
  });
});
