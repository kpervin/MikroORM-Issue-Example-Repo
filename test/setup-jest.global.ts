import config from "../src/mikro-orm.config";
import { MikroORM } from "@mikro-orm/core";

module.exports = async () => {
  /**
   * This is to ensure that MikroORM cache is built before testing.
   */
  await MikroORM.init(config);
};
