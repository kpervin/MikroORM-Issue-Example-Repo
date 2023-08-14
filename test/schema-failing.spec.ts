import { execSync } from "child_process";
import fs from "fs";
import * as path from "path";

const refreshSchema = () =>
  execSync(`yarn mikro-orm schema:fresh --run --seed`);

function deleteCache(): void {
  const cachePath = path.join(process.cwd(), "mikro-orm", "cache");
  if (fs.existsSync(cachePath)) {
    fs.rmdirSync(cachePath, { recursive: true });
  }
}

describe("Schema Generator Fails With Check Constraint", () => {
  beforeAll(async () => {
    execSync(`yarn build`);
  });

  beforeEach(() => deleteCache());

  afterAll(() => deleteCache());

  it("Should generate schema fine", async () => {
    expect(refreshSchema).not.toThrow();
  });

  it("Should fail to generate", async () => {
    expect(refreshSchema).not.toThrow();

    expect(refreshSchema).toThrow();
  });

  it("Should fail to generate when TS cache is present", async () => {
    execSync("yarn mikro-orm cache:generate --ts");

    expect(refreshSchema).toThrow();
  });

  it("Does not fail to generate when JS cache is present", async () => {
    execSync("yarn mikro-orm cache:generate");

    expect(refreshSchema).not.toThrow();
  });
});
