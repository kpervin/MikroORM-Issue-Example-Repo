import config from "../src/mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";

module.exports = async () => {
  /**
   * This is to ensure that MikroORM cache is built before testing.
   * This way we can also have a cleaner `await` call instead of having to do
   * the above.
   */
  await MikroORM.init(config);
};
