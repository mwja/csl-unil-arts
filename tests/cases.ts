// Test cases taken from the Guide du proséminaire (GPS), février 2025, p. 12-18.
// Items are CSL-JSON, i.e. what Zotero hands to the style. Fields that Zotero has no
// dedicated field for (genre on books, event-place, event-date, status, call-number...)
// are entered in Zotero's Extra field, e.g. "Event Place: Karlsruhe, ZKM". Zotero passes Extra to
// the processor as the `note` variable; multi-year dates are only possible that way
// (Extra "Issued: 1879/1883"), so those cases use `note`.
// Where the expected output deviates from the guide's printed example, a comment says why.

import { readFileSync } from "node:fs";

export type Name = { family?: string; given?: string; literal?: string };
export type Item = { id: string; type: string; [key: string]: unknown };

const n = (family: string, given: string): Name => ({ family, given });
const y = (...years: number[]) => ({ "date-parts": years.map((yr) => [yr]) });
const d = (...parts: number[]) => ({ "date-parts": [parts] });
const range = (a: number[], b: number[]) => ({ "date-parts": [a, b] });

export const cases: { name: string; item: Item; bib: string }[] = [
  // ---------- Sources ----------
  {
    // Zotero's Manuscript type has no Pages field: enter "Page: 57-78" in Extra.
    name: "Source non publiée (archives)",
    item: {
      id: "arlaud-testament", type: "manuscript",
      title: "Testament olographe de Jacques-Antoine Arlaud",
      issued: d(1740, 4, 6), "publisher-place": "Genève", archive: "Archives d’État",
      archive_location: "Jur. Civ. E, n° 13", page: "57-78",
    },
    bib: "*Testament olographe de Jacques-Antoine Arlaud*, 6 avril 1740, Genève, Archives d’État, Jur. Civ. E, n° 13, p. 57–78.",
  },
  {
    name: "Source publiée sans auteur",
    item: {
      id: "chronique", type: "book",
      title: "Chronique du Mont-Saint-Michel (1343–1468) publiée avec notes et pièces diverses relatives au Mont Saint-Michel et à la défense nationale en Basse Normandie pendant l’occupation anglaise par Siméon Luce",
      "publisher-place": "Paris", publisher: "F. Didot", note: "issued: 1879/1883", "number-of-volumes": "2",
    },
    bib: "*Chronique du Mont-Saint-Michel (1343–1468) publiée avec notes et pièces diverses relatives au Mont Saint-Michel et à la défense nationale en Basse Normandie pendant l’occupation anglaise par Siméon Luce*, Paris, F. Didot, 1879–1883, 2 vol.",
  },
  {
    name: "Source publiée par un éditeur scientifique",
    item: {
      id: "duchesne", type: "book", editor: [n("Duchesne", "Louis")],
      title: "Le Liber Pontificalis", "publisher-place": "Paris", publisher: "E. Thorin",
      note: "issued: 1886/1892", "number-of-volumes": "2",
    },
    bib: "DUCHESNE Louis (éd.), *Le Liber Pontificalis*, Paris, E. Thorin, 1886–1892, 2 vol.",
  },
  // ---------- Ouvrages ----------
  {
    name: "Ouvrage avec collection",
    item: {
      id: "neraudau", type: "book", author: [n("Néraudau", "Jean-Pierre")],
      title: "Dictionnaire d’histoire de l’art", "publisher-place": "Paris", publisher: "PUF",
      "collection-title": "Quadrige", "collection-number": "215", issued: y(1996),
    },
    bib: "NÉRAUDAU Jean-Pierre, *Dictionnaire d’histoire de l’art*, Paris, PUF (coll. « Quadrige », n° 215), 1996.",
  },
  {
    name: "Ouvrage en plusieurs volumes",
    item: {
      id: "faure", type: "book", author: [n("Faure", "Élie")], title: "Histoire de l’art",
      "publisher-place": "Paris", publisher: "J.-J. Pauvert", issued: y(1972), "number-of-volumes": "2",
    },
    bib: "FAURE Élie, *Histoire de l’art*, Paris, J.-J. Pauvert, 1972, 2 vol.",
  },
  {
    name: "Volume consulté",
    item: {
      id: "guadet-t2", type: "book", author: [n("Guadet", "Julien")],
      title: "Éléments et théorie de l’architecture", volume: "2",
      "publisher-place": "Paris", publisher: "Librairie de la construction moderne", issued: y(1901),
    },
    bib: "GUADET Julien, *Éléments et théorie de l’architecture*, Paris, Librairie de la construction moderne, vol. 2, 1901.",
  },
  {
    name: "Deux auteurs",
    item: {
      id: "muller", type: "book", author: [n("Muller", "Joseph-Émile"), n("Elgar", "Frank")],
      title: "Cent ans de peinture moderne", "publisher-place": "Paris", publisher: "Hazan", issued: y(1979),
    },
    bib: "MULLER Joseph-Émile et ELGAR Frank, *Cent ans de peinture moderne*, Paris, Hazan, 1979.",
  },
  {
    name: "Plus de deux auteurs (et al. en italique)",
    item: {
      id: "gerard", type: "book",
      author: [n("Gérard", "André-Marie"), n("Nordon-Gérard", "Andrée"), n("Tollet", "Daniel")],
      title: "Dictionnaire de la Bible", "publisher-place": "Paris", publisher: "Robert Laffont", issued: y(1989),
    },
    bib: "GÉRARD André-Marie *et al.*, *Dictionnaire de la Bible*, Paris, Robert Laffont, 1989.",
  },
  {
    name: "Directeur·ice de la publication",
    item: {
      id: "romanini", type: "book", editor: [n("Romanini", "Angiola Maria")],
      title: "Enciclopedia dell’arte medievale", "publisher-place": "Rome",
      publisher: "Istituto della Enciclopedia italiana", note: "issued: 1991/2002", "number-of-volumes": "12",
    },
    bib: "ROMANINI Angiola Maria (éd.), *Enciclopedia dell’arte medievale*, Rome, Istituto della Enciclopedia italiana, 1991–2002, 12 vol.",
  },
  {
    name: "Plusieurs lieux et maisons d’édition",
    item: {
      id: "belting", type: "book", author: [n("Belting", "Hans")],
      title: "La double perspective : la science arabe et l’art de la Renaissance",
      "publisher-place": "Lyon/Dijon", publisher: "PUL/Les Presses du réel", issued: y(2010),
    },
    bib: "BELTING Hans, *La double perspective : la science arabe et l’art de la Renaissance*, Lyon/Dijon, PUL/Les Presses du réel, 2010.",
  },
  {
    name: "Édition traduite (traducteur·ice·s)",
    item: {
      id: "felici", type: "book", author: [n("Felici", "Lucio")], title: "Encyclopédie de l’art",
      translator: [n("Arnal", "B."), n("Dupont", "C."), n("Martin", "D.")],
      "publisher-place": "[Paris]", publisher: "Librairie générale française",
      "collection-title": "Le livre de poche. Encyclopédies d’aujourd’hui", issued: y(1992),
    },
    bib: "FELICI Lucio, *Encyclopédie de l’art*, trad. B. Arnal *et al.*, [Paris], Librairie générale française (coll. « Le livre de poche. Encyclopédies d’aujourd’hui »), 1992.",
  },
  {
    name: "Édition traduite (date originale)",
    item: {
      id: "freedberg", type: "book", author: [n("Freedberg", "David")], title: "Le Pouvoir des images",
      "original-date": y(1989), "publisher-place": "Paris", publisher: "Gérard Monfort", issued: y(1998),
    },
    bib: "FREEDBERG David, *Le Pouvoir des images* [1989], Paris, Gérard Monfort, 1998.",
  },
  {
    name: "Nouvelle édition",
    item: {
      id: "janson", type: "book", author: [n("Janson", "Horst Woldemar")],
      title: "Histoire de l’art : panorama des arts plastiques des origines à nos jours",
      "original-date": y(1970), edition: "4", "publisher-place": "Paris", publisher: "Ars Mundi", issued: y(1987),
    },
    bib: "JANSON Horst Woldemar, *Histoire de l’art : panorama des arts plastiques des origines à nos jours* [1970], 4e éd., Paris, Ars Mundi, 1987.",
  },
  {
    // Zotero 10 keeps only the first year of an Original Date range (Extra "Original Date:" is
    // migrated into the field); this range is what citeproc would need, see README.
    name: "Réédition (date originale sur plusieurs années)",
    item: {
      id: "viollet", type: "book", author: [n("Viollet-le-Duc", "Eugène-Emmanuel")],
      title: "Entretiens sur l’architecture", "original-date": range([1863], [1872]),
      "publisher-place": "Gollion", publisher: "Infolio", issued: y(2010),
    },
    bib: "VIOLLET-LE-DUC Eugène-Emmanuel, *Entretiens sur l’architecture* [1863–1872], Gollion, Infolio, 2010.",
  },
  // ---------- Catalogues d'exposition ----------
  {
    name: "Catalogue d’exposition (exemple du guide, Extra « Genre: cat. exp. »)",
    item: {
      id: "iconoclash-guide", type: "book", editor: [n("Latour", "Bruno"), n("Weibel", "Peter")],
      title: "Iconoclash. Beyond the Image Wars in Science, Religion and Art", genre: "cat. exp.",
      "publisher-place": "ZKM Karlsruhe", publisher: "The MIT Press", issued: y(2002),
    },
    bib: "LATOUR Bruno et WEIBEL Peter (éd.), *Iconoclash. Beyond the Image Wars in Science, Religion and Art*, cat. exp., ZKM Karlsruhe, The MIT Press, 2002.",
  },
  {
    // The guide's rule asks for the exhibition's place and dates; its own example omits them.
    name: "Catalogue d’exposition (lieu et dates de l’exposition via Extra)",
    item: {
      id: "iconoclash-full", type: "book", editor: [n("Latour", "Bruno"), n("Weibel", "Peter")],
      title: "Iconoclash. Beyond the Image Wars in Science, Religion and Art",
      "event-place": "Karlsruhe, ZKM", "event-date": range([2002, 5, 4], [2002, 9, 1]),
      "publisher-place": "Cambridge (Mass.)", publisher: "The MIT Press", issued: y(2002),
    },
    bib: "LATOUR Bruno et WEIBEL Peter (éd.), *Iconoclash. Beyond the Image Wars in Science, Religion and Art*, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), The MIT Press, 2002.",
  },
  {
    name: "Catalogue d’exposition sans auteur",
    item: {
      id: "gisants", type: "book", title: "Gisants et tombeaux de la Basilique de Saint-Denis",
      genre: "cat. exp.", "publisher-place": "Paris",
      publisher: "Archives départementales de la Seine–Saint-Denis", issued: y(1976),
    },
    bib: "*Gisants et tombeaux de la Basilique de Saint-Denis*, cat. exp., Paris, Archives départementales de la Seine–Saint-Denis, 1976.",
  },
  {
    name: "Catalogue d’exposition (genre en toutes lettres)",
    item: {
      id: "cat-long", type: "book", title: "Hodler et Genève", genre: "catalogue d’exposition",
      "event-place": "Genève, Musée Rath", "event-date": range([2018, 4, 20], [2018, 8, 19]),
      "publisher-place": "Genève", publisher: "MAH", issued: y(2018),
    },
    bib: "*Hodler et Genève*, catalogue d’exposition, Genève, Musée Rath, 20 avril–19 août 2018, Genève, MAH, 2018.",
  },
  // ---------- Articles ----------
  {
    name: "Article dans une revue",
    item: {
      id: "toubert", type: "article-journal", author: [n("Toubert", "Pierre")],
      title: "Le règne de Charles le Chauve : bilan et perspectives",
      "container-title": "Le Moyen Age : revue d’histoire et de philologie",
      volume: "89", issue: "3-4", issued: y(1983), page: "441-456",
      URL: "https://www.jstor.org/stable/xxxx", // JSTOR/Persée URL must not be printed
    },
    bib: "TOUBERT Pierre, « Le règne de Charles le Chauve : bilan et perspectives », in : *Le Moyen Age : revue d’histoire et de philologie*, vol. 89, n° 3–4, 1983, p. 441–456.",
  },
  {
    name: "Article ou chapitre dans un ouvrage collectif",
    item: {
      id: "wirth", type: "chapter", author: [n("Wirth", "Jean")],
      title: "Image et relique dans le christianisme occidental",
      editor: [n("Borgeaud", "Philippe"), n("Volokhine", "Youri")],
      "container-title": "Les Objets de la mémoire : pour une approche comparatiste des reliques et de leur culte",
      "publisher-place": "Berne/Berlin", publisher: "Peter Lang", issued: y(2005), page: "325-345",
    },
    bib: "WIRTH Jean, « Image et relique dans le christianisme occidental », in : BORGEAUD Philippe et VOLOKHINE Youri (éd.), *Les Objets de la mémoire : pour une approche comparatiste des reliques et de leur culte*, Berne/Berlin, Peter Lang, 2005, p. 325–345.",
  },
  {
    // Guide prints "dans" here but "in :" is declared obligatory for chapters: we use "in :" throughout.
    name: "Ouvrage collectif sans directeur·ice",
    item: {
      id: "porcher", type: "chapter", author: [n("Porcher", "Jean")], title: "Les Manuscrits à peinture",
      "container-title": "L’Empire carolingien", "publisher-place": "Paris", publisher: "Gallimard",
      issued: y(1968), page: "69-203",
    },
    bib: "PORCHER Jean, « Les Manuscrits à peinture », in : *L’Empire carolingien*, Paris, Gallimard, 1968, p. 69–203.",
  },
  {
    name: "Ouvrage collectif édité par plus de trois personnes",
    item: {
      id: "vaisse", type: "chapter", author: [n("Vaisse", "Pierre")],
      title: "Courajod et le problème de la Renaissance",
      editor: [n("Recht", "Roland"), n("Sénéchal", "Philippe"), n("Barbillon", "Claire"), n("Martin", "François-René")],
      "container-title": "Histoire de l’histoire de l’art en France au XIXe siècle",
      "publisher-place": "Paris", publisher: "La documentation française", issued: y(2008), page: "95-112",
    },
    bib: "VAISSE Pierre, « Courajod et le problème de la Renaissance », in : RECHT Roland *et al.* (éd.), *Histoire de l’histoire de l’art en France au XIXe siècle*, Paris, La documentation française, 2008, p. 95–112.",
  },
  {
    name: "Ouvrage collectif édité par trois personnes (tous les noms)",
    item: {
      id: "three-eds", type: "chapter", author: [n("Dupont", "Anne")], title: "Un chapitre",
      editor: [n("Lüthi", "Dave"), n("Bock", "Nicolas"), n("Cassina", "Gaëtan")],
      "container-title": "Un livre", "publisher-place": "Lausanne", publisher: "Edimento", issued: y(2008), page: "1-10",
    },
    bib: "DUPONT Anne, « Un chapitre », in : LÜTHI Dave, BOCK Nicolas et CASSINA Gaëtan (éd.), *Un livre*, Lausanne, Edimento, 2008, p. 1–10.",
  },
  {
    name: "Mélanges en l’honneur d’une personne",
    item: {
      id: "pradervand", type: "chapter", author: [n("Pradervand", "Brigitte")],
      title: "Andreas Stoss, peintre des châteaux baillivaux vaudois au XVIe siècle",
      editor: [n("Lüthi", "Dave"), n("Bock", "Nicolas")],
      "container-title": "Petit précis patrimonial : mélanges en l’honneur de Gaëtan Cassina",
      "publisher-place": "Lausanne", publisher: "Edimento", issued: y(2008), page: "235-246",
    },
    bib: "PRADERVAND Brigitte, « Andreas Stoss, peintre des châteaux baillivaux vaudois au XVIe siècle », in : LÜTHI Dave et BOCK Nicolas (éd.), *Petit précis patrimonial : mélanges en l’honneur de Gaëtan Cassina*, Lausanne, Edimento, 2008, p. 235–246.",
  },
  {
    name: "Article publié dans un lexique",
    item: {
      id: "kobler", type: "entry-encyclopedia", author: [n("Kobler", "Friedrich")], title: "Fensterrose",
      "container-title": "Reallexikon zur Deutschen Kunstgeschichte",
      editor: [{ literal: "Zentralinstitut für Kunstgeschichte Munich" }],
      "publisher-place": "Munich", publisher: "Beck", issued: y(1987), volume: "VIII", page: "46",
    },
    bib: "KOBLER Friedrich, « Fensterrose », in : *Reallexikon zur Deutschen Kunstgeschichte*, éd. Zentralinstitut für Kunstgeschichte Munich, Munich, Beck, 1987, t. VIII, p. 46.",
  },
  {
    name: "Actes de colloque",
    item: {
      id: "michel", type: "paper-conference", author: [n("Michel", "Christian")],
      title: "Bellori et l’Académie royale de Peinture et de Sculpture : une admiration bien tempérée",
      editor: [n("Bonfait", "Olivier")],
      "container-title": "L’Idéal classique. Les échanges artistiques entre Paris et Rome au temps de Bellori",
      "event-place": "Paris/Rome", "event-date": y(2000),
      "publisher-place": "Paris/Rome", publisher: "Somogy", issued: y(2002), page: "105-116",
    },
    bib: "MICHEL Christian, « Bellori et l’Académie royale de Peinture et de Sculpture : une admiration bien tempérée », in : BONFAIT Olivier (éd.), *L’Idéal classique. Les échanges artistiques entre Paris et Rome au temps de Bellori*, actes du colloque, Paris/Rome, 2000, Paris/Rome, Somogy, 2002, p. 105–116.",
  },
  // ---------- Inédits ----------
  {
    // Guide: "(à paraître en 2014)". Rendered as a regular comma-separated element for consistency.
    name: "Ouvrage à paraître (Extra « Status: forthcoming »)",
    item: {
      id: "imesch", type: "chapter", author: [n("Imesch-Oechslin", "Kornelia")],
      title: "Ville, urbanisme et branding. HafenCity Hamburg & Saadiyat Island Cultural District",
      "container-title": "Utopia and the Reality of Urbanism in the 20th Century", status: "forthcoming", issued: y(2014),
    },
    bib: "IMESCH-OECHSLIN Kornelia, « Ville, urbanisme et branding. HafenCity Hamburg & Saadiyat Island Cultural District », in : *Utopia and the Reality of Urbanism in the 20th Century*, à paraître en 2014.",
  },
  {
    name: "Date de parution inconnue (à paraître)",
    item: {
      id: "kaenel", type: "chapter", author: [n("Kaenel", "Philippe")],
      title: "Véronique et imaginaire photographique au XXe siècle",
      editor: [n("Saint-Martin", "Isabelle"), n("Rinuy", "Paul-Louis")],
      "container-title": "Sainte Face, visage de Dieu, visage de l’homme dans l’art contemporain", status: "forthcoming",
    },
    bib: "KAENEL Philippe, « Véronique et imaginaire photographique au XXe siècle », in : SAINT-MARTIN Isabelle et RINUY Paul-Louis (éd.), *Sainte Face, visage de Dieu, visage de l’homme dans l’art contemporain*, à paraître.",
  },
  {
    name: "Ouvrage sans date",
    item: {
      id: "nodate", type: "book", author: [n("Dupont", "Jean")], title: "Sans date",
      "publisher-place": "Paris", publisher: "Gallimard",
    },
    bib: "DUPONT Jean, *Sans date*, Paris, Gallimard, s. d.",
  },
  {
    name: "Thèse de doctorat non publiée",
    item: {
      id: "eidenbenz", type: "thesis", author: [n("Eidenbenz", "Céline")], "publisher-place": "Genève",
      title: "Expressions du déséquilibre : l’hystérie, l’artiste et le médecin (1870–1914)",
      genre: "thèse de doctorat inédite", publisher: "Université de Genève", issued: y(2010),
    },
    bib: "EIDENBENZ Céline, *Expressions du déséquilibre : l’hystérie, l’artiste et le médecin (1870–1914)*, thèse de doctorat inédite, Université de Genève, 2010.",
  },
  {
    name: "Mémoire non publié",
    item: {
      id: "cerutti", type: "thesis", author: [n("Cerutti", "Damien")],
      title: "La Formation et l’œuvre de jeunesse du peintre Lorenzo di Pietro dit « Vecchietta »",
      genre: "mémoire de licence inédit", publisher: "Université de Lausanne", issued: y(2007),
    },
    bib: "CERUTTI Damien, *La Formation et l’œuvre de jeunesse du peintre Lorenzo di Pietro dit « Vecchietta »*, mémoire de licence inédit, Université de Lausanne, 2007.",
  },
  // ---------- Filmographie / audio ----------
  {
    name: "Émission de télévision",
    item: {
      id: "lehner", type: "broadcast", author: [n("Lehner", "Paolo")], title: "Massimo Cavalli",
      "container-title": "Misure", dimensions: "11 min.", issued: d(1967, 11, 7), publisher: "RTSI",
    },
    bib: "LEHNER Paolo, *Massimo Cavalli*, extrait de l’émission *Misure*, 11 min., 7 novembre 1967, RTSI.",
  },
  {
    // Guide lists producer and broadcaster separately; Zotero has a single Studio field,
    // so both go into it as typed. Current Zotero exports a recording's Place as event-place only.
    name: "Film / vidéocassette (réalisateur·ice)",
    item: {
      id: "pache", type: "motion_picture", director: [n("Pache", "Gilles")],
      title: "La tête buissonnante : Jean-Claude Hesselbarth. Une vie d’artiste",
      medium: "vidéocassette VHS", dimensions: "44 min.", "event-place": "Lausanne",
      publisher: "Parallaxe Film [producteur], Genève, RSR [diffuseur]", issued: y(1988),
    },
    bib: "PACHE Gilles, *La tête buissonnante : Jean-Claude Hesselbarth. Une vie d’artiste*, vidéocassette VHS, 44 min., Lausanne, Parallaxe Film [producteur], Genève, RSR [diffuseur], 1988.",
  },
  // ---------- Web ----------
  {
    // Guide prints the institution in normal case. CSL 1.0 cannot tell an institution from a
    // family name, so single-field (institutional) authors are uppercased like persons.
    name: "Site web",
    item: {
      id: "gallica", type: "webpage", author: [{ literal: "Bibliothèque nationale de France" }],
      "container-title": "bibliothèque numérique Gallica",
      title: "Évangéliaire dit de Charlemagne ou de Godescalc", "call-number": "BnF NAL 1203",
      URL: "https://gallica.bnf.fr/ark:/12148/btv1b6000718s", accessed: d(2015, 12, 1),
    },
    bib: "BIBLIOTHÈQUE NATIONALE DE FRANCE, bibliothèque numérique Gallica, *Évangéliaire dit de Charlemagne ou de Godescalc* [en ligne], (BnF NAL 1203), https://gallica.bnf.fr/ark:/12148/btv1b6000718s (consulté le 1er décembre 2015).",
  },
  {
    // Guide prints "22/06/20"; a 4-digit year is used so year-only dates stay unambiguous.
    // ISSN typed with a hyphen as Zotero stores it (the guide prints an en dash).
    name: "Article d’encyclopédie en ligne",
    item: {
      id: "koering", type: "entry-encyclopedia", author: [n("Koering", "Jérémie")], title: "Maniérisme",
      "container-title": "Encyclopédie d’histoire numérique de l’Europe", ISSN: "2677-6588",
      issued: d(2020, 6, 22), URL: "https://ehne.fr/fr/node/12388", accessed: d(2024, 9, 17),
    },
    bib: "KOERING Jérémie, « Maniérisme », *Encyclopédie d’histoire numérique de l’Europe* [en ligne], (ISSN 2677-6588), mis en ligne le 22/06/2020, https://ehne.fr/fr/node/12388 (consulté le 17 septembre 2024).",
  },
  // ---------- Robustness (realistic Zotero data) ----------
  {
    // Online = URL and no volume/page; Zotero fills a publisher for Grove, so that is not a usable test.
    name: "Encyclopédie en ligne, date année seule",
    item: {
      id: "grove", type: "entry-encyclopedia", author: [n("Kemp", "Martin")], title: "Perspective",
      "container-title": "Grove Art Online", publisher: "Oxford University Press", issued: y(2003),
      URL: "https://doi.org/10.1093/gao/9781884446054.article.T066593", accessed: d(2024, 1, 2),
    },
    bib: "KEMP Martin, « Perspective », *Grove Art Online* [en ligne], mis en ligne 2003, https://doi.org/10.1093/gao/9781884446054.article.T066593 (consulté le 2 janvier 2024).",
  },
  {
    name: "Lexique imprimé avec une URL (reste au format imprimé)",
    item: {
      id: "kobler-url", type: "entry-encyclopedia", author: [n("Kobler", "Friedrich")], title: "Fensterrose",
      "container-title": "Reallexikon zur Deutschen Kunstgeschichte",
      "publisher-place": "Munich", publisher: "Beck", issued: y(1987), volume: "VIII", page: "46",
      URL: "https://www.rdklabor.de/wiki/Fensterrose", accessed: d(2024, 1, 2),
    },
    bib: "KOBLER Friedrich, « Fensterrose », in : *Reallexikon zur Deutschen Kunstgeschichte*, Munich, Beck, 1987, t. VIII, p. 46.",
  },
  {
    // Not in the guide: the book's author goes after « in : », its editor after the title
    // (as for lexicons, p. 15), so the two are not read as co-editors.
    name: "Chapitre avec auteur du livre et directeur·ice",
    item: {
      id: "container-author", type: "chapter", author: [n("Dupont", "Anne")], title: "Préface",
      "container-author": [n("Panofsky", "Erwin")], editor: [n("Borgeaud", "Philippe")],
      "container-title": "Essais d’iconologie", "publisher-place": "Paris", publisher: "Gallimard", issued: y(1967), page: "7-12",
    },
    bib: "DUPONT Anne, « Préface », in : PANOFSKY Erwin, *Essais d’iconologie*, éd. P. Borgeaud, Paris, Gallimard, 1967, p. 7–12.",
  },
  {
    name: "Collection sans maison d’édition",
    item: {
      id: "coll-nopub", type: "book", author: [n("Dupont", "Jean")], title: "Sans éditeur",
      "publisher-place": "Paris", "collection-title": "Quadrige", "collection-number": "5", issued: y(1999),
    },
    bib: "DUPONT Jean, *Sans éditeur*, Paris (coll. « Quadrige », n° 5), 1999.",
  },
  {
    name: "Actes de colloque sans lieu ni date du colloque",
    item: {
      id: "proc-bare", type: "paper-conference", author: [n("Michel", "Christian")], title: "Bellori",
      "container-title": "L’Idéal classique", "publisher-place": "Paris", publisher: "Somogy", issued: y(2002), page: "105-116",
    },
    bib: "MICHEL Christian, « Bellori », in : *L’Idéal classique*, actes du colloque, Paris, Somogy, 2002, p. 105–116.",
  },
  {
    name: "Traduction d’un article de revue",
    item: {
      id: "art-trad", type: "article-journal", author: [n("Warburg", "Aby")], title: "L’art du portrait",
      translator: [n("Rochlitz", "Sibylle")], "container-title": "Revue germanique", volume: "12",
      issued: y(1990), page: "5-30",
    },
    bib: "WARBURG Aby, « L’art du portrait », trad. S. Rochlitz, in : *Revue germanique*, vol. 12, 1990, p. 5–30.",
  },
  {
    // Guide p. 12 prints this one as "…, 18 juin 1743, Jur. Civ. F15, Genève, Archives d’État",
    // but the Testament example (p. 13) and the rule put place and archive before the shelfmark.
    // Both cannot be produced from the same Zotero fields; the style follows the rule.
    name: "Source non publiée (ordre de la règle, pas de l’exemple Inventaire)",
    item: {
      id: "arlaud-inventaire", type: "manuscript",
      title: "Inventaire après décès de Jacques-Antoine Arlaud", issued: d(1743, 6, 18),
      "publisher-place": "Genève", archive: "Archives d’État", archive_location: "Jur. Civ. F15",
    },
    bib: "*Inventaire après décès de Jacques-Antoine Arlaud*, 18 juin 1743, Genève, Archives d’État, Jur. Civ. F15.",
  },
  {
    name: "Œuvre d’art (Zotero Artwork)",
    item: {
      id: "hodler", type: "graphic", author: [n("Hodler", "Ferdinand")], title: "Le Bûcheron", issued: y(1910),
      medium: "huile sur toile", dimensions: "130 x 101 cm", "archive-place": "Paris", archive: "Musée d’Orsay",
    },
    bib: "HODLER Ferdinand, *Le Bûcheron*, 1910, huile sur toile, 130 x 101 cm, Paris, Musée d’Orsay.",
  },
  {
    name: "Enregistrement audio (compositeur·ice)",
    item: {
      id: "satie", type: "song", composer: [n("Satie", "Erik")], title: "Gymnopédies",
      medium: "CD", publisher: "Erato", issued: y(1999),
    },
    bib: "SATIE Erik, *Gymnopédies*, CD, Erato, 1999.",
  },
  {
    name: "Lettre (Zotero Letter) conservée dans un fonds",
    item: {
      id: "vallotton", type: "personal_communication", author: [n("Vallotton", "Félix")],
      title: "Lettre à Hedy Hahnloser", issued: d(1912, 3, 4), "archive-place": "Winterthour",
      archive: "Villa Flora", archive_location: "Fonds Hahnloser, n° 12",
    },
    bib: "VALLOTTON Félix, *Lettre à Hedy Hahnloser*, 4 mars 1912, Winterthour, Villa Flora, Fonds Hahnloser, n° 12.",
  },
  {
    name: "Essai dans un catalogue d’exposition",
    item: {
      id: "essay-cat", type: "chapter", author: [n("Dupont", "Anne")], title: "Essai",
      editor: [n("Latour", "Bruno")], "container-title": "Iconoclash", genre: "cat. exp.",
      "event-place": "Karlsruhe, ZKM", "event-date": range([2002, 5, 4], [2002, 9, 1]),
      "publisher-place": "Cambridge (Mass.)", publisher: "MIT Press", issued: y(2002), page: "3-10",
    },
    bib: "DUPONT Anne, « Essai », in : LATOUR Bruno (éd.), *Iconoclash*, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), MIT Press, 2002, p. 3–10.",
  },
  {
    name: "Chapitre traduit dans un ouvrage collectif (initiales du traducteur)",
    item: {
      id: "chap-trad", type: "chapter", author: [n("Wirth", "Jean")], title: "Image",
      editor: [n("Borgeaud", "Philippe")], translator: [n("Arnal", "Bernard")], "container-title": "Objets",
      "publisher-place": "Berne", publisher: "Peter Lang", issued: y(2005), page: "325-345",
    },
    bib: "WIRTH Jean, « Image », in : BORGEAUD Philippe (éd.), *Objets*, trad. B. Arnal, Berne, Peter Lang, 2005, p. 325–345.",
  },
  {
    name: "Numéro de revue non numérique",
    item: {
      id: "issue-text", type: "article-journal", author: [n("Dupont", "Anne")], title: "Saisons",
      "container-title": "Revue de l’art", volume: "12", issue: "Printemps", issued: y(2001), page: "1-9",
    },
    bib: "DUPONT Anne, « Saisons », in : *Revue de l’art*, vol. 12, Printemps, 2001, p. 1–9.",
  },
  {
    name: "Film / vidéocassette, ancien Zotero (lieu exporté deux fois)",
    item: {
      id: "pache-old", type: "motion_picture", director: [n("Pache", "Gilles")], title: "La tête buissonnante",
      medium: "vidéocassette VHS", dimensions: "44 min.", "publisher-place": "Lausanne", "event-place": "Lausanne",
      publisher: "Parallaxe Film", issued: y(1988),
    },
    bib: "PACHE Gilles, *La tête buissonnante*, vidéocassette VHS, 44 min., Lausanne, Parallaxe Film, 1988.",
  },
  {
    name: "Présentation / conférence (Zotero Presentation)",
    item: {
      id: "talk", type: "speech", author: [n("Kaenel", "Philippe")], title: "Conférence",
      "event-place": "Lausanne", "event-title": "Colloque de la Section", issued: y(2019),
    },
    bib: "KAENEL Philippe, *Conférence*, Lausanne, 2019.",
  },
  {
    name: "Œuvre d’art, lieu du champ Place de Zotero",
    item: {
      id: "hodler-place", type: "graphic", author: [n("Hodler", "Ferdinand")], title: "Le Bûcheron", issued: y(1910),
      medium: "huile sur toile", dimensions: "130 x 101 cm", "event-place": "Paris", archive: "Musée d’Orsay",
    },
    bib: "HODLER Ferdinand, *Le Bûcheron*, 1910, huile sur toile, 130 x 101 cm, Paris, Musée d’Orsay.",
  },
  {
    // The issue editor of a journal is not part of the guide's article form.
    name: "Article de revue avec éditeur·ice du numéro",
    item: {
      id: "art-ed", type: "article-journal", author: [n("Toubert", "Pierre")], title: "Le règne",
      editor: [n("Dupont", "Marc")], "container-title": "Revue", volume: "89", issued: y(1983), page: "1-2",
    },
    bib: "TOUBERT Pierre, « Le règne », in : *Revue*, vol. 89, 1983, p. 1–2.",
  },
  {
    name: "Article de magazine traduit",
    item: {
      id: "mag-trad", type: "article-magazine", author: [n("Toubert", "Pierre")], title: "Le règne",
      translator: [n("Arnal", "Bernard")], "container-title": "Connaissance des arts", issue: "12",
      issued: d(1983, 5), page: "1-2",
    },
    bib: "TOUBERT Pierre, « Le règne », trad. B. Arnal, in : *Connaissance des arts*, n° 12, mai 1983, p. 1–2.",
  },
  {
    name: "Source non publiée, champ Institution de Zotero (sans Archive)",
    item: {
      id: "arlaud-inst", type: "manuscript", title: "Testament olographe de Jacques-Antoine Arlaud",
      issued: d(1740, 4, 6), "publisher-place": "Genève", publisher: "Archives d’État", archive_location: "Jur. Civ. E, n° 13",
    },
    bib: "*Testament olographe de Jacques-Antoine Arlaud*, 6 avril 1740, Genève, Archives d’État, Jur. Civ. E, n° 13.",
  },
  {
    name: "Chapitre avec date originale",
    item: {
      id: "benjamin", type: "chapter", author: [n("Benjamin", "Walter")], title: "L’œuvre d’art à l’époque de sa reproduction mécanisée",
      "original-date": y(1936), "container-title": "Écrits français", "publisher-place": "Paris", publisher: "Gallimard",
      issued: y(1991), page: "177-220",
    },
    bib: "BENJAMIN Walter, « L’œuvre d’art à l’époque de sa reproduction mécanisée » [1936], in : *Écrits français*, Paris, Gallimard, 1991, p. 177–220.",
  },
  {
    // Zotero exports a Podcast as broadcast, the podcaster as host and the show as collection-title.
    name: "Podcast / émission (animateur·ice)",
    item: {
      id: "podcast", type: "broadcast", host: [n("Dupont", "Anne")], title: "Épisode 3",
      "collection-title": "Podcast art", issued: d(2022, 3, 1),
    },
    bib: "DUPONT Anne, *Épisode 3*, extrait de l’émission *Podcast art*, 1er mars 2022.",
  },
  {
    // Older Zotero fills event-place from Place, and citeproc then ignores an Extra "Event Place:".
    // Workaround documented in the README: venue and dates typed into Genre, no Event Date.
    name: "Ancien Zotero : lieu et dates d’exposition saisis dans Genre",
    item: {
      id: "iconoclash-oldz", type: "book", editor: [n("Latour", "Bruno")], title: "Iconoclash",
      "publisher-place": "Cambridge (Mass.)", "event-place": "Cambridge (Mass.)",
      note: "genre: cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002", publisher: "MIT Press", issued: y(2002),
    },
    bib: "LATOUR Bruno (éd.), *Iconoclash*, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), MIT Press, 2002.",
  },
  {
    // Zotero exports a Standard's Status (and a Patent's Legal Status) as `status`.
    name: "Norme avec statut (pas « à paraître »)",
    item: {
      id: "iso", type: "standard", author: [{ literal: "ISO" }], title: "Information et documentation",
      status: "Publiée", "publisher-place": "Genève", publisher: "ISO", issued: y(2021),
    },
    bib: "ISO, *Information et documentation*, Genève, ISO, 2021.",
  },
  // ---------- Zotero 7 (schema <= v39) exports Place as both publisher-place and event-place ----------
  {
    name: "Zotero 7 : un livre avec lieu n’est pas un catalogue",
    item: {
      id: "neraudau-z7", type: "book", author: [n("Néraudau", "Jean-Pierre")],
      title: "Dictionnaire d’histoire de l’art", "publisher-place": "Paris", "event-place": "Paris", publisher: "PUF",
      "collection-title": "Quadrige", "collection-number": "215", issued: y(1996),
    },
    bib: "NÉRAUDAU Jean-Pierre, *Dictionnaire d’histoire de l’art*, Paris, PUF (coll. « Quadrige », n° 215), 1996.",
  },
  {
    name: "Zotero 7 : catalogue sans dates, le lieu n’est pas répété",
    item: {
      id: "mucha-z7", type: "book", title: "Alphonse Mucha : maître de l’Art nouveau", genre: "cat. exp.",
      "publisher-place": "Vanves", "event-place": "Vanves", publisher: "Hazan", issued: y(2023),
    },
    bib: "*Alphonse Mucha : maître de l’Art nouveau*, cat. exp., Vanves, Hazan, 2023.",
  },
  {
    name: "Zotero 7 : actes de colloque, le lieu n’est pas répété",
    item: {
      id: "michel-z7", type: "paper-conference", author: [n("Michel", "Christian")], title: "Bellori",
      "container-title": "L’Idéal classique", "publisher-place": "Paris", "event-place": "Paris",
      publisher: "Somogy", issued: y(2002), page: "105-116",
    },
    bib: "MICHEL Christian, « Bellori », in : *L’Idéal classique*, actes du colloque, Paris, Somogy, 2002, p. 105–116.",
  },
  // ---------- Misc ----------
  {
    name: "Ouvrage avec auteur et éditeur scientifique",
    item: {
      id: "vasari", type: "book", author: [n("Vasari", "Giorgio")],
      title: "Les Vies des meilleurs peintres, sculpteurs et architectes", editor: [n("Chastel", "André")],
      "original-date": y(1568), "publisher-place": "Arles", publisher: "Actes Sud", issued: y(2005),
    },
    bib: "VASARI Giorgio, *Les Vies des meilleurs peintres, sculpteurs et architectes* [1568], éd. A. Chastel, Arles, Actes Sud, 2005.",
  },
];

