import { j as json } from "../../../chunks/index.js";
import fs from "fs";
import path from "path";
const databasePath = path.resolve("public/database.json");
const optionsPath = path.resolve("public/options.json");
async function GET({ url }) {
  const action = url.searchParams.get("action");
  if (action === "read") {
    if (fs.existsSync(databasePath)) {
      const data = fs.readFileSync(databasePath, "utf8");
      return new Response(data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } else {
      return json({ error: "File not found" });
    }
  }
  if (action === "readOpt") {
    if (fs.existsSync(optionsPath)) {
      const data = fs.readFileSync(optionsPath, "utf8");
      return new Response(data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } else {
      return json({ error: "File not found" });
    }
  }
  return json({ error: "Unknown or missing action" });
}
async function POST({ request, url }) {
  const action = url.searchParams.get("action");
  if (action === "write") {
    const { data } = await request.json();
    try {
      fs.writeFileSync(databasePath, JSON.stringify(data, null, 2));
      return json({ status: "success" });
    } catch (e) {
      return json({ error: "Failed to write to file" });
    }
  }
  if (action === "writeOpt") {
    const { data } = await request.json();
    try {
      fs.writeFileSync(optionsPath, JSON.stringify(data, null, 2));
      return json({ status: "success" });
    } catch (e) {
      return json({ error: "Failed to write to file" });
    }
  }
  return json({ error: "Unknown or missing action" });
}
export {
  GET,
  POST
};
