const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const services = [
  "../api-gateway",
  "../auth-microservice",
  "../carts-microservice",
  "../notifications-microservice",
  "../orders-microservice",
  "../products-microservice",
  "../users-microservice",
];
const commonPath = path.resolve(__dirname, "..");

services.forEach((servicePath) => {
  const absPath = path.resolve(commonPath, servicePath);
  if (fs.existsSync(absPath)) {
    console.log(`Installing common into: ${absPath}`);
    try {
      execSync("npm install file:../libs", {
        cwd: absPath,
        stdio: "inherit",
      });
    } catch (err) {
      console.error(`❌ Failed to install in ${absPath}`, err);
    }
  } else {
    console.warn(`⚠️ Service not found: ${absPath}`);
  }
});