// Real Zotero import of ISBN 978-2-7541-1357-1 (Add Item by Identifier → Library of Congress
// translator, run through Zotero's translation-server; CSL-JSON from its csljson export).
// tests/fixtures/isbn-9782754113571.zotero.json shows the imported tags: "Exhibitions",
// "Exhibitions catalogs", "Exhibition catalogs" (MARC 600 $v and two 655 fields).
const [muchaImported] = JSON.parse(
  readFileSync(new URL("./fixtures/isbn-9782754113571.csl.json", import.meta.url), "utf8"),
) as Item[];

cases.push(
  {
    // As imported: the artist and two institutions came in as editors, the MARC place/publisher
    // punctuation is kept, and nothing marks it as a catalogue (tags are invisible to CSL).
    name: "ISBN 978-2754113571 tel qu’importé par Zotero",
    item: muchaImported,
    // The LoC record spells "maître" with a combining circumflex (i + U+0302), kept by Zotero.
    bib: "MUCHA Alphonse *et al.* (éd.), *Alphonse Mucha: mai\u0302tre de l’Art nouveau*, Vanves : Paris, Hazan ; Culturespaces, 2023.",
  },
  {
    // After tidying in Zotero: Sato as the only editor, places/publishers with "/", French
    // spacing in the title, and in Extra: "Genre: cat. exp.", "Event Place: Aix-en-Provence,
    // Hôtel de Caumont", "Event Date: 2023/2024" (record: "exhibition held at Hôtel de Caumont,
    // Aix-en-Provence, France, winter 2023-2024").
    name: "ISBN 978-2754113571 après mise en forme",
    item: {
      ...muchaImported,
      id: "mucha-tidy",
      editor: [n("Sato", "Tomoko")],
      title: "Alphonse Mucha : maître de l’Art nouveau",
      "publisher-place": "Vanves/Paris",
      publisher: "Hazan/Culturespaces",
      note: "genre: cat. exp.\nevent-place: Aix-en-Provence, Hôtel de Caumont\nevent-date: 2023/2024",
    },
    bib: "SATO Tomoko (éd.), *Alphonse Mucha : maître de l’Art nouveau*, cat. exp., Aix-en-Provence, Hôtel de Caumont, 2023–2024, Vanves/Paris, Hazan/Culturespaces, 2023.",
  },
);

