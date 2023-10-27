import { execSync } from "child_process";

module.exports = async () => {
  execSync("yarn mikro-orm schema:fresh --run");
};
