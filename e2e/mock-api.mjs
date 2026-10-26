// A stand-in for the Strapi API that serves recorded responses, so the end-to-end tests
// need no backend. Re-record the fixtures with: node e2e/fixtures/record.mjs <api url>
import { readFileSync } from "node:fs";
import http from "node:http";
import qs from "qs";

const port = Number(process.env.MOCK_API_PORT ?? 4010);

const fixture = (name) =>
  JSON.parse(
    readFileSync(new URL(`./fixtures/${name}.json`, import.meta.url), "utf8")
  );
const pages = fixture("pages");
const singles = {
  "/api/contact": fixture("contact"),
  "/api/menus": fixture("menus"),
  "/api/labels": fixture("labels"),
};

// Every upload is served as the same tiny image, so pages render without the real media.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGO4ceMGAAUUAol808NhAAAAAElFTkSuQmCC",
  "base64"
);
const SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  // The browser calls the API directly for the contact form and the social icons.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const json = (status, body) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(body));
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (url.pathname.startsWith("/uploads/")) {
    const svg = url.pathname.endsWith(".svg");
    res.writeHead(200, { "Content-Type": svg ? "image/svg+xml" : "image/png" });
    return res.end(svg ? SVG : PNG);
  }
  if (req.method === "POST" && url.pathname === "/api/contact-form/send") {
    return json(200, { success: true });
  }
  if (req.method === "GET" && url.pathname === "/api/pages") {
    const slug = qs.parse(url.search.slice(1)).filters?.Slug?.$eq;
    const data = slug
      ? pages.data.filter((page) => page.attributes.Slug === slug)
      : pages.data;
    return json(200, { data, meta: pages.meta });
  }
  if (req.method === "GET" && singles[url.pathname]) {
    return json(200, singles[url.pathname]);
  }
  return json(404, {
    data: null,
    error: { status: 404, name: "NotFoundError", message: "Not Found" },
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Mock API listening on http://127.0.0.1:${port}`);
});