const byId = (id: string) => cases.find((c) => c.item.id === id)!.item;

const guadet: Item = {
  id: "guadet", type: "book", author: [n("Guadet", "Julien")],
  title: "Éléments et théorie de l’architecture, cours professé à l’École nationale et spéciale des Beaux-Arts",
  "publisher-place": "Paris", publisher: "Librairie de la construction moderne", issued: y(1901),
};
const werkner: Item = {
  id: "werkner", type: "book", author: [n("Werkner", "Patrick")], title: "Physis und Psyche",
  "publisher-place": "Vienne", publisher: "Herold", issued: y(1994),
};
const notice: Item = {
  id: "notice", type: "book",
  title: "Notice historique sur la gymnastique à Genève : centenaire de l’Association genevoise de gymnastique, 1873-1973",
  issued: y(1973),
};

export const notes: {
  name: string;
  items: Item[];
  seq: { id: string; locator?: string; label?: string }[][];
  expected: string[];
}[] = [
  {
    // The guide's note has "t. 2." after the title, while its rule (p. 13) puts "vol." after the
    // publisher; the volume is left out here and covered by the "Volume consulté" case.
    name: "Première occurrence complète, puis forme abrégée",
    items: [guadet],
    seq: [[{ id: "guadet", locator: "499" }], [{ id: "guadet", locator: "40" }]],
    expected: [
      "GUADET Julien, *Éléments et théorie de l’architecture, cours professé à l’École nationale et spéciale des Beaux-Arts*, Paris, Librairie de la construction moderne, 1901, p. 499.",
      "GUADET 1901, p. 40.",
    ],
  },
  {
    // Guide: "p. 56 et p. 137". citeproc strips a repeated "p." typed inside the locator.
    // The guide's note is short from the first occurrence (item in the bibliography); the
    // style always gives the full form first since it cannot know what the bibliography holds.
    name: "Forme abrégée, plusieurs pages",
    items: [werkner],
    seq: [[{ id: "werkner" }], [{ id: "werkner", locator: "56 et 137" }]],
    expected: ["WERKNER Patrick, *Physis und Psyche*, Vienne, Herold, 1994.", "WERKNER 1994, p. 56 et 137."],
  },
  {
    name: "Forme abrégée sans auteur : titre, date",
    items: [notice],
    seq: [[{ id: "notice" }], [{ id: "notice", locator: "10" }]],
    expected: [
      "*Notice historique sur la gymnastique à Genève : centenaire de l’Association genevoise de gymnastique, 1873-1973*, 1973.",
      "*Notice historique sur la gymnastique à Genève : centenaire de l’Association genevoise de gymnastique, 1873-1973*, 1973, p. 10.",
    ],
  },
  {
    name: "Forme abrégée : deux auteurs, et al., éditeur",
    items: [byId("muller"), byId("gerard"), byId("romanini")],
    seq: [
      [{ id: "muller" }], [{ id: "gerard" }], [{ id: "romanini" }],
      [{ id: "muller", locator: "12" }], [{ id: "gerard", locator: "3" }], [{ id: "romanini", locator: "2", label: "volume" }],
    ],
    expected: [
      "MULLER Joseph-Émile et ELGAR Frank, *Cent ans de peinture moderne*, Paris, Hazan, 1979.",
      "GÉRARD André-Marie *et al.*, *Dictionnaire de la Bible*, Paris, Robert Laffont, 1989.",
      "ROMANINI Angiola Maria (éd.), *Enciclopedia dell’arte medievale*, Rome, Istituto della Enciclopedia italiana, 1991–2002, 12 vol.",
      "MULLER et ELGAR 1979, p. 12.",
      "GÉRARD *et al.* 1989, p. 3.",
      "ROMANINI 1991–2002, vol. 2.",
    ],
  },
  {
    name: "Chapitre : la page citée remplace l’étendue",
    items: [byId("wirth")],
    seq: [[{ id: "wirth", locator: "330" }], [{ id: "wirth", locator: "331" }]],
    expected: [
      "WIRTH Jean, « Image et relique dans le christianisme occidental », in : BORGEAUD Philippe et VOLOKHINE Youri (éd.), *Les Objets de la mémoire : pour une approche comparatiste des reliques et de leur culte*, Berne/Berlin, Peter Lang, 2005, p. 330.",
      "WIRTH 2005, p. 331.",
    ],
  },
  {
    name: "Chapitre anonyme : forme abrégée par le titre, pas par le directeur·ice",
    items: [{
      id: "anon-chap", type: "chapter", title: "Chapitre anonyme", editor: [n("Hache", "Gérard")],
      "container-title": "Un livre", "publisher-place": "Paris", publisher: "PUF", issued: y(2006), page: "1-10",
    }],
    seq: [[{ id: "anon-chap", locator: "3" }], [{ id: "anon-chap", locator: "4" }]],
    expected: [
      "« Chapitre anonyme », in : HACHE Gérard (éd.), *Un livre*, Paris, PUF, 2006, p. 3.",
      "« Chapitre anonyme », 2006, p. 4.",
    ],
  },
  {
    name: "Forme abrégée : titre complet, pas le titre court de Zotero",
    items: [{
      id: "mucha-short", type: "book", title: "Alphonse Mucha : maître de l’Art nouveau", "title-short": "Alphonse Mucha",
      genre: "cat. exp.", "publisher-place": "Vanves", publisher: "Hazan", issued: y(2023),
    }],
    seq: [[{ id: "mucha-short" }], [{ id: "mucha-short", locator: "12" }]],
    expected: [
      "*Alphonse Mucha : maître de l’Art nouveau*, cat. exp., Vanves, Hazan, 2023.",
      "*Alphonse Mucha : maître de l’Art nouveau*, 2023, p. 12.",
    ],
  },
  {
    name: "Encyclopédie en ligne : page citée dans la première note",
    items: [byId("koering")],
    seq: [[{ id: "koering", locator: "3" }], [{ id: "koering", locator: "4" }]],
    expected: [
      "KOERING Jérémie, « Maniérisme », *Encyclopédie d’histoire numérique de l’Europe* [en ligne], (ISSN 2677-6588), mis en ligne le 22/06/2020, https://ehne.fr/fr/node/12388 (consulté le 17 septembre 2024), p. 3.",
      "KOERING 2020, p. 4.",
    ],
  },
  {
    name: "Site web : forme abrégée par auteur et titre",
    items: [byId("gallica")],
    seq: [[{ id: "gallica" }], [{ id: "gallica" }]],
    expected: [
      "BIBLIOTHÈQUE NATIONALE DE FRANCE, bibliothèque numérique Gallica, *Évangéliaire dit de Charlemagne ou de Godescalc* [en ligne], (BnF NAL 1203), https://gallica.bnf.fr/ark:/12148/btv1b6000718s (consulté le 1er décembre 2015).",
      "BIBLIOTHÈQUE NATIONALE DE FRANCE, *Évangéliaire dit de Charlemagne ou de Godescalc*.",
    ],
  },
  {
    name: "Même nom, même année, personnes différentes : prénom plutôt que suffixe",
    items: [
      { id: "dupont-j", type: "book", author: [n("Dupont", "Jean")], title: "Un", "publisher-place": "Paris", publisher: "PUF", issued: y(2000) },
      { id: "dupont-m", type: "book", author: [n("Dupont", "Marie")], title: "Deux", "publisher-place": "Paris", publisher: "PUF", issued: y(2000) },
    ],
    seq: [[{ id: "dupont-j" }], [{ id: "dupont-m" }], [{ id: "dupont-j", locator: "1" }], [{ id: "dupont-m", locator: "2" }]],
    expected: [
      "DUPONT Jean, *Un*, Paris, PUF, 2000.",
      "DUPONT Marie, *Deux*, Paris, PUF, 2000.",
      "DUPONT Jean 2000, p. 1.",
      "DUPONT Marie 2000, p. 2.",
    ],
  },
  {
    name: "Site web daté d’un·e auteur·ice : NOM année",
    items: [{
      id: "web-person", type: "webpage", author: [n("Dupont", "Anne")], "container-title": "Blog",
      title: "Page", issued: y(2020), URL: "https://example.org", accessed: d(2024, 1, 2),
    }],
    seq: [[{ id: "web-person" }], [{ id: "web-person", locator: "3" }]],
    expected: [
      "DUPONT Anne, Blog, *Page* [en ligne], mis en ligne 2020, https://example.org (consulté le 2 janvier 2024).",
      "DUPONT 2020, p. 3.",
    ],
  },
  {
    name: "Norme : forme abrégée sans « à paraître »",
    items: [{
      id: "iso-n", type: "standard", author: [{ literal: "ISO" }], title: "Information et documentation",
      status: "Publiée", "publisher-place": "Genève", publisher: "ISO", issued: y(2021),
    }],
    seq: [[{ id: "iso-n" }], [{ id: "iso-n", locator: "4" }]],
    expected: ["ISO, *Information et documentation*, Genève, ISO, 2021.", "ISO 2021, p. 4."],
  },
  {
    name: "Même auteur, deux œuvres sans date",
    items: [
      { id: "nd-a", type: "book", author: [n("Dupont", "Jean")], title: "Album", "publisher-place": "Paris", publisher: "PUF" },
      { id: "nd-b", type: "book", author: [n("Dupont", "Jean")], title: "Bréviaire", "publisher-place": "Paris", publisher: "PUF" },
    ],
    seq: [[{ id: "nd-a" }], [{ id: "nd-b" }], [{ id: "nd-a", locator: "5" }], [{ id: "nd-b", locator: "6" }]],
    expected: [
      "DUPONT Jean, *Album*, Paris, PUF, s. d. a.",
      "DUPONT Jean, *Bréviaire*, Paris, PUF, s. d. b.",
      "DUPONT s. d. a, p. 5.",
      "DUPONT s. d. b, p. 6.",
    ],
  },
  {
    name: "Même auteur, deux travaux à paraître",
    items: [
      { id: "fc-a", type: "chapter", author: [n("Kaenel", "Philippe")], title: "Alpha", "container-title": "Livre A", status: "forthcoming" },
      { id: "fc-b", type: "chapter", author: [n("Kaenel", "Philippe")], title: "Bêta", "container-title": "Livre B", status: "forthcoming" },
    ],
    seq: [[{ id: "fc-a" }], [{ id: "fc-b" }], [{ id: "fc-a", locator: "5" }], [{ id: "fc-b", locator: "6" }]],
    expected: [
      "KAENEL Philippe, « Alpha », in : *Livre A*, à paraître a.",
      "KAENEL Philippe, « Bêta », in : *Livre B*, à paraître b.",
      "KAENEL à paraître a, p. 5.",
      "KAENEL à paraître b, p. 6.",
    ],
  },
  {
    name: "Même auteur, travaux à paraître en des années différentes",
    items: [
      { id: "fc-2014", type: "chapter", author: [n("Imesch-Oechslin", "Kornelia")], title: "Ville", "container-title": "Utopia", status: "forthcoming", issued: y(2014) },
      { id: "fc-2015", type: "chapter", author: [n("Imesch-Oechslin", "Kornelia")], title: "Autre", "container-title": "Revue", status: "forthcoming", issued: y(2015) },
    ],
    seq: [[{ id: "fc-2014" }], [{ id: "fc-2015" }], [{ id: "fc-2014", locator: "3" }], [{ id: "fc-2015", locator: "4" }]],
    expected: [
      "IMESCH-OECHSLIN Kornelia, « Ville », in : *Utopia*, à paraître en 2014.",
      "IMESCH-OECHSLIN Kornelia, « Autre », in : *Revue*, à paraître en 2015.",
      "IMESCH-OECHSLIN à paraître en 2014, p. 3.",
      "IMESCH-OECHSLIN à paraître en 2015, p. 4.",
    ],
  },
  {
    name: "Même nom, années différentes : pas de prénom",
    items: [
      { id: "dj-2000", type: "book", author: [n("Dupont", "Jean")], title: "Un", "publisher-place": "Paris", publisher: "PUF", issued: y(2000) },
      { id: "dm-2005", type: "book", author: [n("Dupont", "Marie")], title: "Deux", "publisher-place": "Paris", publisher: "PUF", issued: y(2005) },
    ],
    seq: [[{ id: "dj-2000" }], [{ id: "dm-2005" }], [{ id: "dj-2000", locator: "1" }], [{ id: "dm-2005", locator: "2" }]],
    expected: [
      "DUPONT Jean, *Un*, Paris, PUF, 2000.",
      "DUPONT Marie, *Deux*, Paris, PUF, 2005.",
      "DUPONT 2000, p. 1.",
      "DUPONT 2005, p. 2.",
    ],
  },
  {
    // Suffixes follow bibliography order (same author and year → by title): "Autre…" < "Éléments…".
    name: "Désambiguïsation par l’année (1901a, 1901b)",
    items: [guadet, { ...guadet, id: "guadet2", title: "Autre titre" }],
    seq: [[{ id: "guadet" }], [{ id: "guadet2" }], [{ id: "guadet", locator: "1" }], [{ id: "guadet2", locator: "2" }]],
    expected: [
      "GUADET Julien, *Éléments et théorie de l’architecture, cours professé à l’École nationale et spéciale des Beaux-Arts*, Paris, Librairie de la construction moderne, 1901b.",
      "GUADET Julien, *Autre titre*, Paris, Librairie de la construction moderne, 1901a.",
      "GUADET 1901b, p. 1.",
      "GUADET 1901a, p. 2.",
    ],
  },
  {
    name: "Plusieurs références dans une note",
    items: [byId("faure"), byId("belting")],
    seq: [[{ id: "faure" }, { id: "belting" }], [{ id: "faure", locator: "5" }, { id: "belting", locator: "7" }]],
    expected: [
      "FAURE Élie, *Histoire de l’art*, Paris, J.-J. Pauvert, 1972, 2 vol. ; BELTING Hans, *La double perspective : la science arabe et l’art de la Renaissance*, Lyon/Dijon, PUL/Les Presses du réel, 2010.",
      "FAURE 1972, p. 5 ; BELTING 2010, p. 7.",
    ],
  },
];

