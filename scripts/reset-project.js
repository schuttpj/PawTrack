#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("Resetting project...");

try {
  // Use npx to run expo commands to avoid the 'expo command not found' error
  console.log("Clearing Expo cache...");
  execSync("npx expo-cli cache --clear", { stdio: "inherit" });

  console.log("Clearing Metro bundler cache...");
  execSync("npx expo start --clear", {
    stdio: "inherit",
  });

  // Delete node_modules/.cache if it exists
  const cachePath = path.join(__dirname, "..", "node_modules", ".cache");
  if (fs.existsSync(cachePath)) {
    console.log("Removing node_modules/.cache...");
    fs.rmSync(cachePath, { recursive: true, force: true });
  }

  console.log("Project reset complete!");
} catch (error) {
  console.error("Error resetting project:", error.message);
  process.exit(1);
}
