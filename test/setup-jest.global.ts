import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

module.exports = async () => {
  /**
   * This is to ensure that MikroORM cache is built before testing.
   * This way we can also have a cleaner `await` call instead of having to do
   * the above.
   */
  const app = await NestFactory.create(AppModule);
  await app.close();
};