// Variant "notes abrégées": every note is short, as the guide's p. 18 examples (WERKNER, Notice)
// for works listed in the bibliography.
export const shortNotes: typeof notes = [
  {
    name: "Notes abrégées dès la première note",
    items: [werkner, notice, guadet],
    seq: [[{ id: "werkner", locator: "56 et 137" }], [{ id: "notice", locator: "10" }], [{ id: "guadet" }], [{ id: "guadet", locator: "40" }]],
    expected: [
      "WERKNER 1994, p. 56 et 137.",
      "*Notice historique sur la gymnastique à Genève : centenaire de l’Association genevoise de gymnastique, 1873-1973*, 1973, p. 10.",
      "GUADET 1901.",
      "GUADET 1901, p. 40.",
    ],
  },
  {
    name: "Notes abrégées : chapitre, plusieurs références",
    items: [byId("wirth"), byId("faure")],
    seq: [[{ id: "wirth", locator: "330" }, { id: "faure", locator: "5" }]],
    expected: ["WIRTH 2005, p. 330 ; FAURE 1972, p. 5."],
  },
];

const joubert2000: Item = {
  id: "joubert2000", type: "book", author: [n("Joubert", "Fabienne")], title: "La Tapisserie au Moyen Âge",
  "publisher-place": "Rennes", publisher: "Éd. Ouest-France", issued: y(2000),
};
const joubert2008: Item = {
  id: "joubert2008", type: "book", author: [n("Joubert", "Fabienne")],
  title: "La Sculpture gothique en France, XIIe-XIIIe siècles",
  "publisher-place": "Paris", publisher: "Picard", issued: y(2008),
};

