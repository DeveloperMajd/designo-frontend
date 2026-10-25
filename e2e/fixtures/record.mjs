// Records the API responses the website needs into JSON fixtures for e2e/mock-api.mjs.
// Usage: node e2e/fixtures/record.mjs [api url]   (default http://localhost:1337/api)
// The queries match src/hooks/getData.ts; pages are recorded without the slug filter.
import { writeFileSync } from "node:fs";
import qs from "qs";

const api = process.argv[2] ?? "http://localhost:1337/api";

const populateAll = (fields) =>
  Object.fromEntries(fields.map((field) => [field, { populate: "*" }]));

const endpoints = {
  pages: {
    populate: {
      Module: {
        populate: populateAll([
          "Elements",
          "image",
          "link",
          "Image",
          "ImageMobile",
          "ImageTablet",
          "locations",
        ]),
      },
    },
  },
  contact: { populate: { socials: { populate: "*" } } },
  menus: { populate: { items: { populate: "*" } } },
  labels: { populate: "*" },
};

for (const [name, query] of Object.entries(endpoints)) {
  const res = await fetch(`${api}/${name}?${qs.stringify(query)}`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const body = await res.json();
  writeFileSync(
    new URL(`./${name}.json`, import.meta.url),
    `${JSON.stringify(body, null, 2)}\n`
  );
  console.log(`Recorded ${name}`);
}
