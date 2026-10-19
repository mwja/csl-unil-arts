// Generates the "notes abrégées" variant from the main style: identical bibliography, but every
// note uses the short form (NOM année, p.), as the GPS (p. 18) asks for works listed in the
// bibliography. Run after editing the main style: npm run build
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const MAIN_ID = "universite-de-lausanne-histoire-de-l-art";
const VARIANT_ID = `${MAIN_ID}-notes-abregees`;
export const variantPath = join(root, `${VARIANT_ID}.csl`);

function replaceOnce(s: string, from: string, to: string): string {
  const count = s.split(from).length - 1;
  if (count !== 1) throw new Error(`expected exactly one occurrence of: ${from.slice(0, 80)} (found ${count})`);
  return s.replace(from, () => to);
}

export function buildVariant(main: string): string {
  let s = main;
  s = replaceOnce(s, "<title>Université de Lausanne - Histoire de l'art (Français)</title>",
    "<title>Université de Lausanne - Histoire de l'art (notes abrégées, Français)</title>");
  s = replaceOnce(s, "<title-short>UNIL - Histoire de l'art</title-short>",
    "<title-short>UNIL - Histoire de l'art (notes abrégées)</title-short>");
  s = replaceOnce(s, `<id>http://www.zotero.org/styles/${MAIN_ID}</id>`,
    `<id>http://www.zotero.org/styles/${VARIANT_ID}</id>`);
  s = replaceOnce(s, `<link href="http://www.zotero.org/styles/${MAIN_ID}" rel="self"/>`,
    `<link href="http://www.zotero.org/styles/${VARIANT_ID}" rel="self"/>\n    <link href="http://www.zotero.org/styles/${MAIN_ID}" rel="template"/>`);
  s = replaceOnce(s, "Notes : référence complète à la première occurrence, puis NOM année, p.",
    "Notes abrégées dès la première occurrence (NOM année, p.), pour les travaux figurant dans la bibliographie.");
  s = replaceOnce(s, `      <choose>
        <if position="subsequent">
          <text macro="short-note"/>
        </if>
        <else>
          <group delimiter=", ">
            <text macro="reference"/>
            <text macro="reference-pages"/>
          </group>
        </else>
      </choose>`, `      <text macro="short-note"/>`);
  return replaceOnce(s, "<style ",
    `<!-- Generated from ${MAIN_ID}.csl by scripts/build-notes-abregees.ts; do not edit by hand. -->\n<style `);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const main = readFileSync(join(root, `${MAIN_ID}.csl`), "utf8");
  writeFileSync(variantPath, buildVariant(main));
  console.log(`wrote ${variantPath}`);
}
