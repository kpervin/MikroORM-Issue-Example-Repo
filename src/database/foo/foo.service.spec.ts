import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Test, TestingModule } from "@nestjs/testing";
import config from "../../mikro-orm.config";
import { Bar } from "./entities/bar.entity";
import { Foo } from "./entities/foo.entity";
import { FooService } from "./foo.service";

describe("Foo Service", () => {
  let service: FooService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...config,
          debug: ["query", "query-params", "info"],
        }),
        MikroOrmModule.forFeature([Foo, Bar]),
      ],
    }).compile();

    service = module.get(FooService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
