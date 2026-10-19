# UNIL – Histoire de l'art (Zotero style)

A Zotero citation style for the Section d'histoire de l'art (UNIL). It follows the
[*Guide du proséminaire (GPS)*](https://www.unil.ch/files/live/sites/lettres/files/04-domaines/hart/05-vie-etudiante/Guide%20du%20pros%c3%a9mianire%20(GPS)_f%c3%a9vrier%202025.pdf),
février 2025, p. 11–18.

## Which file do I want?

| File | Notes look like | Use it when |
|---|---|---|
| `universite-de-lausanne-histoire-de-l-art.csl` | 1st time: full reference. After: `GUADET 1901, p. 40.` | Some cited works are **not** in your bibliography |
| `universite-de-lausanne-histoire-de-l-art-notes-abregees.csl` | Always `GUADET 1901, p. 40.` | Everything you cite is in your bibliography (the guide's normal case: *Les références en bas de page*, p. 17–18) |

The two files only differ in the **notes**; the **bibliography is identical**. So "Create
Bibliography from Items" looks the same with either, unless you set its Output Mode to **Notes**.
Outside Word, Zotero doesn't know which note comes first, so every citation counts as a first
one: the main style then always gives the full reference, notes abrégées always the short one.
Both work for footnotes and endnotes (you choose those in Word / LibreOffice, not in the style).

**Install:** double-click the `.csl` file, or Zotero → Settings → Cite → **+**.
You can switch a document between the two at any time (Zotero → Document Preferences in Word).

**Printable cheat sheet:** [`ZOTERO-GUIDE.md`](ZOTERO-GUIDE.md) goes through the guide section by
section: item type, the line you get, and what to fill in.

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

**The `Id.` trap (Word plugin only; GPS *Normes bibliographiques*, p. 12).** With three or more authors only the first name is printed
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

### Exhibition catalogue (GPS: *Catalogues d’exposition*, p. 14)

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

| You want | Guide section (GPS) | Item type | What to type |
|---|---|---|---|
| `[1989]` (first edition) | *Édition traduite* / *Nouvelle édition et réédition*, p. 14 | Book, Book Section | Original Date field: `1989` |
| `trad. B. Arnal et al.` | *Édition traduite*, p. 14 | any | Translator(s) |
| `4e éd.` | *Nouvelle édition et réédition*, p. 14 | Book | Edition: `4` |
| `(coll. « Quadrige », n° 215)` | *Ouvrages*, p. 13 | Book | Series: `Quadrige`, Series Number: `215` |
| `2 vol.` | *Ouvrages*, p. 13 | Book | # of Volumes: `2` |
| `(éd.)` after the name | *L’auteur·ice·x est directeur·ice·x ou éditeur·ice·x de la publication*, p. 13 | Book | Creator role: Editor |
| `1886–1892` (published over years) | *Sources publiées* / *L’auteur·ice·x est directeur·ice·x…*, p. 13 | any | Extra: `Issued: 1886/1892` (the normal Date field keeps only 1886) |
| `Lyon/Dijon, PUL/Les Presses du réel` | *Plusieurs lieux d’édition et/ou plusieurs maisons d’édition*, p. 13 | any | Place `Lyon/Dijon`, Publisher `PUL/Les Presses du réel` |
| `à paraître` / `à paraître en 2014` | *Ouvrages à paraître* / *Date de parution inconnue*, p. 15–16 | any | Extra: `Status: forthcoming` (+ Date `2014` if known) |
| Thesis / mémoire | *Thèse de doctorat non publiée* / *Mémoire de master non publié*, p. 16 | Thesis | Type: `thèse de doctorat inédite`; University: `Université de Genève` |
| `actes du colloque, Paris/Rome, 2000` | *Actes de colloque*, p. 15 | Conference Paper | Extra: `Event Place: Paris/Rome` and `Event Date: 2000` |
| Lexicon `…, 1987, t. VIII, p. 46` | *Article publié dans un lexique*, p. 15 | Encyclopedia Article | Volume: `VIII`, Pages: `46` |
| Online encyclopedia `[en ligne]` | *Articles d’encyclopédie en ligne*, p. 16 | Encyclopedia Article | URL, Accessed, Date = date put online; no Volume/Pages; Extra: `ISSN: 2677-6588` |
| Web page `(BnF NAL 1203)` | *Sites web*, p. 16 | Web Page | Extra: `Call Number: BnF NAL 1203` |
| Archives `Genève, Archives d’État, Jur. Civ. E, n° 13, p. 57–78` | *Sources non publiées*, p. 12–13 | Manuscript | Place, Archive (or Institution), Loc. in Archive; Extra: `Page: 57-78` |
| TV / radio `extrait de l’émission Misure, 11 min.` | *Filmographie/Documents audio*, p. 16 | TV / Radio Broadcast | Program Title, Running Time `11 min.`, Network |
| Film / VHS | *Filmographie/Documents audio*, p. 16 | Video Recording | Director, Format `vidéocassette VHS`, Running Time, Place, Studio |
| Several pages in a note | *Les références en bas de page*, p. 17–18 | (in the citation dialog) | Page `56 et 137` → `p. 56 et 137` |

**Books added by ISBN** usually need tidying: the artist is often listed as an editor, places
come as `Vanves : Paris` (change to `Vanves/Paris`), and catalogues aren't marked (add
`Genre: cat. exp.`).

## Things the style can't do (and what to do instead)

These happen in both the Word plugin and copy-paste.

| Problem | Guide section (GPS) | Example | Workaround |
|---|---|---|---|
| Institutions come out in capitals | *Sites web*, p. 16 | `BIBLIOTHÈQUE NATIONALE DE FRANCE` (guide: normal case) | Fix by hand in the final text |
| `Id.` is not in italics | *Normes bibliographiques*, p. 12 | `Id.` (guide: *Id.*) | Italicise by hand in the final text |
| `p. 56 et p. 137` | *Les références en bas de page*, p. 18 | becomes `p. 56 et 137` | Fine to leave, or fix by hand |
| A range as first-edition date | *Nouvelle édition et réédition*, p. 14 (VIOLLET-LE-DUC) | `[1863–1872]` becomes `[1863]` | Fix by hand |
| Online dates | *Articles d’encyclopédie en ligne*, p. 16 | `mis en ligne le 22/06/2020` (guide: `22/06/20`) | Deliberate: a year-only date would otherwise print as `mis en ligne 20` |

Other deliberate choices where the guide contradicts itself: always `in :` (*Article ou chapitre
dans un ouvrage collectif*, p. 15, says it is obligatory, but its examples also use `dans`);
`, à paraître en 2014` with a comma (*Ouvrages à paraître*, p. 15); in a note, the cited page
replaces an article's page range (*Les références en bas de page*, p. 17).

## For developers

```sh
npm install
npm test          # 138 citeproc-js tests built from the guide's examples and real Zotero data
npm run build     # regenerate the "notes abrégées" variant after editing the main style
```

Only edit `universite-de-lausanne-histoire-de-l-art.csl`; the variant is generated from it (the
tests fail if you forget `npm run build`). On some Linux Node builds TypeScript isn't built in,
hence `tsx`.
