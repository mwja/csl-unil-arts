// Zotero 7: Tools → Developer → Run JavaScript (tick "Run as async function").
//
// CSL styles cannot see Zotero tags, so the "Exhibition…" tags imported from library
// catalogues have no effect on formatting. This script finds Book items carrying one of
// those catalogue tags and adds "Genre: cat. exp." to their Extra field, which the
// UNIL histoire de l'art style uses to format them as exhibition catalogues.
//
// Set DRY_RUN = false to actually write the changes.
const DRY_RUN = true;

// Exact tag names (case-insensitive) produced by library catalogues:
//   LCSH form subdivision "—Exhibitions"     → tag "Exhibitions"
//   LCGFT genre/form term (MARC 655)         → "Exhibition catalogs"
//   RAMEAU / BnF, RERO, swisscovery (fr)     → "Catalogues d'exposition", "Expositions"
//   GND (de)                                 → "Ausstellungskatalog", "Ausstellung"
//   Soggettario (it)                         → "Mostre", "Cataloghi di mostre"
// Tags are matched exactly so topical headings such as "Exhibition buildings" are ignored.
const CATALOGUE_TAG = /^(exhibitions?|exhibition catalog(ue)?s?|catalogues? d['’]expositions?|expositions?|ausstellungskataloge?|ausstellung(en)?|mostre|cataloghi di mostre)$/i;

const items = await Zotero.Items.getAll(Zotero.Libraries.userLibraryID, true);
const changed = [];
for (const item of items) {
  if (!item.isRegularItem() || item.itemType !== "book") continue;
  if (!item.getTags().some((t) => CATALOGUE_TAG.test(t.tag.trim()))) continue;
  const extra = item.getField("extra") || "";
  if (/^genre\s*:/im.test(extra)) continue; // already marked
  changed.push(item.getField("title"));
  if (!DRY_RUN) {
    item.setField("extra", extra ? `Genre: cat. exp.\n${extra}` : "Genre: cat. exp.");
    await item.saveTx();
  }
}
return `${DRY_RUN ? "Would mark" : "Marked"} ${changed.length} item(s):\n${changed.join("\n")}`;
