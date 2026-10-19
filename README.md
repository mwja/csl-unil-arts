# UNIL – Histoire de l'art (CSL)

Zotero citation style for the Section d'histoire de l'art, Université de Lausanne, following the
[*Guide du proséminaire (GPS)*](https://www.unil.ch/files/live/sites/lettres/files/04-domaines/hart/05-vie-etudiante/Guide%20du%20pros%c3%a9mianire%20(GPS)_f%c3%a9vrier%202025.pdf), février 2025, p. 11–18.

- `universite-de-lausanne-histoire-de-l-art.csl`: the style (note style, validated against the CSL 1.0.2 schema)
- `universite-de-lausanne-histoire-de-l-art-notes-abregees.csl`: the same style, but every note is
  short (`NOM année, p.`) from the first one, as the guide asks for works listed in the
  bibliography (p. 18). Generated from the main style: edit the main file, then `npm run build`.
- `tests/`: citeproc-js test suite built from every example in the guide
- `zotero/mark-exhibition-catalogues.js`: helper that turns catalogue tags into something the style can see

## Install

Zotero → Settings → Cite → **+** → choose the `.csl` file (or double-click it).

## What the style does

| Rule (GPS) | Output |
|---|---|
| Names | `NOM Prénom`; two names joined with `et`; three or more: `NOM Prénom *et al.*` |
| Editors | `NOM Prénom (éd.)`; in a collective work, more than three editors → first name only + *et al.* |
| Books | `NOM Prénom, *Titre* [orig. date], trad. X, 4e éd., Lieu, Éditeur (coll. « … », n° N), vol. N, année, N vol.` |
| Articles | `NOM Prénom, « Titre », in : *Revue*, vol. 89, n° 3–4, 1983, p. 441–456.` (no URL, even from JSTOR/Persée) |
| Chapters | `…, « Titre », in : NOM Prénom (éd.), *Livre*, Lieu, Éditeur, année, p. X–Y.` |
| Repeated author | `Id.` in the bibliography |
| Bibliography order | alphabetical, then chronological; **exhibition catalogues sorted by title** |
| Footnotes | first citation: full reference + `p. X`; afterwards `NOM année, p. X` (or `*Titre*, année, p. X`) |

The guide's split between **Sources** and **Études** cannot be done by a style. Use two Zotero
collections (or Zotero's bibliography from a selection) and insert two bibliographies.

## How to enter things in Zotero

Fields Zotero lacks go on their own lines at the top of **Extra** (`Key: value`):

| Case | Item type | What to enter |
|---|---|---|
| Exhibition catalogue | Book | Extra: `Genre: cat. exp.` and/or `Event Date: 2002-05-04/2002-09-01` (either makes it a catalogue); add `Event Place: Karlsruhe, ZKM` for the venue, printed only with an Event Date |
| Original edition date `[1989]` | Book | Extra: `Original Date: 1989` (range: `1863/1872`) |
| Publication over several years `1886–1892` | any | Extra: `Issued: 1886/1892` (the Date field keeps only the first year) |
| Essay in an exhibition catalogue | Book Section | Same Extra lines as for the catalogue (`Genre: cat. exp.`, `Event Date:`…) |
| Forthcoming (`à paraître`) | any | Extra: `Status: forthcoming` (date optional → `à paraître en 2014`) |
| Thesis / mémoire | Thesis | Type: `thèse de doctorat inédite` / `mémoire de master inédit`; University |
| Conference proceedings | Conference Paper | Extra: `Event Place: Paris/Rome`, `Event Date: 2000` → `actes du colloque, Paris/Rome, 2000` |
| Lexicon entry (`t. VIII`) | Encyclopedia Article | Volume: `VIII`; institutional editor as a single-field name |
| Online encyclopedia | Encyclopedia Article + URL | Extra: `ISSN: 2677-6588`; Date = date it went online |
| Web page shelfmark | Web Page | Extra: `Call Number: BnF NAL 1203` |
| Archives | Manuscript (or Letter) | Place, Archive (or Institution), Loc. in Archive; pages in Extra: `Page: 57-78` (Manuscript has no Pages field) |
| TV / radio | TV or Radio Broadcast | Program Title, Running Time (`11 min.`), Network |
| Film / VHS | Video Recording | Director, Format (`vidéocassette VHS`), Running Time, Place, Studio |
| Several places/publishers | any | type them as `Lyon/Dijon` and `PUL/Les Presses du réel` |

### Exhibition tags

Zotero has no exhibition-catalogue item type, and **CSL styles cannot read tags**. The
`Exhibition`/`Exhibitions`/`Exhibition catalogs` tags are *automatic tags*. Zotero's MARC
importer turns each subfield of the catalogue record's subject fields (MARC 600–662, including 655
genre/form) into a separate tag. So the tag you get depends on how the library catalogued the
book: LCSH form subdivision `—Exhibitions`, LCGFT genre `Exhibition catalogs`, RAMEAU
`Catalogues d'exposition`, GND `Ausstellungskatalog`, or nothing at all. That is why they look
inconsistent. `zotero/mark-exhibition-catalogues.js` converts those tags into `Genre: cat. exp.`
in Extra (dry run by default).

## Tests

```sh
npm install
npm test            # or: node --import tsx tests/run.ts [filter]
```

On an official Node ≥ 22.18 build you can also run `node tests/run.ts` directly. Some
distribution builds of Node are compiled without TypeScript support, hence `tsx`.

## Known deviations from the printed examples

- Institutional authors print in capitals (CSL 1.0 cannot tell an institution from a family name).
- "in :" is used everywhere; the guide's examples sometimes use "dans".
- `à paraître en 2014` is separated by a comma instead of the guide's `(à paraître en 2014)`.
- In notes, a cited page replaces the article/chapter page range.
- Type `56 et 137`, not `56 et p. 137` (citeproc removes the repeated `p.`).
- Online dates use a 4-digit year (`mis en ligne le 22/06/2020`, guide: `22/06/20`), so year-only
  dates stay readable (`mis en ligne 2020`).
- `Id.` is roman; the guide prints it in italics, which CSL cannot do for the substitute text.
- The main style starts each work's notes with the full reference (right for works *not* in the
  bibliography); use the « notes abrégées » variant when everything cited is in the bibliography.
  Both work for footnotes and endnotes (chosen in the word processor).

