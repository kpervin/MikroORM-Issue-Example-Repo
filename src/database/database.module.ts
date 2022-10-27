import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Global, Module } from "@nestjs/common";
import { FooModule } from "./foo/foo.module";

@Global()
@Module({
  imports: [MikroOrmModule.forRoot(), FooModule],
})
export class DatabaseModule {}
