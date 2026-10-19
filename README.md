# UNIL – Histoire de l'art (Zotero style)

A Zotero citation style for the Section d'histoire de l'art (UNIL). It follows the
[*Guide du proséminaire (GPS)*](https://www.unil.ch/files/live/sites/lettres/files/04-domaines/hart/05-vie-etudiante/Guide%20du%20pros%c3%a9mianire%20(GPS)_f%c3%a9vrier%202025.pdf),
février 2025, p. 11–18.

## Which file do I want?

| File | Notes look like | Use it when |
|---|---|---|
| `universite-de-lausanne-histoire-de-l-art.csl` | 1st time: full reference. After: `GUADET 1901, p. 40.` | Some cited works are **not** in your bibliography |
| `universite-de-lausanne-histoire-de-l-art-notes-abregees.csl` | Always `GUADET 1901, p. 40.` | Everything you cite is in your bibliography (the guide's normal case, p. 18) |

Both give the same bibliography, and both work for footnotes and endnotes (you choose those in
Word / LibreOffice, not in the style).

**Install:** double-click the `.csl` file, or Zotero → Settings → Cite → **+**.
You can switch a document between the two at any time (Zotero → Document Preferences in Word).

## What you get

```
NÉRAUDAU Jean-Pierre, Dictionnaire d’histoire de l’art, Paris, PUF (coll. « Quadrige », n° 215), 1996.
MULLER Joseph-Émile et ELGAR Frank, Cent ans de peinture moderne, Paris, Hazan, 1979.
GÉRARD André-Marie et al., Dictionnaire de la Bible, Paris, Robert Laffont, 1989.
TOUBERT Pierre, « Le règne de Charles le Chauve », in : Le Moyen Age, vol. 89, n° 3–4, 1983, p. 441–456.
WIRTH Jean, « Image et relique… », in : BORGEAUD Philippe et VOLOKHINE Youri (éd.), Les Objets de la mémoire…, Berne/Berlin, Peter Lang, 2005, p. 325–345.
JOUBERT Fabienne, La Tapisserie au Moyen Âge, Rennes, Éd. Ouest-France, 2000.
Id., La Sculpture gothique en France…, Paris, Picard, 2008.
```

Bibliography: alphabetical, then oldest first; exhibition catalogues are sorted by their title.

**Sources vs Études:** a style can't split these. Put them in two Zotero collections and make
two bibliographies.

## Word plugin or copy-paste? (it matters for a few things)

Some problems only happen when Zotero builds the whole bibliography at once — the Word /
LibreOffice plugin, or selecting several items and using "Create Bibliography from Items".
Zotero then compares neighbouring entries to add `Id.` and the letters in `1901a` / `1901b`.

| | Word plugin (whole list at once) | Copy-paste one item at a time |
|---|---|---|
| `Id.` | Added automatically, **but** can be wrong (see below) | Never added — type it yourself |
| `1901a` / `1901b` | Added automatically | Never added — type them yourself |
| Your hand edits | Overwritten on every refresh (unless you "Unlink Citations" first) | Stay as you typed them |

**The `Id.` trap (Word plugin only).** With three or more authors only the first name is printed
(`JOUBERT Fabienne et al.`), and Zotero doesn't count *et al.* as a name. So it thinks this is the
same author as the line above:

```
JOUBERT Fabienne, La Tapisserie, 2000.
Id., Autre livre, 2001.          ← should be: JOUBERT Fabienne et al., Autre livre, 2001.
```

Fix: when your paper is finished, check `Id.` lines that follow someone who also wrote with a
team, and correct them by hand (after "Unlink Citations" on a copy of the document). Copy-pasting
one item at a time avoids it completely.

## How to enter things in Zotero

Zotero is missing a few fields the guide needs. You type those on their own lines at the top of
the **Extra** field, as `Name: value`.

### Exhibition catalogue

Item type **Book**. In Extra:

```
Genre: cat. exp.
Event Place: Karlsruhe, ZKM
Event Date: 2002-05-04/2002-09-01
```

→ `LATOUR Bruno et WEIBEL Peter (éd.), Iconoclash…, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), The MIT Press, 2002.`

- `Genre: cat. exp.` alone is enough to mark it as a catalogue (`Genre: catalogue d’exposition` works too).
- The exhibition place is only printed if you also give `Event Date`.
- An essay *inside* a catalogue: item type **Book Section**, same Extra lines.
- **Older Zotero (before 2026):** `Event Place` in Extra is ignored there. Put everything in the
  genre instead: `Genre: cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002` (and no `Event Date`).

**Why not use the "Exhibition catalogs" tags?** Styles can't see tags at all. Those tags come from
the library catalogue the book was imported from, so they vary (`Exhibitions`,
`Exhibition catalogs`, `Catalogues d'exposition`, …, or none). The script
`zotero/mark-exhibition-catalogues.js` (Zotero → Tools → Developer → Run JavaScript) adds
`Genre: cat. exp.` to every book carrying one of those tags. It only lists them until you set
`DRY_RUN = false`.

### Other cases

| You want | Item type | What to type |
|---|---|---|
| `[1989]` (first edition) | Book, Book Section | Original Date field: `1989` |
| `1886–1892` (published over years) | any | Extra: `Issued: 1886/1892` (the normal Date field keeps only 1886) |
| `4e éd.` | Book | Edition: `4` |
| `(coll. « Quadrige », n° 215)` | Book | Series: `Quadrige`, Series Number: `215` |
| `2 vol.` | Book | # of Volumes: `2` |
| `à paraître` / `à paraître en 2014` | any | Extra: `Status: forthcoming` (+ Date `2014` if known) |
| Thesis / mémoire | Thesis | Type: `thèse de doctorat inédite`; University: `Université de Genève` |
| `actes du colloque, Paris/Rome, 2000` | Conference Paper | Extra: `Event Place: Paris/Rome` and `Event Date: 2000` |
| Lexicon `…, 1987, t. VIII, p. 46` | Encyclopedia Article | Volume: `VIII`, Pages: `46` |
| Online encyclopedia `[en ligne]` | Encyclopedia Article | URL, Accessed, Date = date put online; no Volume/Pages; Extra: `ISSN: 2677-6588` |
| Web page `(BnF NAL 1203)` | Web Page | Extra: `Call Number: BnF NAL 1203` |
| Archives `Genève, Archives d’État, Jur. Civ. E, n° 13, p. 57–78` | Manuscript | Place, Archive (or Institution), Loc. in Archive; Extra: `Page: 57-78` |
| TV / radio `extrait de l’émission Misure, 11 min.` | TV / Radio Broadcast | Program Title, Running Time `11 min.`, Network |
| Film / VHS | Video Recording | Director, Format `vidéocassette VHS`, Running Time, Place, Studio |
| Two places or publishers | any | `Lyon/Dijon`, `PUL/Les Presses du réel` |
| Several pages in a note | (in the citation dialog) | Page `56 et 137` → `p. 56 et 137` |

**Books added by ISBN** usually need tidying: the artist is often listed as an editor, places
come as `Vanves : Paris` (change to `Vanves/Paris`), and catalogues aren't marked (add
`Genre: cat. exp.`).

## Things the style can't do (and what to do instead)

These happen in both the Word plugin and copy-paste.

| Problem | Example | Workaround |
|---|---|---|
| Institutions come out in capitals | `BIBLIOTHÈQUE NATIONALE DE FRANCE` (guide: normal case) | Fix by hand in the final text |
| `Id.` is not in italics | `Id.` (guide: *Id.*) | Italicise by hand in the final text |
| `p. 56 et p. 137` | becomes `p. 56 et 137` | Fine to leave, or fix by hand |
| A range as first-edition date | `[1863–1872]` becomes `[1863]` | Fix by hand |
| Online dates | `mis en ligne le 22/06/2020` (guide: `22/06/20`) | Deliberate: a year-only date would otherwise print as `mis en ligne 20` |

Other deliberate choices where the guide contradicts itself: always `in :` (the guide also uses
`dans`); `, à paraître en 2014` with a comma; in a note, the cited page replaces an article's page
range.

## For developers

```sh
npm install
npm test          # 138 citeproc-js tests built from the guide's examples and real Zotero data
npm run build     # regenerate the "notes abrégées" variant after editing the main style
```

Only edit `universite-de-lausanne-histoire-de-l-art.csl`; the variant is generated from it (the
tests fail if you forget `npm run build`). On some Linux Node builds TypeScript isn't built in,
hence `tsx`.
