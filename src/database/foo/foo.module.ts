import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Bar } from "./entities/bar.entity";
import { Baz } from "./entities/baz.entity";
import { Foo } from "./entities/foo.entity";
import { FooService } from "./foo.service";

@Module({
  imports: [MikroOrmModule.forFeature([Foo, Bar, Baz])],
  providers: [FooService],
})
export class FooModule {}
