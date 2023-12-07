import { MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Test, TestingModule } from "@nestjs/testing";
import { Bar } from "../src/database/foo/entities/bar.entity";
import config from "../src/mikro-orm.config";

describe("Fake Timers issue", () => {
  let orm: MikroORM;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          allowGlobalContext: true,
        }),
      ],
    }).compile();

    orm = await module.resolve(MikroORM);
  });

  afterEach(async () => {
    await orm.close();
    jest.useRealTimers();
  });

  async function insertBar(): Promise<boolean> {
    const bar = orm.em.create(Bar, {});
    await orm.em.persistAndFlush(bar);
    return true;
  }

  it("will timeout", async () => {
    jest.useFakeTimers();
    /**
     * This will exceed timeout because it never resolves
     */
    await expect(insertBar()).resolves.toEqual(true);
  });

  it("should insert", async () => {
    jest.useFakeTimers({ doNotFake: ["nextTick"] });
    await expect(insertBar()).resolves.toEqual(true);
  });
});