## Known limitations

- `Id.` compares the *rendered* names, and *et al.* is not a name. So a team of three or more
  (`JOUBERT Fabienne *et al.*`) collapses into `Id.` after a work by JOUBERT Fabienne alone, or
  after another team with the same first author. Check those entries by hand.
- Zotero versions whose data schema predates January 2026 also export the publication Place as
  the event place (`zotero-schema` commit 7c592c8 separated them). The style therefore never uses
  Event Place alone to detect a catalogue or a conference, and prints it only together with an
  Event Date. On those older versions an Extra `Event Place:` line is ignored (citeproc only reads
  Extra for variables that are still empty), so do not use `Event Date:` there; type venue and
  dates into the genre instead: `Genre: cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002`.
- An encyclopedia entry is formatted as online (`[en ligne]`, URL) when it has a URL and **no
  volume or page**; a printed lexicon with a URL keeps the print layout.
- Two different authors with the same surname and year get their first name in short notes
  (`DUPONT Jean 2000`, `DUPONT Marie 2000`) rather than `2000a`/`2000b`; with different years
  the short form stays `DUPONT 2000`.
- Several undated or forthcoming works by one author are told apart with a letter:
  `DUPONT s. d. a`, `KAENEL à paraître b`.
- Artworks (Zotero Artwork) follow the caption rule of p. 18: artist, title, date, technique
  (Medium), dimensions (Artwork Size), city (Extra `Archive Place: Paris`), Archive.
