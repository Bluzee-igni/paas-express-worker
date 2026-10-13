import { httpServerHandler } from "cloudflare:node";
import express from "express";

const app = express();

// Endpoint Utama (Root)
app.get("/", (req, res) => {
  res.json({
    message: "Hello Express on Cloudflare Workers!",
    author: "Atha",
    status: "running",
    runtime: "Cloudflare Workers Serverless Edge"
  });
});

// Endpoint Status Sistem
app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    subject: "PaaS",
    week: 5,
    platform: "Cloudflare Workers",
    author: "Atha"
  });
});

// Endpoint Challenge Redeploy (/api/info)
app.get("/api/info", (req, res) => {
  res.json({
    framework: "Express",
    runtime: "Cloudflare Workers",
    course: "Platform as a Service",
    module: "S1-M05-P1",
    author: "Atha"
  });
});

// Endpoint Observability & Real-time Live Log (/api/log-test)
app.get("/api/log-test", (req, res) => {
  console.log("Endpoint /api/log-test dipanggil oleh klien pada " + new Date().toISOString());
  res.json({
    logged: true,
    timestamp: new Date().toISOString(),
    message: "Log berhasil dikirim ke stdout runtime Cloudflare Workers"
  });
});

// Binding listener ke virtual internal port 3000
app.listen(3000);

// Export adapter Cloudflare Workers untuk memetakan request fetch edge ke listener Express
export default httpServerHandler({ port: 3000 });
