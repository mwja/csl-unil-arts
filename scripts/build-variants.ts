// Generates the style variants from the main style. Run after editing the main style: npm run build
//  - notes abrégées: identical bibliography, every note uses the short form (NOM année, p.), as the
//    GPS (p. 18) asks for works listed in the bibliography.
//  - noms complets: identical notes, but the bibliography lists every author/editor instead of et al.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAIN_ID = "universite-de-lausanne-histoire-de-l-art";
export const mainPath = join(root, `${MAIN_ID}.csl`);

function replaceOnce(s: string, from: string, to: string): string {
  const count = s.split(from).length - 1;
  if (count !== 1) throw new Error(`expected exactly one occurrence of: ${from.slice(0, 80)} (found ${count})`);
  return s.replace(from, () => to);
}

function rename(main: string, id: string, titleTag: string, summary: string): string {
  let s = main;
  s = replaceOnce(s, "<title>Université de Lausanne - Histoire de l'art (Français)</title>",
    `<title>Université de Lausanne - Histoire de l'art (${titleTag}, Français)</title>`);
  s = replaceOnce(s, "<title-short>UNIL - Histoire de l'art</title-short>",
    `<title-short>UNIL - Histoire de l'art (${titleTag})</title-short>`);
  s = replaceOnce(s, `<id>http://www.zotero.org/styles/${MAIN_ID}</id>`,
    `<id>http://www.zotero.org/styles/${id}</id>`);
  s = replaceOnce(s, `<link href="http://www.zotero.org/styles/${MAIN_ID}" rel="self"/>`,
    `<link href="http://www.zotero.org/styles/${id}" rel="self"/>`);
  s = replaceOnce(s, "Notes : référence complète à la première occurrence, puis NOM année, p.", summary);
  return replaceOnce(s, "<style ",
    `<!-- Generated from ${MAIN_ID}.csl by scripts/build-variants.ts; do not edit by hand. -->\n<style `);
}

const CITATION_CHOOSE = `      <choose>
        <if position="subsequent">
          <text macro="short-note"/>
        </if>
        <else>
          <group delimiter=", ">
            <text macro="reference"/>
            <text macro="reference-pages"/>
          </group>
        </else>
      </choose>`;

export function buildNotesAbregees(main: string): string {
  const s = rename(main, `${MAIN_ID}-notes-abregees`, "notes abrégées",
    "Notes abrégées dès la première occurrence (NOM année, p.), pour les travaux figurant dans la bibliographie.");
  return replaceOnce(s, CITATION_CHOOSE, `      <text macro="short-note"/>`);
}

// The bibliography uses copies of every macro ("…-bib") without the et-al limit; the notes keep
// the originals, so they still follow the guide (NOM et al.). Id. then also compares full lists.
export function buildNomsComplets(main: string): string {
  let s = rename(main, `${MAIN_ID}-noms-complets`, "noms complets en bibliographie",
    "Bibliographie : tous les noms (pas d'et al.). Notes : référence complète à la première occurrence, puis NOM année, p.");
  const macros = [...s.matchAll(/  <macro name="([^"]+)">\n[\s\S]*?\n  <\/macro>\n/g)];
  if (macros.length === 0) throw new Error("no macros found");
  const copies = macros.map(([block]) =>
    block
      .replace(/<macro name="([^"]+)">/, '<macro name="$1-bib">')
      .replace(/macro="([^"]+)"/g, 'macro="$1-bib"')
      .replace(/ et-al-min="\d+"/g, ' et-al-min="999"'),
  ).join("");
  s = replaceOnce(s, "  <!-- ===================== Notes ===================== -->",
    `  <!-- Copies of all macros for the bibliography, without et al. -->\n${copies}  <!-- ===================== Notes ===================== -->`);
  const bib = s.match(/  <bibliography [\s\S]*?<\/bibliography>/);
  if (!bib) throw new Error("no bibliography element");
  const fullBib = bib[0]
    .replace(/macro="([^"]+)"/g, 'macro="$1-bib"')
    .replace('names-min="3" names-use-first="1"', 'names-min="999" names-use-first="999"');
  return replaceOnce(s, bib[0], fullBib);
}

export const variants = [
  { path: join(root, `${MAIN_ID}-notes-abregees.csl`), build: buildNotesAbregees },
  { path: join(root, `${MAIN_ID}-noms-complets.csl`), build: buildNomsComplets },
];

if (import.meta.url === `file://${process.argv[1]}`) {
  const main = readFileSync(mainPath, "utf8");
  for (const v of variants) {
    writeFileSync(v.path, v.build(main));
    console.log(`wrote ${v.path}`);
  }
}
