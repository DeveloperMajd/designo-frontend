// The CMS's text fields are plain text, but editors have typed HTML into some of them (the
// office addresses use <p> and <strong>). The site renders them as text, never as HTML, so
// any markup becomes plain text here and nothing an editor types can run in the browser.

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  apos: "'",
  nbsp: " ",
};

const decodeEntities = (value: string) =>
  value.replace(
    /&(amp|lt|gt|quot|#39|apos|nbsp);/g,
    (_, name: string) => ENTITIES[name]
  );

/** A text field as one run of text: tags dropped and whitespace collapsed, as a browser would show it. */
export const toText = (value: string | null | undefined) =>
  decodeEntities((value ?? "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

/** A text field as separate lines: paragraphs, <br> and typed line breaks each start a line. */
export const toLines = (value: string | null | undefined) =>
  (value ?? "")
    .replace(/<br\s*\/?>|<\/(p|div)>/gi, "\n")
    .split(/[\n\r\u2028\u2029]+/)
    .map(toText)
    .filter(Boolean);