export const bibliographies: { name: string; items: Item[]; expected: string[] }[] = [
  {
    // Teams print as "JOUBERT Fabienne et al.", so they sort by date with her other works.
    // KNOWN LIMITATION (README): the 2001 team should read "JOUBERT Fabienne *et al.*", but
    // CSL's Id. compares the rendered names. This case guards the chronological order.
    name: "Groupe Id. en ordre chronologique malgré des coauteurs différents",
    items: [
      { id: "j-2002", type: "book", author: [n("Joubert", "Fabienne"), n("Quint", "Q"), n("Sachs", "S")], title: "C", "publisher-place": "Paris", publisher: "Picard", issued: y(2002) },
      { id: "j-2000", type: "book", author: [n("Joubert", "Fabienne")], title: "A", "publisher-place": "Paris", publisher: "Picard", issued: y(2000) },
      { id: "j-2001", type: "book", author: [n("Joubert", "Fabienne"), n("Xavier", "X"), n("Zorn", "Z")], title: "B", "publisher-place": "Paris", publisher: "Picard", issued: y(2001) },
    ],
    expected: [
      "JOUBERT Fabienne, *A*, Paris, Picard, 2000.",
      "Id., *B*, Paris, Picard, 2001.",
      "Id., *C*, Paris, Picard, 2002.",
    ],
  },
  {
    // Guards a citeproc-js quirk: one date macro reached from two branches leaked the "[ ]" of
    // the original date into other date ranges ("4 mai–[1er septembre ]2002").
    name: "Plages de dates mélangées (date originale, exposition, essai)",
    items: [byId("viollet"), byId("iconoclash-full"), byId("essay-cat"), byId("benjamin")],
    expected: [
      "BENJAMIN Walter, « L’œuvre d’art à l’époque de sa reproduction mécanisée » [1936], in : *Écrits français*, Paris, Gallimard, 1991, p. 177–220.",
      "DUPONT Anne, « Essai », in : LATOUR Bruno (éd.), *Iconoclash*, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), MIT Press, 2002, p. 3–10.",
      "LATOUR Bruno et WEIBEL Peter (éd.), *Iconoclash. Beyond the Image Wars in Science, Religion and Art*, cat. exp., Karlsruhe, ZKM, 4 mai–1er septembre 2002, Cambridge (Mass.), The MIT Press, 2002.",
      "VIOLLET-LE-DUC Eugène-Emmanuel, *Entretiens sur l’architecture* [1863–1872], Gollion, Infolio, 2010.",
    ],
  },
  {
    name: "Site web sans auteur classé au nom du site",
    items: [byId("neraudau"), {
      id: "louvre", type: "webpage", "container-title": "Musée du Louvre", title: "Pietà",
      URL: "https://collections.louvre.fr/", accessed: d(2024, 3, 1),
    }],
    expected: [
      "Musée du Louvre, *Pietà* [en ligne], https://collections.louvre.fr/ (consulté le 1er mars 2024).",
      "NÉRAUDAU Jean-Pierre, *Dictionnaire d’histoire de l’art*, Paris, PUF (coll. « Quadrige », n° 215), 1996.",
    ],
  },
  {
    // The guide prints *Id.* in italics; CSL 1.0.2 cannot format the substitute string.
    name: "Id. pour un même auteur, ordre chronologique",
    items: [joubert2008, joubert2000],
    expected: [
      "JOUBERT Fabienne, *La Tapisserie au Moyen Âge*, Rennes, Éd. Ouest-France, 2000.",
      "Id., *La Sculpture gothique en France, XIIe-XIIIe siècles*, Paris, Picard, 2008.",
    ],
  },
  {
    // Anonymous chapter sorts by its title ("Anonyme…"), not under its book's editor (Zola).
    name: "Ordre alphabétique ; catalogues d’exposition classés par titre",
    items: [{
      id: "anon-sort", type: "chapter", title: "Anonyme sous la direction d’un tiers", editor: [n("Zola", "Émile")],
      "container-title": "Recueil", "publisher-place": "Paris", publisher: "PUF", issued: y(2000), page: "1-2",
    }, byId("neraudau"), joubert2008, byId("iconoclash-guide"), byId("gisants"), byId("belting"), byId("faure")],
    expected: [
      "« Anonyme sous la direction d’un tiers », in : ZOLA Émile (éd.), *Recueil*, Paris, PUF, 2000, p. 1–2.",
      "BELTING Hans, *La double perspective : la science arabe et l’art de la Renaissance*, Lyon/Dijon, PUL/Les Presses du réel, 2010.",
      "FAURE Élie, *Histoire de l’art*, Paris, J.-J. Pauvert, 1972, 2 vol.",
      "*Gisants et tombeaux de la Basilique de Saint-Denis*, cat. exp., Paris, Archives départementales de la Seine–Saint-Denis, 1976.",
      "LATOUR Bruno et WEIBEL Peter (éd.), *Iconoclash. Beyond the Image Wars in Science, Religion and Art*, cat. exp., ZKM Karlsruhe, The MIT Press, 2002.",
      "JOUBERT Fabienne, *La Sculpture gothique en France, XIIe-XIIIe siècles*, Paris, Picard, 2008.",
      "NÉRAUDAU Jean-Pierre, *Dictionnaire d’histoire de l’art*, Paris, PUF (coll. « Quadrige », n° 215), 1996.",
    ],
  },
];
