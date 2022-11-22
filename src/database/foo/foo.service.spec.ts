import { MikroORM } from "@mikro-orm/core";
import config from "../../mikro-orm.config";

describe("Foo Service", () => {
  let orm: MikroORM;
  beforeAll(async () => {
    orm = await MikroORM.init(config);
  });

  it("should be defined", () => {
    expect(orm).toBeDefined();
  });
});
