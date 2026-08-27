// Hardcoded single-admin login, in its own file for easy updates.
// Reads from env, falls back to a default so the app still boots locally.
// >>> Replace ADMIN_USERNAME / ADMIN_PASSWORD in .env.local before going live. <<<
export default {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "changeme123",
};
