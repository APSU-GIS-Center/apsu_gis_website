import { readFileSync } from "node:fs";

const errors = [];

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const nvmrc = readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim();

const expectedNode = nvmrc;
const expectedPnpm = (packageJson.packageManager || "").split("@")[1] || "";

if (!packageJson.packageManager?.startsWith("pnpm@")) {
  errors.push("package.json packageManager must be pinned to pnpm (e.g., pnpm@9.0.0).");
}

if (packageJson.volta?.node && packageJson.volta.node !== expectedNode) {
  errors.push(`volta.node (${packageJson.volta.node}) must match .nvmrc (${expectedNode}).`);
}

if (packageJson.volta?.pnpm && expectedPnpm && packageJson.volta.pnpm !== expectedPnpm) {
  errors.push(`volta.pnpm (${packageJson.volta.pnpm}) must match packageManager pnpm version (${expectedPnpm}).`);
}

const currentNode = process.versions.node;
if (currentNode !== expectedNode) {
  errors.push(`Current Node is ${currentNode}, expected ${expectedNode} from .nvmrc.`);
}

const userAgent = process.env.npm_config_user_agent || "";
const pnpmMatch = userAgent.match(/pnpm\/(\d+\.\d+\.\d+)/);
if (!pnpmMatch) {
  errors.push("Could not detect pnpm from npm_config_user_agent. Run commands with pnpm.");
} else {
  const currentPnpm = pnpmMatch[1];
  if (expectedPnpm && currentPnpm !== expectedPnpm) {
    errors.push(`Current pnpm is ${currentPnpm}, expected ${expectedPnpm} from packageManager.`);
  }
}

if (errors.length > 0) {
  console.error("\nToolchain drift detected:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  console.error("\nFix: nvm use && corepack prepare pnpm@9.0.0 --activate\n");
  process.exit(1);
}

console.log(`Toolchain OK: node ${currentNode}, pnpm ${expectedPnpm}`);
