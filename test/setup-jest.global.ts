import { Logger } from "@nestjs/common";
import { execSync } from "child_process";

module.exports = async () => {
  const logger = new Logger("JestGlobalSetup");

  logger.log("Refreshing Schema");
  execSync("yarn mikro-orm schema:fresh --run");
};
