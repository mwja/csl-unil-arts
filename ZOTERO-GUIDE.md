# Zotero cheat sheet — UNIL Histoire de l'art (GPS, février 2025)

One entry per section of the *Guide du proséminaire* (p. 12–18), in the guide's order. Each
shows the Zotero item type, a complete line as the style prints it, with **the part that entry
is about in bold**, and what to fill in.

**Extra field:** Zotero lacks a few fields the guide needs. Type them on their own lines at the
top of the item's **Extra** field, as `Name: value` (e.g. `Genre: cat. exp.`).

---

## Normes bibliographiques — p. 12

### Plusieurs titres d'un·e même auteur·ice (*Id.*)

**Item type:** any

> JOUBERT Fabienne, *La Tapisserie au Moyen Âge*, Rennes, Éd. Ouest-France, 2000.
>
> **Id.**, *La Sculpture gothique en France, XIIe-XIIIe siècles*, Paris, Picard, 2008.

- Nothing to do: Zotero adds *Id.* and sorts the works oldest first.
- Italicise *Id.* by hand in the final text (a style can't).
- Check *Id.* after a work by three or more authors (`NOM Prénom et al.`): Zotero may wrongly
  merge them. Only happens when Zotero builds the whole list at once (Word plugin).

---

## Sources — p. 12–13

### Sources non publiées

**Item type:** Manuscript (or Letter)

> *Testament olographe de Jacques-Antoine Arlaud*, 6 avril 1740, **Genève, Archives d’État, Jur. Civ. E, n° 13, p. 57–78**.

- Place: `Genève` · Archive (or Institution): `Archives d’État` · Loc. in Archive: `Jur. Civ. E, n° 13`
- Extra: `Page: 57-78` (Manuscript has no Pages field)

### Sources publiées

**Item type:** Book

> **DUCHESNE Louis (éd.)**, *Le Liber Pontificalis*, Paris, E. Thorin, **1886–1892, 2 vol.**

- Louis Duchesne as **Editor** (not Author).
- Several years: Extra `Issued: 1886/1892` (the Date field keeps only the first year).
- # of Volumes: `2`.
- No author at all (e.g. *Chronique du Mont-Saint-Michel…*): leave Author empty, the title comes first.

---

## Ouvrages — p. 13

**Item type:** Book

> NÉRAUDAU Jean-Pierre, *Dictionnaire d’histoire de l’art*, Paris, PUF **(coll. « Quadrige », n° 215)**, 1996.

- Series: `Quadrige` · Series Number: `215`

> FAURE Élie, *Histoire de l’art*, Paris, J.-J. Pauvert, 1972, **2 vol.**

- # of Volumes: `2`

> GUADET Julien, *Éléments et théorie de l’architecture*, Paris, Librairie de la construction moderne, **vol. 2**, 1901.

- Volume (the one you consulted): `2`

### Deux auteur·ice·s

> **MULLER Joseph-Émile et ELGAR Frank**, *Cent ans de peinture moderne*, Paris, Hazan, 1979.

- Enter both authors.

### Plus de deux auteur·ice·s

> **GÉRARD André-Marie *et al.***, *Dictionnaire de la Bible*, Paris, Robert Laffont, 1989.

- Enter **all** authors; the style keeps the first and adds *et al.*

### L'auteur·ice est directeur·ice ou éditeur·ice de la publication

> **ROMANINI Angiola Maria (éd.)**, *Enciclopedia dell’arte medievale*, Rome, Istituto della Enciclopedia italiana, 1991–2002, 12 vol.

- Creator role: **Editor**.

### Plusieurs lieux et/ou plusieurs maisons d'édition

> BELTING Hans, *La double perspective : la science arabe et l’art de la Renaissance*, **Lyon/Dijon, PUL/Les Presses du réel**, 2010.

- Place: `Lyon/Dijon` · Publisher: `PUL/Les Presses du réel`
- Books added by ISBN often come as `Vanves : Paris` / `Hazan ; Culturespaces`: change to `/`.

### Édition traduite — p. 14

> FELICI Lucio, *Encyclopédie de l’art*, **trad. B. Arnal *et al.***, [Paris], Librairie générale française (coll. « Le livre de poche. Encyclopédies d’aujourd’hui »), 1992.

- Add the translator(s) with role **Translator**.

> FREEDBERG David, *Le Pouvoir des images* **[1989]**, Paris, Gérard Monfort, 1998.

- Original Date: `1989`

### Nouvelle édition et réédition — p. 14

> JANSON Horst Woldemar, *Histoire de l’art : panorama des arts plastiques des origines à nos jours* [1970], **4e éd.**, Paris, Ars Mundi, 1987.

- Edition: `4` (prints `4e éd.`, superscript in Word)

> VIOLLET-LE-DUC Eugène-Emmanuel, *Entretiens sur l’architecture* **[1863–1872]**, Gollion, Infolio, 2010.

- Original Date keeps only the first year (`[1863]`): fix the range by hand in the final text.

### Catalogues d'exposition — p. 14

**Item type:** Book

> LATOUR Bruno et WEIBEL Peter (éd.), *Iconoclash. Beyond the Image Wars in Science, Religion and Art*, **cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002**, Cambridge (Mass.), The MIT Press, 2002.

- Extra:
  ```
  Genre: cat. exp.
  Event Place: Karlsruhe, ZKM
  Event Date: 2002-05-04/2002-09-01
  ```
- `Genre: cat. exp.` alone is enough to mark it as a catalogue; the venue only prints with an `Event Date`.
- Catalogues are sorted by title in the bibliography.
- Older Zotero (before 2026): put it all in the genre: `Genre: cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002`.
- Essay *in* a catalogue: item type Book Section, same Extra lines.

> *Gisants et tombeaux de la Basilique de Saint-Denis*, **cat. exp.**, Paris, Archives départementales de la Seine–Saint-Denis, 1976.

- No author or editor: leave them empty, the title comes first.

---

## Articles — p. 14–15

### Article dans une revue

**Item type:** Journal Article

> TOUBERT Pierre, « Le règne de Charles le Chauve : bilan et perspectives », in : *Le Moyen Age : revue d’histoire et de philologie*, **vol. 89, n° 3–4**, 1983, **p. 441–456**.

- Volume: `89` · Issue: `3-4` · Pages: `441-456`
- A JSTOR/Persée URL is never printed, as the guide asks.

### Article ou chapitre dans un ouvrage collectif

**Item type:** Book Section

> WIRTH Jean, « Image et relique dans le christianisme occidental », in : **BORGEAUD Philippe et VOLOKHINE Youri (éd.)**, *Les Objets de la mémoire : pour une approche comparatiste des reliques et de leur culte*, Berne/Berlin, Peter Lang, 2005, p. 325–345.

- Book's editors with role **Editor**; Book Title; Pages.

### Article dans un ouvrage collectif sans mention de directeur·ice

> PORCHER Jean, « Les Manuscrits à peinture », **in : *L’Empire carolingien***, Paris, Gallimard, 1968, p. 69–203.

- Just leave the editors out. (The style always writes `in :`.)

### Ouvrage collectif écrit ou édité par plus de trois personnes

> VAISSE Pierre, « Courajod et le problème de la Renaissance », in : **RECHT Roland *et al.* (éd.)**, *Histoire de l’histoire de l’art en France au XIXe siècle*, Paris, La documentation française, 2008, p. 95–112.

- Enter **all** editors; with four or more, only the first is printed.

### Article dans des mélanges en l'honneur d'une personne

> PRADERVAND Brigitte, « Andreas Stoss, peintre des châteaux baillivaux vaudois au XVIe siècle », in : LÜTHI Dave et BOCK Nicolas (éd.), ***Petit précis patrimonial : mélanges en l’honneur de Gaëtan Cassina***, Lausanne, Edimento, 2008, p. 235–246.

- Same as any Book Section; « mélanges en l’honneur de… » is part of the Book Title.

### Article publié dans un lexique

**Item type:** Encyclopedia Article (or Dictionary Entry)

> KOBLER Friedrich, « Fensterrose », in : *Reallexikon zur Deutschen Kunstgeschichte*, **éd. Zentralinstitut für Kunstgeschichte Munich**, Munich, Beck, 1987, **t. VIII, p. 46**.

- Institutional editor as a single-field name, role **Editor** · Volume: `VIII` · Pages: `46`

### Actes de colloque

**Item type:** Conference Paper

> MICHEL Christian, « Bellori et l’Académie royale de Peinture et de Sculpture : une admiration bien tempérée », in : BONFAIT Olivier (éd.), *L’Idéal classique. Les échanges artistiques entre Paris et Rome au temps de Bellori*, **actes du colloque, Paris/Rome, 2000**, Paris/Rome, Somogy, 2002, p. 105–116.

- Proceedings Title = the book · Extra: `Event Place: Paris/Rome` and `Event Date: 2000`

---

## Inédits — p. 15–16

### Ouvrages à paraître

**Item type:** any (here Book Section)

> IMESCH-OECHSLIN Kornelia, « Ville, urbanisme et branding. HafenCity Hamburg & Saadiyat Island Cultural District », in : *Utopia and the Reality of Urbanism in the 20th Century*, **à paraître en 2014**.

- Extra: `Status: forthcoming` · Date: `2014`

### Date de parution inconnue

> KAENEL Philippe, « Véronique et imaginaire photographique au XXe siècle », in : SAINT-MARTIN Isabelle et RINUY Paul-Louis (éd.), *Sainte Face, visage de Dieu, visage de l’homme dans l’art contemporain*, **à paraître**.

- Extra: `Status: forthcoming` · leave Date empty.
- An old work with no date (not forthcoming): leave Date empty and no Status → `s. d.`

### Thèse de doctorat non publiée

**Item type:** Thesis

> EIDENBENZ Céline, *Expressions du déséquilibre : l’hystérie, l’artiste et le médecin (1870–1914)*, **thèse de doctorat inédite, Université de Genève**, 2010.

- Type: `thèse de doctorat inédite` · University: `Université de Genève`

### Mémoire de master non publié

> CERUTTI Damien, *La Formation et l’œuvre de jeunesse du peintre Lorenzo di Pietro dit « Vecchietta »*, **mémoire de licence inédit, Université de Lausanne**, 2007.

- Type: `mémoire de master inédit` (or as on the document) · University

---

## Filmographie / Documents audio — p. 16

### Émission de télévision ou de radio

**Item type:** TV Broadcast / Radio Broadcast

> LEHNER Paolo, *Massimo Cavalli*, **extrait de l’émission *Misure*, 11 min.**, 7 novembre 1967, **RTSI**.

- Program Title: `Misure` · Running Time: `11 min.` · Date · Network: `RTSI`

### Film, vidéocassette, document audio

**Item type:** Video Recording / Audio Recording

> PACHE Gilles, *La tête buissonnante : Jean-Claude Hesselbarth. Une vie d’artiste*, **vidéocassette VHS, 44 min.**, Lausanne, Parallaxe Film [producteur], Genève, RSR [diffuseur], 1988.

- Director · Format: `vidéocassette VHS` · Running Time: `44 min.` · Place: `Lausanne`
- Studio: `Parallaxe Film [producteur], Genève, RSR [diffuseur]` (Zotero has one field for both)

---

## Sites web — p. 16

**Item type:** Web Page

> BIBLIOTHÈQUE NATIONALE DE FRANCE, bibliothèque numérique Gallica, *Évangéliaire dit de Charlemagne ou de Godescalc* [en ligne], **(BnF NAL 1203)**, https://gallica.bnf.fr/ark:/12148/btv1b6000718s **(consulté le 1er décembre 2015)**.

- Author: institution as a single-field name · Website Title: `bibliothèque numérique Gallica`
- Extra: `Call Number: BnF NAL 1203` · URL · Accessed: `2015-12-01`
- The guide writes the institution in normal case (`Bibliothèque nationale de France`); the style can't, so fix it by hand in the final text.

## Articles d'encyclopédie en ligne — p. 16

**Item type:** Encyclopedia Article

> KOERING Jérémie, « Maniérisme », *Encyclopédie d’histoire numérique de l’Europe* **[en ligne], (ISSN 2677-6588), mis en ligne le 22/06/2020**, https://ehne.fr/fr/node/12388 **(consulté le 17 septembre 2024)**.

- Date: the date it went online · URL · Accessed · Extra: `ISSN: 2677-6588`
- No Volume or Pages (otherwise it's printed as a paper lexicon).
- The year prints in full (`2020`, guide: `20`).

---

## Notes de bas de page — p. 17–18

### Première note, puis notes suivantes (main style)

> GUADET Julien, *Éléments et théorie de l’architecture, cours professé à l’École nationale et spéciale des Beaux-Arts*, Paris, Librairie de la construction moderne, 1901, **p. 499**.
>
> **GUADET 1901, p. 40.**

- Page goes in the citation dialog (Page: `499`).
- From the second note on, Zotero writes the short form by itself (Word plugin).

### Notes abrégées dès la première note (variant style)

> **WERKNER 1994, p. 56 et 137.**

- Use the style « notes abrégées » when everything you cite is in your bibliography.
- Several pages: type `56 et 137` (the guide's `p. 56 et p. 137` is not possible).

### Titre seul (pas d'auteur·ice)

> ***Notice historique sur la gymnastique à Genève : centenaire de l’Association genevoise de gymnastique, 1873-1973*, 1973, p. 10.**

- Leave Author empty; the short note uses the full title and the year.
