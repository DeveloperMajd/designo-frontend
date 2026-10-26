import pages from "./fixtures/pages.json";

/** Every page in the recorded CMS data, with the URL it is served at and its tab title. */
export const routes = pages.data.map(({ attributes }) =>
  attributes.Slug === "startpage"
    ? { path: "/", title: /^Designo \| / }
    : { path: `/${attributes.Slug}`, title: `${attributes.Title} | Designo` }
);
