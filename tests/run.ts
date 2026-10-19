// Test runner for the UNIL histoire de l'art CSL style.
// Usage: npm test [-- filter]   (= node --import tsx tests/run.ts; on Node >= 22.18 official builds: node tests/run.ts)
// Renders each case with citeproc-js and compares against the expected string.
// Expected strings use *…* for italics; non-breaking spaces are compared as plain spaces
// (a dedicated case checks that they are actually emitted).
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import CSL from "citeproc";
import { cases, notes, bibliographies, type Item } from "./cases.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const style = readFileSync(join(root, "universite-de-lausanne-histoire-de-l-art.csl"), "utf8");
const locale = readFileSync(join(root, "locales", "locales-fr-FR.xml"), "utf8");
const filter = process.argv[2];

function makeEngine(items: Item[]) {
  const byId = new Map(items.map((it) => [it.id, it]));
  const sys = {
    retrieveLocale: () => locale,
    retrieveItem: (id: string) => byId.get(id),
  };
  const engine = new CSL.Engine(sys, style, "fr-FR");
  engine.setOutputFormat("html");
  return engine;
}

function toMarkup(html: string, keepNbsp = false): string {
  let s = html
    .replace(/<\/?div[^>]*>/g, "")
    .replace(/<\/?i>/g, "*")
    .replace(/<sup>(.*?)<\/sup>/g, "$1")
    .replace(/&#38;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#60;/g, "<")
    .replace(/&#62;/g, ">")
    .replace(/&#160;/g, " ")
    .trim();
  if (!keepNbsp) s = s.replace(/[  ]/g, " ");
  return s;
}

let pass = 0;
let fail = 0;
function check(name: string, actual: string, expected: string) {
  if (filter && !name.includes(filter)) return;
  if (actual === expected) {
    pass++;
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
  } else {
    fail++;
    console.log(`  \x1b[31m✗ ${name}\x1b[0m\n      expected: ${expected}\n      actual:   ${actual}`);
  }
}

function bibliography(items: Item[], keepNbsp = false): string[] {
  const engine = makeEngine(items);
  engine.updateItems(items.map((it) => it.id));
  const [, entries] = engine.makeBibliography();
  return entries.map((e: string) => toMarkup(e, keepNbsp));
}

// Render a sequence of footnotes; each note is a list of cites. Like a word processor,
// earlier notes are updated when a later cite changes them (e.g. year-suffix disambiguation).
function renderNotes(items: Item[], seq: { id: string; locator?: string; label?: string }[][]): string[] {
  const engine = makeEngine(items);
  const out: string[] = [];
  const pre: [string, number][] = [];
  seq.forEach((cites, i) => {
    const citation = {
      citationID: `c${i}`,
      citationItems: cites,
      properties: { noteIndex: i + 1 },
    };
    const [, result] = engine.processCitationCluster(citation, pre, []);
    pre.push([`c${i}`, i + 1]);
    for (const [index, text] of result as [number, string, string][]) out[index] = toMarkup(text);
  });
  return out;
}

console.log("Bibliography entries");
for (const c of cases) {
  const [entry] = bibliography([c.item]);
  check(c.name, entry, c.bib);
}

console.log("\nFootnotes");
for (const n of notes) {
  const out = renderNotes(n.items, n.seq);
  n.expected.forEach((exp, i) => check(`${n.name} [note ${i + 1}]`, out[i], exp));
}

console.log("\nBibliography ordering");
for (const b of bibliographies) {
  const out = bibliography(b.items);
  check(b.name, out.join("\n"), b.expected.join("\n"));
}

console.log("\nTypography");
{
  const toubert = cases.find((c) => c.name.startsWith("Article dans une revue"))!.item;
  const [entry] = bibliography([toubert], true);
  check("non-breaking space before « in : » colon", String(/in :/.test(entry)), "true");
  check("non-breaking spaces inside « »", String(/« .* »/.test(entry)), "true");
  check("page range uses en dash", String(/441–456/.test(entry)), "true");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
