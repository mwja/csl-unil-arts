# Mini-guide — the Extra field & other tricks (UNIL Histoire de l'art)

Zotero has no field for some things the guide needs. Type them in **Extra**, one per line, at the
top: `Name: value`. Example for an exhibition catalogue (item type **Book**):

```
Genre: cat. exp.
Event Place: Karlsruhe, ZKM
Event Date: 2002-05-04/2002-09-01
```

→ *Iconoclash…*, **cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002**, Cambridge (Mass.), The MIT Press, 2002.

| You want | Item type | Type this | GPS |
|---|---|---|---|
| **cat. exp.** | Book | Extra `Genre: cat. exp.` | p. 14 |
| exhibition **place + dates** | Book | Extra `Event Place: …` + `Event Date: 2002-05-04/2002-09-01` (place only prints with a date) | p. 14 |
| essay **in** a catalogue | Book Section | same Extra lines as the catalogue | p. 14 |
| catalogue, **Zotero before 2026** | Book | everything in one line: `Genre: cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002` | p. 14 |
| **1886–1892** (several years) | any | Extra `Issued: 1886/1892` (the Date field keeps only 1886) | p. 13 |
| **[1989]** (first edition) | Book, Book Section | *Original Date* field: `1989` (a range like `[1863–1872]` must be fixed by hand) | p. 14 |
| **à paraître** / **à paraître en 2014** | any | Extra `Status: forthcoming` (+ Date `2014` if known) | p. 15–16 |
| **s. d.** (no date) | any | leave Date empty, no Status | — |
| **actes du colloque, Paris/Rome, 2000** | Conference Paper | Extra `Event Place: Paris/Rome` + `Event Date: 2000` | p. 15 |
| archive pages **p. 57–78** | Manuscript | Extra `Page: 57-78` (Manuscript has no Pages field) | p. 12–13 |
| artwork city **Paris** | Artwork | Extra `Archive Place: Paris` (or the Place field) | p. 18 |
| **(ISSN 2677-6588)** | Encyclopedia Article (online) | Extra `ISSN: 2677-6588`; no Volume/Pages, or it prints as a paper lexicon | p. 16 |
| **(BnF NAL 1203)** | Web Page | Extra `Call Number: BnF NAL 1203` | p. 16 |

**Not in Extra, but easy to get wrong**

- Two places / publishers: `Lyon/Dijon`, `PUL/Les Presses du réel` (ISBN imports give `Vanves : Paris` — change it).
- ISBN imports often list the artist as an **Editor** and never mark catalogues: check both.
- Editors of a book: role **Editor** → `NOM Prénom (éd.)`. Translators: role **Translator** → `trad. B. Arnal`.
- `4e éd.`: Edition `4`. `2 vol.`: # of Volumes `2`. `(coll. « Quadrige », n° 215)`: Series + Series Number.
- Thesis: Type `thèse de doctorat inédite` (or `mémoire de master inédit`), University.
- Several pages in a note: Page `56 et 137` → `p. 56 et 137`.

**Fix by hand in the final text:** institutions print in CAPITALS; *Id.* isn't italic; in the
Word plugin, an *Id.* after a work by 3+ authors (`NOM et al.`) may be wrong — check it (or use
the « noms complets » style, which avoids it).
