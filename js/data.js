/* ============================================================================
   Skedros Family Tree — DATA
   ----------------------------------------------------------------------------
   This is the single source of truth for everything the site renders.
   Edit here to add or correct family information; reload the site to see it.

   ADDING A NEW PERSON
     Append an entry to the `people` array. Required: id, name, x, y.
     Optional: alt, dates, note, bio, photos, unknown, deceasedYoung.

   ADDING PHOTOS TO AN EXISTING PERSON
     1. Drop the image file(s) into the /photos folder.
     2. Add a   photos: ['filename1.jpg', 'filename2.jpg']   field to that
        person's entry. They'll appear as a gallery on the profile page.

   ADDING A MARRIAGE
     Push  ['person_a_id', 'person_b_id']  into the `marriages` array.

   ADDING A PARENT->CHILD LINK
     Push  { from: 'parent_a_id+parent_b_id', to: 'child_id', busLevel: 1 }
     into the `descent` array. busLevel = 1, 2, or 3 (controls drop depth).

   ADDING A SECTION HEADER ("branch label") TO THE TREE CANVAS
     Push  { x: 1234, y: 567, label: 'Section Name' }  into BRANCH_LABELS.
   ========================================================================== */

const CANVAS = { width: 27000, height: 4950 };

const GY = { I: 345, II: 810, III: 1305, IV: 1815, V: 2310, VI: 2745 };

const people = [
  /* SCHEMA per person:
       { id, name, [alt], [dates], [note], x, y,
         [unknown:true], [deceasedYoung:true],
         [photo: 'photos/name.jpg'],   // optional: relative path to a photo file next to this HTML
         [bio:   'Born in...\n\nMarried in...']   // optional: paragraphs separated by blank lines
       }
     Add photo and bio fields to any person to populate the detail panel. */
  /* ---------- GENERATION I ---------- */
  { id: 'demetrios_sr',   name: 'Demetrios Skedros',     note: 'Brother of John (?)',      x: 270,  y: GY.I  },
  { id: 'john_sr_wife',   name: 'wife of John Skedros',  alt: 'name unrecorded',           x: 810,  y: GY.I,  unknown: true },
  { id: 'john_sr',        name: 'John Skedros',          note: 'Brother of Demetrios (?)', x: 1080,  y: GY.I  },

  { id: 'vouganis_sr',    name: 'Vouganis',              alt: 'first name unknown',        x: 1890, y: GY.I,  unknown: true },
  { id: 'vasiliki_v',     name: 'Vasiliki S. Vouganis',                                    x: 2160, y: GY.I  },

  { id: 'george_d',       name: 'George Demetriades',    note: 'Buried in Salt Lake City', x: 3090, y: GY.I ,
    bio: `Helen Skedros Rizos's maternal grandfather. The Demetriades patriarch who oversaw the family's long migration from Greece to America. Originally from Epirus; the family moved to Lamia in Roumeli when his daughter Eugenia was about four years old.

After his daughter Mary went to America in 1898 he followed her to Boston the next year. He then returned to Greece to bring his wife Calipe and his daughter Andrina across. Years later, after Andrina had married in America, he made a third trip back to Greece — this time to spend a year with his daughter Eugenia, who had stayed behind in Piraeus with her young family.

He was present at the 1909 Omaha Greek riot with his daughter Mary when the mob attacked Greek businesses there. He is buried in Salt Lake City.` },
  { id: 'calipe',         name: 'Calipe',                alt: 'maiden name unrecorded',    x: 3360, y: GY.I ,
    bio: `Helen Skedros Rizos's maternal grandmother. Her maiden name has not been recorded in the family record. Came to America from Greece with her husband George Demetriades after her daughter Mary had emigrated first in 1898.

Helen remembered a key family moment that explains the whole Demetriades emigration. When Aunt Mary asked grandmother why she had brought all her daughters to America to marry, Calipe answered (in Greek), "They destroyed their dowries in politics instead and married the girls in America." The Demetriades had been politically active in Greece, and the family wealth that should have funded dowries had been spent on causes and campaigns. America was where the daughters could find husbands without dowries — which is the deep reason every Demetriades woman ended up in this country.

Calipe later moved from Chicago to Salt Lake City because one of her sons was getting married there. That move drew the rest of the Demetriades family west, and is how the Utah branch came to be.` },

  { id: 'constantine_r',  name: 'Constantine Rizos',                                       x: 5250, y: GY.I  },
  { id: 'athena_k',       name: 'Athena Konini',                                           x: 5520, y: GY.I  },

  /* ---------- GENERATION II (primary row) ---------- */
  /* Children of Demetrios Sr (left) */
  { id: 'dimitrios',      name: 'Dimitrios Skedros',                                       x: 120,   y: GY.II },
  { id: 'gm_psalmos',     name: 'grandmother of John Psalmos', alt: 'name unrecorded',     x: 420,  y: GY.II, unknown: true },

  /* Children of John Sr + wife */
  { id: 'kosta',          name: 'Kosta Skedros',         note: 'died young',               x: 720,  y: GY.II, deceasedYoung: true },
  { id: 'maria_s',        name: 'Maria Skedros',                                           x: 1020,  y: GY.II },
  { id: 'james_portland', name: 'James Skedros',         note: 'Portland (?)',             x: 1320,  y: GY.II },
  { id: 'efthimia',       name: 'Efthimia Skedros',      dates: 'b. 1904, d. young',       x: 1620, y: GY.II, deceasedYoung: true },
  /* constantine_s placed near his wife Evgenia */
  { id: 'constantine_s',  name: 'Constantine Skedros',                                     x: 2820, y: GY.II,
    bio: `A successful tobacco merchant in Piraeus. He imported raw tobacco from various countries, ground and packaged it at a factory under his own name, and sold it as cigarettes, loose tobacco and snuff from his store. His daughter Helen recalled: "He was one of the rich people in Piraeus before the family came. Then after he became a poor man because he had a big family — twelve children."

Originally from Epirus. Left his hometown around age six or seven when, in Helen's words, "some relative took him to Greece and lived with him." Built his business from a grammar school education alone. Met Eugenia Demetriades at a party, fell in love and married her when she was seventeen. There was no dowry because the Demetriades had spent the family's money on Greek political causes.

After Eugenia died around 1906 to 1909 he stayed alone in Piraeus while his children went to America. He was secretly dying himself; his doctor had told him "he wasn't going to last very long," and the trip to America was framed to the children as a visit so they wouldn't refuse to go. Helen later had a gentleman in Greece sell his estate and keep his pocket watch and a few personal things to send to her in Salt Lake.` },

  /* Children of Vouganis Sr + Vasiliki */
  { id: 'john_v',         name: 'John Vouganis',                                           x: 1920, y: GY.II },
  { id: 'vassilis_v',     name: 'Vassilis Vouganis',     note: 'of Ioannina &amp; Grevena', x: 2190, y: GY.II },
  { id: 'george_v',       name: 'George Vouganis',                                         x: 2460, y: GY.II },
  /* Aristoteles placed in sub-row to free x=1700 area for the descent drop to james_k */
  { id: 'aristoteles_v',  name: 'Aristoteles Vouganis',                                    x: 2550, y: 1050 },

  /* Children of George D + Calipe */
  { id: 'evgenia',        name: 'Evgenia Demetriades',   alt: 'also Jeannie Demetriotes',  x: 3090, y: GY.II,
    bio: `Maiden name Eugenia Demetriades Demos. Born in Epirus and moved as a young child of four or five to Lamia in Roumeli with her sisters Mary and Andrina and her parents George and Calipe Demetriades. Married Constantine Skedros at seventeen after meeting him at a party — no dowry, because the family's money had been spent on Greek political activity.

She had twelve children. When her parents and siblings began emigrating to America starting with her sister Mary in 1898, she remained in Piraeus with her young family. Her father returned twice to Greece to visit her — once with grandmother Calipe to fetch their daughter Andrina, then again, after Andrina married in America, to spend a year with Eugenia.

She died around 1906 to 1909, weakened by the births of her twelve children. After her death her husband Constantine quietly sent the older children to America to be with the rest of the Demetriades family already established there.` },
  { id: 'zafero',         name: 'Zafero Demetriades',    alt: 'Anagnostos',                x: 3360, y: GY.II },
  { id: 'arthur_d',       name: 'Arthur Demetriades',                                      x: 3630, y: GY.II,
    bio: `Brother of Eugenia. One of three Demetriades brothers — John, Dan and Arthur — who ran candy stores and restaurants in Omaha, Nebraska. After the 1909 Omaha Greek riot destroyed their businesses, the brothers relocated to Grand Island, Nebraska, then eventually to Utah.

Uncle Arthur kept a farm in Bountiful, north of Salt Lake City. He was part of the family magnet that drew Helen and her siblings west after their arrival in America in 1911 — when Helen reached Salt Lake she was, in her own words, coming "because the other family was here."` },
  { id: 'rena_d',         name: 'Rena Demetriades',      alt: 'Pitchos by marriage',       x: 3900, y: GY.II },
  { id: 'john_d',         name: 'John Demetriades',      dates: 'b. 1872', note: 'in baptismal records of Flambourari', x: 4170, y: GY.II,
    bio: `Brother of Eugenia. Born 1872; recorded in the baptismal records of Flambourari, in Epirus. One of three Demetriades brothers — John, Dan and Arthur — who ran candy stores and restaurants in Omaha, Nebraska before the 1909 riot.

Helen recalled him most vividly from a moment during the Greek wars: "He came home and I was scared because I saw him, you know, with a gun. He was well educated. All my uncles were well educated." After the Omaha riot the brothers moved to Grand Island, Nebraska; Uncle John eventually came to Utah and farmed alongside his brother Arthur.` },
  { id: 'dan_d',          name: 'Dan Demetriades',       alt: 'Demosthenes',               x: 4440, y: GY.II,
    bio: `Brother of Eugenia. Formally Demosthenes; known as "Dan" in America. One of three Demetriades brothers — John, Dan and Arthur — who ran candy stores and restaurants in Omaha, Nebraska before the 1909 riot.

Helen remembered him most for meeting her, Taki and their younger sister at the dock in New York when their ship Patris landed before Christmas 1910. He brought train tickets and rode with them to Chicago, looking after them at the immigration table by speaking English on their behalf — which is why they never had to pass through Ellis Island.` },
  { id: 'maria_d',        name: 'Maria Demetriades',                                       x: 4710, y: GY.II,
    bio: `Eugenia's sister — "Aunt Mary" in family speech — and the first of the Demetriades to come to America. She arrived in 1898. She had trained in Greece as a dietitian and English-language translator, attended English school there, and worked at a hospital in Athens before emigrating. She lived first in the East — Boston and elsewhere — and was the family's pathfinder in the new country.

In the early 1900s she joined her brothers John, Dan and Arthur in Omaha, Nebraska, where they ran candy stores and restaurants. She was caught in the 1909 Omaha Greek riot: after a Greek immigrant allegedly killed a policeman, a mob descended on Greek-owned businesses. With her father George beside her, she called for police protection that never came, then went out into the crowd and addressed them in English. Their businesses were destroyed and Mary's health was permanently damaged. She hired a lawyer and got some compensation from the state of Nebraska, but the brothers never returned to Omaha.

She later lived in Utah and was the aunt who helped many of the family's women — including Helen herself — settle into Salt Lake.` },
  { id: 'andrina_d',      name: 'Andrina Demetriades',   note: "Eugenia's sister; Virginia's mother", x: 4980, y: GY.II,
    bio: `Eugenia's sister; Helen's aunt. Came to America with her parents George and Calipe Demetriades after her sister Mary had emigrated first in 1898. Helen's grandfather actually returned to Greece a third time only after Andrina was married in America — her wedding marks the moment the older Demetriades generation considered its work in America complete.

Mother of Virginia. Like the rest of the Demetriades women she ended up in the western branch of the family, settling in or near Salt Lake.` },
  { id: 'ben_d',          name: 'Ben Demetriades',       note: "Eugenia's brother; Sophie's father",  x: 5250, y: GY.II,
    bio: `Brother of Eugenia. Helen remembered him as one of the uncles who met her, Taki and their younger sister at the New York harbor in December 1910 — "Uncle Ben. That was Sophie's father."

Father of Sophie. Like the rest of the Demetriades brothers he was part of the Greek-American business community in Nebraska before the family migrated west.` },

  /* Children of Constantine R + Athena */
  { id: 'nike_r',         name: 'Nike Rizos',            alt: 'Andronike, m. Jimas',       x: 5550, y: GY.II },
  { id: 'james_jimas',    name: 'James Jimas',                                             x: 5820, y: GY.II },

  /* ---------- GENERATION III ---------- */
  /* Children of Constantine S + Evgenia. Placed directly under Gen II x-positions
     so each drop line travels through an empty column, not through other cards. */
  { id: 'james_k',        name: 'Demetrios K. Skedros',  alt: 'James K. Skedros',          x: 2820, y: GY.III,
    bio: `Formally Demetrios K. Skedros — known throughout his life in America as "James" or "Mr. Jim." Born in Piraeus to Constantine Skedros and Eugenia Demetriades, one of twelve siblings; brother of Helen Skedros Rizos.

Came to America before his sister Helen arrived in 1911 and was already established in Utah by then. He co-ran the Bingham drugstore with his brother-in-law Alex Rizos — Helen's husband — alternating months at the two stores to ease the back-and-forth between Salt Lake and the mining camp. Served in the military in 1912.

Through his marriage to Angeline Limberiou he was the father of Con Skedros and Greg Skedros, and grandfather of the present-day Skedros family.` },
  { id: 'epaminondas',    name: 'Epaminondas',           note: 'died at 14, TB',           x: 3090, y: GY.III, deceasedYoung: true }, /* under evgenia */
  { id: 'efrossini',      name: 'Efrossini',             note: 'died young in Chicago',    x: 3360, y: GY.III, deceasedYoung: true }, /* under zafero */
  { id: 'helen_s',        name: 'Helen Skedros',         dates: '1893 - 1975',             x: 4575, y: GY.III,
    bio: `Born in 1893 in Piraeus, the port of Athens. One of twelve children of Constantine Skedros and Eugenia Demetriades. Attended private school then public school, danced ballet, and remembered the family phonograph drawing neighbors to the window to listen.

Her mother died around 1906 to 1909. Her father, secretly dying himself, arranged passage for Helen, her brother Taki and her younger sister to America under the pretext of a visit to relatives. They sailed from Piraeus on December 6, 1910 aboard the ship Patris — first or second class, a twelve-day crossing, brief stop in Gibraltar. They landed in New York before Christmas. Uncle Dan met them at the dock with train tickets to Chicago, so they avoided Ellis Island.

After five months in Chicago she came west, arriving in Salt Lake City on May 21 or 22, 1911. She married Alexander C. Rizos in 1914 and spent a five-month honeymoon in Europe and Greece. They were in Liverpool the night Austria declared war on Serbia, and crossed the Austria-Serbia border by train without passports because Alex had checks for proof of means.

She became a U.S. citizen automatically on May 24, 1920 when Alex was naturalized. They had one child, Dino, who died young. After his death she began going down to the drugstore to work alongside Alex. She volunteered with the Red Cross for twenty-five years, knitting twenty-five sweaters plus socks during World War II, and was personally awarded a service certificate by President Truman at the Lafayette Ballroom in Salt Lake. Belonged to the Philoptochos Society and the Greek American Progressive Association. Republican.

She was interviewed for the Greek Archives at the University of Utah on November 20, 1974.` }, /* drop column free between dan_d/maria_d */
/* ---------- The eight remaining children of Constantine S + Evgenia ----------
     Helen stated in her 1974 interview that her parents had twelve children.
     James K, Epaminondas, Efrossini, and Helen are already in the tree above;
     the eight below fill out the family of twelve. */
  { id: 'taki_skedros',          name: 'Taki Skedros',          note: "Helen's brother; sailed Patris with her, Dec 1910",                      x: 4350, y: 1515,
    bio: `Helen Skedros Rizos's brother and her traveling companion on the voyage to America. He, Helen, and their youngest sister sailed from Piraeus on the ship Patris on December 6, 1910 — Taki in the men's section, the two girls with another lady in a women's room. They were met by Uncle Dan at the New York docks before Christmas and rode the train together to Chicago. He came to Salt Lake City with Helen in May 1911 after the five months in Chicago.

Helen mentioned in 1974 that one of her brothers went to war — she could not remember whether it was the first war or the second — and described a friend of his who was so scared the night before shipping out that he did not come back. Whether the brother in question was Taki or another sibling, the transcript does not make fully clear.` },
  { id: 'skedros_sister_bingham', name: 'younger sister',        alt: 'name unrecorded',      note: 'came on the Patris with Helen and Taki; died of pneumonia in Bingham',  x: 4620, y: 1515, unknown: true,
    bio: `Helen's youngest sister, who came to America with Helen and Taki on the Patris in late 1910 at the age of about seven or eight. After arriving in Utah she lived for a time with one of the aunts in Salt Lake, then with Helen up in Bingham, where Alex ran his second drugstore. She caught a cold that turned into pneumonia and died there. Helen referred to her only briefly in the 1974 interview and never said her name — only that "she got cold and turned in pneumonia and she died."` },
  { id: 'iros_skedros',          name: 'Iros (?) Skedros',      alt: "transcribed only as 'the heroes'", note: 'brother who died in Chicago; name uncertain', x: 4890, y: 1515, unknown: true,
    bio: `A brother whose name survives in the 1974 transcript only as "the heroes" — most likely a transcription artifact for Iros, Eros, or Heros. Helen mentioned him in passing when asked whether any of her siblings had lived outside of Utah: "No, except the heroes. He died in Chicago." Nothing more is recorded about him in the surviving interview.` },
  { id: 'unnamed_sk_1',          name: 'Skedros child',         note: 'one of twelve; name unrecorded', x: 3000, y: 1515, unknown: true },
  { id: 'unnamed_sk_2',          name: 'Skedros child',         note: 'one of twelve; name unrecorded', x: 3270, y: 1515, unknown: true },
  { id: 'unnamed_sk_3',          name: 'Skedros child',         note: 'one of twelve; name unrecorded', x: 3540, y: 1515, unknown: true },
  { id: 'unnamed_sk_4',          name: 'Skedros child',         note: 'one of twelve; name unrecorded', x: 3810, y: 1515, unknown: true },
  { id: 'unnamed_sk_5',          name: 'Skedros child',         note: 'one of twelve; name unrecorded', x: 4080, y: 1515, unknown: true },
  { id: 'alexander_r',    name: 'Alexander C. Rizos',    note: 'm. Helen Skedros',         x: 4845, y: GY.III,
    bio: `Born September 29, 1882 in Athens. His family moved to Epirus when he was young because his many sisters needed raising there — he was the only boy in the family. Earned a chemistry diploma in Greece in 1902.

Came to America that same year at age 23. Went to Chicago first because a Greek friend was already there and had promised to invest his $200 stake. The friend lost the money. Alex ate donuts and coffee for a long time and worked any job he could find, including slaughterhouse cleanup. He put himself through Northwestern University, graduating with a pharmacy degree on Wednesday, April 14, 1909. During summers he worked at the Demetriades uncles' candy store and restaurant in Omaha, Nebraska, where he became a beloved friend of Helen's family long before he ever met her.

He came to Utah in September 1909, worked at a Garfield drugstore for two or three months to qualify for his Utah license, then opened his own drugstore in October 1909 at 480 West 2nd South in Greek Town. He chose the location so that immigrants who didn't speak English could be helped — he served as informal pharmacist and translator for Slavs and other foreigners alongside the Greeks, often mixing the herb-and-folk remedies they remembered from their villages.

Later he opened a second drugstore in Bingham, alternating months with his brother-in-law James K. Skedros to cover both stores. He bought his first car in 1915 to ease the back-and-forth. Became a U.S. citizen on May 24, 1920.

He was a famously strong chess player. In a forty-board simultaneous exhibition against international grandmaster Samuel Reshevsky, Alex won his game; Reshevsky stopped in front of him and shook his hand. He died June 5, 1955.` },
  { id: 'virginia_d',     name: 'Virginia',              note: "Andrina's daughter; Helen's cousin",  x: 5430, y: 1515,
    bio: `Helen's first cousin — daughter of Aunt Andrina Demetriades. Mentioned throughout Helen's recollections as one of the Demetriades family in Salt Lake City. Helen marked her own transition into working at Alex's drugstore in part by Virginia's coming of age: "And after Virginia got married," Helen began going down to the store full time.` },
  { id: 'sophie_d',       name: 'Sophie',                note: "Ben's daughter; Helen's cousin",      x: 5700, y: 1515,
    bio: `Helen's first cousin — daughter of Uncle Ben Demetriades. When Helen first arrived in Salt Lake in 1911 she said "the only family I remember" by name from that time was Sophie's mother — Ben's wife. Sophie grew up within the close-knit Demetriades community that had clustered in Utah after the Omaha years.` },

  /* Children of John Vouganis. Placed under existing Gen II columns. */
  { id: 'taki_v',         name: 'Taki Vouganis',                                           x: 1620, y: GY.III }, /* under efthimia */
  { id: 'kiki_v',         name: 'Kiki Vouganis',                                           x: 1920, y: GY.III }, /* under john_v */
  { id: 'christhanthi_v', name: 'Christhanthi Vouganis',                                   x: 2190, y: GY.III }, /* under vassilis_v */

  /* Aristoteles V's single child */
  { id: 'george_v_jr',    name: 'George Vouganis',       note: 'son of Aristoteles',       x: 2460, y: GY.III },

  /* Limberiou couple - parents of Angeline. Placed in lower-left of Gen III. */
  { id: 'gregoire_l',     name: 'Gregoire Limberiou',                                      x: 1650, y: 1485 },
  { id: 'paraskevi_s',    name: 'Paraskevi Simmefis',                                      x: 1920, y: 1485 },

  /* Children of Nike R + James Jimas */
  { id: 'irene_j',        name: 'Irene Jimas',           dates: '1915 - 1997',             x: 5280, y: GY.III },
  { id: 'harry_j',        name: 'Harry Robert Jimas',    dates: '1917 - 2000',             x: 5550, y: GY.III },
  { id: 'andrew_j',       name: 'Andrew James Jimas',    dates: '1918 - 1958',             x: 5820, y: GY.III },
  { id: 'athena_j',       name: 'Athena Jimas',          dates: '1921 - 2002',             x: 5160, y: 1515 },

  /* ---------- GENERATION IV ---------- */
  /* Angeline placed at Gen IV; her marriage to James K (Gen III) is shown as an
     off-row vertical bracket. */
  { id: 'angeline_l',     name: 'Angeline Limberiou',    alt: 'Syros',                     x: 2820, y: GY.IV },
  { id: 'dino_r',         name: 'Constantine Rizos',     alt: 'Dino',                      x: 5700, y: GY.IV,
    bio: `Only child of Helen Skedros Rizos and Alexander C. Rizos. Formally Constantine after Alex's father, but always called Dino. Died young.

After his death Helen began going down to the drugstore to work alongside Alex, and recalled one of her first days: a customer came in asking for "Durham" and she didn't know what it was. She ran to ask Alex — "What is Durham?" — and he answered "Look there, you'll find it." She found Bull Durham loose tobacco on the shelf, sold it, and learned the trade from there.` },

  /* Children of James K + Angeline */
  { id: 'con_s',          name: 'Con Skedros',                                             x: 2550, y: GY.IV },
  { id: 'greg_s',         name: 'Greg Skedros',                                            x: 3090, y: GY.IV },

  /* Pappas couple, parents of Jenny */
  { id: 'john_p',         name: 'John Pappas',                                             x: 3780, y: GY.IV },
  { id: 'katina_p',       name: 'Katina Pappas',         alt: 'née Chotras',               x: 4050, y: GY.IV },

  /* ---------- GENERATION V ---------- */
  { id: 'anna',           name: 'Anna',                  alt: 'name only',                 x: 2280, y: GY.V, unknown: true },
  { id: 'jenny_p',        name: 'Jenny Pappas',          alt: 'm. Greg Skedros',           x: 3360, y: GY.V },
  { id: 'tom_p',          name: 'Tom Pappas',            alt: 'Athanasios',                x: 3780, y: GY.V },
  { id: 'alex_p',         name: 'Alex Pappas',                                             x: 4050, y: GY.V },

  /* ---------- GENERATION VI ---------- */
  { id: 'taki_s',         name: 'Taki Skedros',                                            x: 2490, y: GY.VI },
  { id: 'katina_s',       name: 'Katina Skedros',                                          x: 2760, y: GY.VI },
  { id: 'angel_s',        name: 'Angel Skedros',                                           x: 3030, y: GY.VI },
  { id: 'anthony_s',      name: 'Anthony Skedros',                                         x: 3300, y: GY.VI },
  { id: 'john_skedros_vi',name: 'John Skedros',                                            x: 3570, y: GY.VI },

  /* ---------- PAPPATHANACIO / PAPPAS (above John Pappas) ---------- */
  { id: 'athanasios_p',   name: 'Athanasios Pappathanacio', alt: 'shortened to Pappas in America',  x: 3960, y: GY.III },
  { id: 'yannoula_p',     name: 'Yannoula Pappathanacio',   alt: 'née Gouzounis',                   x: 3660, y: GY.III },

  /* Pappas siblings of John Pappas */
  { id: 'maria_pp',       name: 'Maria Pappas',                                                     x: 4320, y: GY.IV },
  { id: 'epthalia_pp',    name: 'Epthalia Pappas',                                                  x: 4590, y: GY.IV },
  { id: 'ageliki_pp',     name: 'Ageliki Pappas',                                                   x: 4860, y: GY.IV },
  { id: 'jim_pp',         name: 'Jim Pappas',                                                       x: 5130, y: GY.IV },
  { id: 'mike_pp',        name: 'Mike Pappas',                                                      x: 5400, y: GY.IV },

  /* Alex Pappas (existing) + wife Angeline and their children */
  { id: 'angeline_pp',    name: 'Angeline Pappas',          alt: 'née Poulakidis',                  x: 4320, y: GY.V },
  { id: 'kathryn_pp',     name: 'Kathryn Pappas',                                                   x: 3870, y: GY.VI },
  { id: 'jacquelyn_pp',   name: 'Jacquelyn Pappas',                                                 x: 4170, y: GY.VI },
  { id: 'dena_pp',        name: 'Dena Pappas',                                                      x: 4470, y: GY.VI },
  { id: 'john_alex_p',    name: 'John Pappas',              note: 'son of Alex and Angeline',       x: 4770, y: GY.VI },

  /* ---------- GOUZOUNIS (above Yannoula Pappathanacio) ---------- */
  { id: 'john_gouz_sr',   name: 'John Gouzounis',           note: 'patriarch of this line',         x: 5280, y: 1050 },
  { id: 'maria_dem',      name: 'Maria Gouzounis',          alt: 'née Demetrios',                   x: 5550, y: 1050 },

  /* Siblings of Yannoula — children of John Gouzounis + Maria Demetrios */
  { id: 'ageliki_gouz',   name: 'Ageliki Papanicolaou',     alt: 'née Gouzounis',                   x: 6150, y: GY.III },
  { id: 'nick_papa',      name: 'Nick Papanicolaou',                                                x: 6420, y: GY.III },
  { id: 'aspasia_gouz',   name: 'Aspasia Georgouses',       alt: 'née Gouzounis',   note: 'm. Constantine Georgouses (Demitrios + Maria\'s son)', x: 6720, y: GY.III },
  { id: 'asimo_gouz',     name: 'Asimo Gouzounis',                                                  x: 6990, y: GY.III },
  { id: 'frosini_gouz',   name: 'Frosini Gouzounis',        alt: 'née Gouzounis (cousin marriage)', x: 7530, y: GY.III },
  { id: 'gus_gouz',       name: 'Gus Gouzounis',                                                    x: 7800, y: GY.III },
  { id: 'haralambos_gouz',name: 'Haralambos Gouzounis',                                             x: 8100, y: GY.III },

  /* ---------- TOMARAS LINE (descendants of Ageliki Papanicolaou + Nick Papanicolaou) ---------- */
  /* Gen IV: Ageliki + Nick's children */
  { id: 'constantina_papa',  name: 'Constantina Tomaras',     alt: 'née Papanicolaou',          x: 6135, y: GY.IV },
  { id: 'peter_tomaras_sr',  name: 'Peter Tomaras',           alt: 'Panagioti',                 x: 6435, y: GY.IV },
  { id: 'maria_papa',        name: 'Maria Apostolis',         alt: 'née Papanicolaou (deceased)', x: 6735, y: GY.IV },
  { id: 'apostolos_anastasi',name: 'Apostolos Anastasi',                                        x: 7005, y: GY.IV },

  /* Gen V: Constantina + Peter Tomaras's children + spouses */
  { id: 'tom_tomaras',       name: 'Tom Tomaras',                                               x: 5700, y: GY.V },
  { id: 'joanna_tomaras',    name: 'Joanna Tomaras',                                            x: 5970, y: GY.V },
  { id: 'lula_bouskos',      name: 'Lula Bouskos',            alt: 'née Tomaras',               x: 6270, y: GY.V },
  { id: 'bill_bouskos',      name: 'Bill Bouskos',                                              x: 6540, y: GY.V },
  { id: 'mary_steel',        name: 'Mary Steel',              alt: 'née Tomaras',               x: 6840, y: GY.V },
  { id: 'george_steel',      name: 'George Steel',                                              x: 7110, y: GY.V },
  { id: 'george_tomaras_jr', name: 'George Tomaras',                                            x: 7410, y: GY.V },
  { id: 'maria_cuclis',      name: 'Maria Tomaras',           alt: 'née Cuclis',                x: 7680, y: GY.V },

  /* Gen V: Maria Apostolis + Apostolos Anastasi's children */
  { id: 'nikos_anast',       name: 'Nikos Anastasi',                                            x: 7980, y: GY.V },
  { id: 'kostas_anast',      name: 'Kostas Anastasi',                                           x: 8250, y: GY.V },
  { id: 'yannoula_anast',    name: 'Yannoula Anastasi',                                         x: 8520, y: GY.V },

  /* Gen VI: Tom + Joanna's son */
  { id: 'butch_tomaras',     name: 'Butch Tomaras',                                             x: 5835, y: GY.VI },

  /* Gen VI: Lula + Bill Bouskos's children */
  { id: 'angel_buck',        name: 'Angel Buck',              alt: 'née Bouskos',               x: 6150, y: GY.VI },
  { id: 'gary_buck',         name: 'Gary Buck',                                                 x: 6420, y: GY.VI },
  { id: 'arthur_bouskos',    name: 'Arthur Bouskos',                                            x: 6720, y: GY.VI },
  { id: 'dena_bouskos',      name: 'Dena Bouskos',                                              x: 6990, y: GY.VI },
  { id: 'peter_bouskos_old', name: 'Peter Bouskos',                                             x: 7260, y: GY.VI },
  { id: 'diana_collins',     name: 'Diana Bouskos',           alt: 'née Collins',               x: 7530, y: GY.VI },

  /* Gen VI: Mary + George Steel's children */
  { id: 'connie_steel',      name: 'Connie Steel',                                              x: 7860, y: GY.VI },
  { id: 'tia_jenson',        name: 'Tia Jenson',              alt: 'née Steel',                 x: 8160, y: GY.VI },
  { id: 'rob_jenson',        name: 'Rob Jenson',                                                x: 8430, y: GY.VI },

  /* Gen VI: George Tomaras Jr + Maria Cuclis's children */
  { id: 'kathie_kar',        name: 'Kathie Karagiannopoulos', alt: 'née Tomaras',               x: 8730, y: GY.VI },
  { id: 'vasili_kar',        name: 'Vasili Karagiannopoulos',                                   x: 9000, y: GY.VI },
  { id: 'peter_tomaras_jr',  name: 'Peter Tomaras',           note: 'Jr',                       x: 9300, y: GY.VI },

  /* ---------- FROSINI + GUS GOUZOUNIS's CHILDREN ---------- */
  { id: 'elena',             name: 'Elena Gouzounis',                                           x: 7500, y: GY.IV },
  { id: 'thespina',          name: 'Thespina Gouzounis',                                        x: 7800, y: GY.IV },

  /* ---------- HARALAMBOS + SOFIA GOUZOUNIS's FAMILY ---------- */
  { id: 'sofia_gorgo',       name: 'Sofia Gouzounis',         alt: 'née Gorgogianis',           x: 8370, y: GY.III },
  { id: 'tom_h_gouz',        name: 'Tom Gouzounis',           note: 'son of Haralambos',        x: 8100, y: GY.IV },
  { id: 'georgia_kats',      name: 'Georgia Gouzounis',       alt: 'née Katsimbas',             x: 8370, y: GY.IV },
  { id: 'georgia_h',         name: 'Georgia Gouzounis',       note: 'dau. of Haralambos',       x: 8670, y: GY.IV },
  { id: 'ageliki_h',         name: 'Ageliki Gouzounis',       note: 'dau. of Haralambos',       x: 8940, y: GY.IV },
  { id: 'dimitri_gouz',      name: 'Dimitri Gouzounis',       note: 'son of Tom + Georgia',     x: 8820, y: GY.V },
  { id: 'sofia_h',           name: 'Sofia',                   note: 'dau. of Georgia Hara',     x: 9120, y: GY.V },

  /* ---------- REMAINING GOUZOUNIS SIBLINGS (children of John Sr + Maria Demetrios) ---------- */
  { id: 'kostas_a',          name: 'Kostas',                  note: "Asimo's husband",          x: 7260, y: GY.III },
  { id: 'kostas_gouz',       name: 'Kostas Gouzounis',                                          x: 8670, y: GY.III },
  { id: 'maria_gouz',        name: 'Maria Gouzounis',         alt: 'née Gouzounis (deceased)',  x: 8940, y: GY.III },
  { id: 'georgia_g',         name: 'Georgia Gouzounis',       note: 'sister of Yannoula',       x: 9210, y: GY.III },
  { id: 'anna_gouz',         name: 'Anna Gouzounis',          alt: 'née Gouzounis',             x: 9480, y: GY.III },
  { id: 'john_gouz_jr',      name: 'John Gouzounis',          note: 'son',                      x: 9750, y: GY.III },
  { id: 'soultana_zag',      name: 'Soultana Gouzounis',      alt: 'née Zagrafos',              x: 10020, y: GY.III },
  { id: 'vasilis_gouz',      name: 'Vasilis Gouzounis',                                         x: 10320, y: GY.III },

  /* ---------- ASPASIA + DIMITRIOS KYRIAKIS CLUSTER (standalone) ---------- */
  { id: 'aspasia_k',         name: 'Aspasia Kyriakis',        alt: 'née Georgouses',            x: 12045, y: GY.III },
  { id: 'dimitrios_k',       name: 'Dimitrios Kyriakis',                                        x: 12315, y: GY.III },
  { id: 'maria_courtis',     name: 'Maria Courtis',           alt: 'née Kyriakis',              x: 9600, y: GY.IV },
  { id: 'george_courtis',    name: 'George Courtis',                                            x: 9870, y: GY.IV },
  { id: 'barbara_salazar',   name: 'Barbara Salazar',         alt: 'née Kyriakis',              x: 10170, y: GY.IV },
  { id: 'rene_salazar',      name: 'Rene Salazar',                                              x: 10440, y: GY.IV },
  { id: 'nick_k',            name: 'Nick Kyriakis',                                             x: 10740, y: GY.IV },
  { id: 'tony_k',            name: 'Tony Kyriakis',                                             x: 11040, y: GY.IV },
  { id: 'patricia_joffroy',  name: 'Patricia Kyriakis',       alt: 'née Joffroy',               x: 11310, y: GY.IV },
  { id: 'panagiotakis_g',    name: 'Panagiotakis Georgouses', note: 'named for grandfather',    x: 11610, y: GY.IV },
  { id: 'katina_sahnas',     name: 'Katina Sahnas',           alt: 'née Kyriakis',              x: 11910, y: GY.IV },
  { id: 'stratis_sahnas',    name: 'Stratis Sahnas',                                            x: 12180, y: GY.IV },
  { id: 'yannoula_velasco',  name: 'Yannoula Velasco',        alt: 'née Kyriakis',              x: 12480, y: GY.IV },
  { id: 'eduardo_velasco',   name: 'Eduardo Velasco',                                           x: 12750, y: GY.IV },
  { id: 'apostolos_k',       name: 'Apostolos Kyriakis',                                        x: 13050, y: GY.IV },
  { id: 'maribel_abud',      name: 'Maribel Kyriakis',        alt: 'née Abud',                  x: 13320, y: GY.IV },
  { id: 'nikita_k',          name: 'Nikita Kyriakis',                                           x: 13620, y: GY.IV },
  { id: 'omalena_corella',   name: 'Omalena Kyriakis',        alt: 'née Corella',               x: 13890, y: GY.IV },
  { id: 'dina_adamson',      name: 'Dina Adamson',            alt: 'née Kyriakis',              x: 14190, y: GY.IV },
  { id: 'john_adamson',      name: 'John Adamson',                                              x: 14460, y: GY.IV },
  { id: 'taki_k',            name: 'Taki Kyriakis',                                             x: 14760, y: GY.IV },

  /* ---------- ASPASIA KYRIAKIS GRANDCHILDREN (Gen V) ---------- */
  /* Maria + George Courtis's children */
  { id: 'james_courtis',     name: 'James Courtis',                                             x: 9540, y: GY.V },
  { id: 'michael_courtis',   name: 'Michael Courtis',                                           x: 9810, y: GY.V },
  { id: 'athena_courtis',    name: 'Athena Courtis',                                            x: 10080, y: GY.V },
  /* Barbara + Rene Salazar's children */
  { id: 'rene_jr_salazar',   name: 'Rene Salazar',            note: 'Jr',                       x: 10350, y: GY.V },
  { id: 'elias_salazar',     name: 'Elias Salazar',                                             x: 10620, y: GY.V },
  /* Tony + Patricia's son */
  { id: 'dimitri_kyriakis',  name: 'Dimitri Kyriakis',        note: "Tony + Patricia's son",    x: 11175, y: GY.V },
  /* Katina + Stratis Sahnas's children */
  { id: 'thano_sahnas',      name: 'Thano Sahnas',                                              x: 11880, y: GY.V },
  { id: 'dimitri_sahnas',    name: 'Dimitri Sahnas',                                            x: 12150, y: GY.V },
  { id: 'strato_sahnas',     name: 'Strato Sahnas',                                             x: 12420, y: GY.V },
  /* Nikita + Omalena's daughters */
  { id: 'yanula_k',          name: 'Yanula Kyriakis',                                           x: 13620, y: GY.V },
  { id: 'aspasia_k_jr',      name: 'Aspasia Kyriakis',        note: "Nikita's daughter",        x: 13890, y: GY.V },
  /* Dina + John Adamson's children */
  { id: 'tisa_hawk',         name: 'Tisa Hawk',               alt: 'née Adamson',               x: 14190, y: GY.V },
  { id: 'john_hawk',         name: 'John Hawk',                                                 x: 14460, y: GY.V },
  { id: 'larina_adamson',    name: 'Larina Adamson',                                            x: 14730, y: GY.V },
  { id: 'leana_adamson',     name: 'Leana Adamson',                                             x: 15000, y: GY.V },
  /* Tisa + John Hawk's daughter (Gen VI) */
  { id: 'joanna_hawk',       name: 'Joanna Hawk',                                               x: 14325, y: GY.VI },

  /* ---------- DEMITRIOS GEORGOUSES CLUSTER (standalone branch; Constantine m. aspasia_gouz) ---------- */
  /* Gen II */
  { id: 'demitrios_g',       name: 'Demitrios Georgouses',                                      x: 16200, y: GY.II },
  { id: 'maria_dg',          name: 'Maria Georgouses',        alt: 'née Georgouses (deceased)', x: 16470, y: GY.II },
  /* Gen III: their children */
  { id: 'yannoula_riakos',   name: 'Yannoula Riakos',         alt: 'née Georgouses',            x: 15900, y: GY.III },
  { id: 'riakos',            name: 'Riakos',                  note: 'first name unknown',       x: 16170, y: GY.III },
  { id: 'constantine_g',     name: 'Constantine Georgouses',  note: 'm. Aspasia Gouzounis',     x: 16470, y: GY.III },
  { id: 'maria_morris',      name: 'Maria Morris',            alt: 'née Georgouses',            x: 16770, y: GY.III },
  { id: 'john_morris',       name: 'John Morris',             note: 'Maretchikos',              x: 17040, y: GY.III },
  /* Gen IV: grandchildren */
  { id: 'gregory_riakos',    name: 'Gregory Riakos',                                            x: 15900, y: GY.IV },
  { id: 'spiro_riakos',      name: 'Spiro Riakos',                                              x: 16170, y: GY.IV },
  { id: 'jennie_anderson',   name: 'Jennie Anderson',         alt: 'née Morris (Yannoula)',     x: 16620, y: GY.IV },
  { id: 'michael_anderson',  name: 'Michael Anderson',        alt: 'deceased',                  x: 16890, y: GY.IV },
  { id: 'angela_galanis',    name: 'Angela Galanis',          alt: 'née Morris (Ageliki)',      x: 17190, y: GY.IV },
  { id: 'george_galanis',    name: 'George Galanis',          alt: 'deceased',                  x: 17460, y: GY.IV },
  /* Gen V: Jennie + Michael's children */
  { id: 'elizabeth_anderson',name: 'Elizabeth Anderson',                                        x: 16230, y: GY.V },
  { id: 'angelo_mountanos',  name: 'Angelo Mountanos',        note: 'divorced',                 x: 16500, y: GY.V },
  { id: 'andrew_anderson',   name: 'Andrew Anderson',                                           x: 16800, y: GY.V },
  { id: 'philip_anderson',   name: 'Philip Anderson',                                           x: 17070, y: GY.V },
  { id: 'michael_baurch',    name: 'Michael Anderson Baurch',                                   x: 17340, y: GY.V },
  /* Gen V: Angela + George Galanis's children */
  { id: 'ann_robert',        name: 'Ann Robert',              alt: 'née Galanis',               x: 17640, y: GY.V },
  { id: 'edouard_robert',    name: 'Edouard Robert',                                            x: 17910, y: GY.V },
  { id: 'helen_miller',      name: 'Helen Miller',            alt: 'née Galanis',               x: 18210, y: GY.V },
  { id: 'chris_galanis_son', name: 'Chris Galanis',                                             x: 18480, y: GY.V },
  { id: 'nick_galanis_son',  name: 'Nick Galanis',                                              x: 18750, y: GY.V },
  { id: 'ageliki_galanis',   name: 'Ageliki Galanis',         note: "Nick's wife",              x: 19020, y: GY.V },
  /* Gen VI: great-grandchildren */
  { id: 'michelle_mountanos',name: 'Michelle Mountanos',                                        x: 16365, y: GY.VI },
  { id: 'steven_robert',     name: 'Steven Robert',                                             x: 17640, y: GY.VI },
  { id: 'edouard_robert_jr', name: 'Edouard Robert',          note: 'Jr',                       x: 17910, y: GY.VI },
  { id: 'desiree_robert',    name: 'Desiree Robert',                                            x: 18180, y: GY.VI },
  { id: 'chris_miller',      name: 'Chris Miller',                                              x: 18450, y: GY.VI },
  { id: 'sheree_miller',     name: 'Sheree Miller',                                             x: 18720, y: GY.VI },
  { id: 'george_galanis_jr', name: 'George Galanis',          note: 'Jr',                       x: 18990, y: GY.VI },

  /* ---------- VASILIKI KACHOUDAS MINI-ISLAND ---------- */
  { id: 'vasiliki_kach',     name: 'Vasiliki Kachoudas',      alt: 'née Georgouses (deceased)', x: 19500, y: GY.II },
  { id: 'thoumas_kach',      name: 'Thoumas Kachoudas',                                         x: 19770, y: GY.II },
  { id: 'georgia_kach',      name: 'Georgia Kachoudas',                                         x: 19635, y: GY.III },

  /* ---------- (GIANNIS) JOHN C. GEORGOUSES CLUSTER (standalone, related to Vasiliki Kachoudas) ---------- */
  /* Gen II */
  { id: 'giannis_jc',        name: 'John C. Georgouses',      alt: 'Giannis (deceased)',        x: 20250, y: GY.II },
  { id: 'efthemia_santos',   name: 'Efthemia Georgouses',     alt: 'née Santos',                x: 20520, y: GY.II },
  /* Gen III: their children + spouses */
  { id: 'katherine_beys',    name: 'Katherine Beys',          alt: 'née Georgouses (Katina)',   x: 19935, y: GY.III },
  { id: 'andrew_beys',       name: 'Andrew Beys',             alt: 'Andre',                     x: 20205, y: GY.III },
  { id: 'gus_gjc',           name: 'Gus Georgouses',          alt: 'Kostas (Greek name)',       x: 20505, y: GY.III },
  { id: 'bessie_papas',      name: 'Bessie Georgouses',       alt: 'née Pappas',                x: 20775, y: GY.III },
  { id: 'sylvia_dem',        name: 'Sylvia Demakopoulos',     alt: 'née Georgouses (Argero)',   x: 21075, y: GY.III },
  { id: 'james_dem',         name: 'James Demakopoulos',                                        x: 21345, y: GY.III },
  { id: 'florence_barnett',  name: 'Florence Barnett',        alt: 'née Georgouses (Aspasia)',  x: 21645, y: GY.III },
  { id: 'earl_barnett',      name: 'Earl Barnett',            note: '2nd husband',              x: 21915, y: GY.III },
  /* Gen IV: grandchildren */
  { id: 'helen_catsinas',    name: 'Helen Catsinas',          alt: 'née Beys (Eleni)',          x: 19890, y: GY.IV },
  { id: 'gregory_catsinas',  name: 'Gregory Catsinas',                                          x: 20160, y: GY.IV },
  { id: 'thalia_beys',       name: 'Thalia Beys',                                               x: 20520, y: GY.IV },
  { id: 'sofia_osborne',     name: 'Sofia Osborne',           alt: 'née Demakopoulos',          x: 20940, y: GY.IV },
  { id: 'larry_osborne',     name: 'Larry Osborne',                                             x: 21210, y: GY.IV },
  { id: 'temia_dem',         name: 'Temia Demakopoulos',                                        x: 21480, y: GY.IV },
  { id: 'arthur_nastos',     name: 'Arthur Nastos',           note: "Florence's son (1st m.)",  x: 21750, y: GY.IV },
  { id: 'gayle_hanson',      name: 'Gayle Hanson',            alt: 'née Nastos',                x: 22020, y: GY.IV },
  { id: 'pamela_potts',      name: 'Pamela Potts',            alt: 'née Nastos',                x: 22290, y: GY.IV },
  { id: 'ron_potts',         name: 'Ron Potts',                                                 x: 22560, y: GY.IV },
  /* Gen V: great-grandchildren */
  { id: 'kathy_cats',        name: 'Kathy Catsinas',                                            x: 19800, y: GY.V },
  { id: 'elizabeth_cats',    name: 'Elizabeth Catsinas',                                        x: 20070, y: GY.V },
  { id: 'gregory_cats_jr',   name: 'Gregory Catsinas',        note: 'Jr',                       x: 20340, y: GY.V },
  { id: 'sharon_osb',        name: 'Sharon Osborne',                                            x: 20820, y: GY.V },
  { id: 'valerie_osb',       name: 'Valerie Osborne',                                           x: 21090, y: GY.V },
  { id: 'margaret_osb',      name: 'Margaret Osborne',                                          x: 21360, y: GY.V },
  { id: 'ryan_potts',        name: 'Ryan Potts',                                                x: 22425, y: GY.V },

  /* ---------- AVGARES CLAN (top row, standalone) ---------- */
  /* Gen II */
  { id: 'evangelos_avg',     name: 'Evangelos Avgares',                                         x: 24615, y: GY.II },
  { id: 'katerine_avg',      name: 'Katerine Avgares',        alt: 'née Georgouses',            x: 24885, y: GY.II },
  /* Gen III: their 7 children + spouses */
  { id: 'jim_avg',           name: 'Jim Avgares',             note: 'wife unnamed',             x: 23250, y: GY.III },
  { id: 'kostas_avg',        name: 'Kostas Avgares',                                            x: 23700, y: GY.III },
  { id: 'asimo_katchoudas',  name: 'Asimo Avgares',           alt: 'née Katchoudas',            x: 23970, y: GY.III },
  { id: 'tom_avg',           name: 'Tom Avgares',                                               x: 24270, y: GY.III },
  { id: 'andrew_avg',        name: 'Andrew Avgares',                                            x: 24570, y: GY.III },
  { id: 'costandia_avg',     name: 'Costandia Avgares',                                         x: 24840, y: GY.III },
  { id: 'george_avg',        name: 'George Avgares',                                            x: 25140, y: GY.III },
  { id: 'maria_palam',       name: 'Maria Avgares',           alt: 'née Palameotis',            x: 25410, y: GY.III },
  { id: 'basilis_avg',       name: 'Basilis Avgares',                                           x: 25710, y: GY.III },
  { id: 'asimo_let',         name: 'Asimo Letopoulos',        alt: 'née Avgares',               x: 26010, y: GY.III },
  { id: 'nick_let',          name: 'Nick Letopoulos',                                           x: 26280, y: GY.III },
  /* Gen IV grandchildren */
  { id: 'yannoula_char',     name: 'Yannoula Charchalis',     alt: 'née Avgares',               x: 22950, y: GY.IV },
  { id: 'spero_char',        name: 'Spero Charchalis',        note: '4-5 kids in Australia',    x: 23220, y: GY.IV },
  { id: 'katerine_angelo',   name: 'Katerine Angelogeorgeous',alt: 'née Avgares',               x: 23520, y: GY.IV },
  { id: 'pano_angelo',       name: 'Pano Angelogeorgeous',                                      x: 23790, y: GY.IV },
  { id: 'regina_avg',        name: 'Regina Lepinotes',        alt: 'née Avgares',               x: 24060, y: GY.IV },
  { id: 'efthemia_lep',      name: 'Efthemia Lepinotes',      alt: 'née Avgares',               x: 24360, y: GY.IV },
  { id: 'louis_lep',         name: 'Louis Lepinotes',                                           x: 24630, y: GY.IV },
  { id: 'vasiliki_palam',    name: 'Vasiliki Zographos',      alt: 'née Palameotis',            x: 24960, y: GY.IV },
  { id: 'kostas_zog',        name: 'Kostas Avgares Zographos',                                  x: 25230, y: GY.IV },
  { id: 'katina_zog',        name: 'Katina Zographos',        alt: 'née Avgares',               x: 25500, y: GY.IV },
  { id: 'dimitre_zog',       name: 'Dimitre Zographos',                                         x: 25770, y: GY.IV },
  { id: 'costadino_avg',     name: 'Costadino Avgares',                                         x: 26070, y: GY.IV },
  /* Gen V great-grandchildren */
  { id: 'aspasia_angelo',    name: 'Aspasia Angelogeorgeous',                                   x: 23520, y: GY.V },
  { id: 'demetra_angelo',    name: 'Demetra Angelogeorgeous',                                   x: 23790, y: GY.V },
  { id: 'john_angelo',       name: 'John Angelogeorgeous',                                      x: 24060, y: GY.V },
  { id: 'geogia_kanboris',   name: 'Geogia Kanboris',         alt: 'née Lepinotes',             x: 24360, y: GY.V },
  { id: 'gus_kanboris',      name: 'Gus Kanboris',                                              x: 24630, y: GY.V },
  { id: 'soula_avg',         name: 'Soula Avgares',                                             x: 25635, y: GY.V },
  /* Gen VI Avgares great-great-grandchildren */
  { id: 'argerie_kanboris',  name: 'Argerie Kanboris',                                          x: 24210, y: GY.VI },
  { id: 'efthemia_kanboris', name: 'Efthemia Kanboris',                                         x: 24480, y: GY.VI },
  { id: 'demetra_kanboris',  name: 'Demetra Kanboris',                                          x: 24750, y: GY.VI },

  /* ---------- PANAYIOTI GEORGOUSES + MARIA PAPAGOURDI (bottom row standalone) ---------- */
  { id: 'panayioti_g',       name: 'Panayioti Georgouses',    alt: 'deceased',                  x: 1200, y: 3150 },
  { id: 'maria_papa_g',      name: 'Maria Georgouses',        alt: 'née Papagourdi',            x: 1470, y: 3150 },
  { id: 'gus_g_panay',       name: 'Gus Georgouses',          note: "Panayioti's son",          x: 1050, y: 3600 },
  { id: 'milton_g',          name: 'Milton Georgouses',                                         x: 1320, y: 3600 },
  { id: 'nick_g_panay',      name: 'Nick Georgouses',         note: "Panayioti's son",          x: 1590, y: 3600 },
  { id: 'fotoula',           name: 'Fotoula',                 note: "Nick's wife (divorced)",   x: 1860, y: 3600 },
  { id: 'john_g_panay',      name: 'John Georgouses',         note: 'Nick + Fotoula\'s son',   x: 1725, y: 4050 },

  /* ---------- NIKOLAOU NICK GEORGOUSES LINEAGE (bottom row standalone) ---------- */
  { id: 'nikolaou_g',        name: 'Nick Georgouses',         alt: 'Nikolaou (1st husband)',    x: 3300, y: 3150 },
  { id: 'panayota_pet',      name: 'Panayota Petoumenos',     alt: 'née Spiropoulos',           x: 3570, y: 3150 },
  { id: 'chris_pet',         name: 'Chris Petoumenos',        note: "Panayota's 2nd husband",   x: 3840, y: 3150 },
  { id: 'chris_g_nik',       name: 'Chris Georgouses',        note: "Nick's son",               x: 3150, y: 3600 },
  { id: 'irene_g',           name: 'Irene Georgouses',                                          x: 3420, y: 3600 },
  { id: 'pete_g_nik',        name: 'Pete Georgouses',                                           x: 3720, y: 3600 },
  { id: 'venus_g',           name: 'Venus Georgouses',        alt: 'née Tsouras',               x: 3990, y: 3600 },
  { id: 'tom_g_nik',         name: 'Tom Georgouses',          note: "Nick's son, single",       x: 4290, y: 3600 },
  { id: 'maggie_greenberg',  name: 'Maggie Stephanie Greenberg', alt: 'née Georgouses (multi)', x: 3285, y: 4050 },
  { id: 'jack_greenberg',    name: 'Jack Greenberg',                                            x: 3555, y: 4050 },
  { id: 'christine_tourney', name: 'Christine Tourney',       alt: 'née Georgouses',            x: 3855, y: 4050 },
  { id: 'robert_tourney',    name: 'Robert Tourney',                                            x: 4125, y: 4050 },
  { id: 'lorraine_g',        name: 'Lorraine Greenberg',                                        x: 3285, y: 4500 },
  { id: 'joanne_g',          name: 'Joanne Greenberg',                                          x: 3555, y: 4500 },
  { id: 'becky_t',           name: 'Becky Tourney',                                             x: 3855, y: 4500 },
  { id: 'nicolette_t',       name: 'Nicolette Tourney',                                         x: 4125, y: 4500 },

  /* ---------- (DEMETRI) JAMES GEORGOUSES + MATINA + BOUSKOS (bottom row) ---------- */
  { id: 'demetri_james_g',   name: 'James Georgouses',        alt: 'Demetri (deceased)',        x: 6600, y: 3150 },
  { id: 'matina_vrahos',     name: 'Matina Georgouses',       alt: 'née Vrahos',                x: 6870, y: 3150 },
  { id: 'frances_bouskos',   name: 'Frances Bouskos',         alt: 'née Georgouses',            x: 6600, y: 3600 },
  { id: 'michael_b_d',       name: 'Michael Bouskos',                                           x: 6870, y: 3600 },
  { id: 'ann_andros',        name: 'Ann Andros',              alt: 'née Bouskos',               x: 6150, y: 4050 },
  { id: 'george_andros',     name: 'George Andros',                                             x: 6420, y: 4050 },
  { id: 'ernest_bouskos',    name: 'Ernest Bouskos',                                            x: 6720, y: 4050 },
  { id: 'andriana_arvanites',name: 'Andriana Bouskos',        alt: 'née Arvanites',             x: 6990, y: 4050 },
  { id: 'james_bouskos_old', name: 'James Bouskos',           note: 'brother',                  x: 7290, y: 4050 },
  { id: 'lisa_andros',       name: 'Lisa Andros',                                               x: 6150, y: 4500 },
  { id: 'danny_andros',      name: 'Danny Andros',                                              x: 6420, y: 4500 },
  { id: 'michael_b_son',     name: 'Michael Bouskos',         note: "Ernest's son",             x: 6720, y: 4500 },
  { id: 'james_b_jr',        name: 'James Bouskos',           note: "Ernest's son",             x: 6990, y: 4500 },

  /* ---------- (ATHANASIOS) TOM GEORGOUSES + ANGELO PAPPAS (bottom row) ---------- */
  { id: 'athanasios_tom_g',  name: 'Tom Georgouses',          alt: 'Athanasios (deceased)',     x: 9450, y: 3150 },
  { id: 'angelo_pappas',     name: 'Angelo Georgouses Panos', alt: 'née Pappas',                x: 9720, y: 3150 },
  { id: 'john_g_at',         name: 'John Georgouses',         note: "Athanasios's son",         x: 9720, y: 3600 },
  { id: 'betty_at',          name: 'Betty Georgouses',        note: "John's 2nd wife",          x: 9990, y: 3600 },
  { id: 'linda_gularte',     name: 'Linda Gularte',           note: "John's 1st-marriage dau.", x: 9285, y: 4050 },
  { id: 'mike_gularte',      name: 'Mike Gularte',                                              x: 9555, y: 4050 },
  { id: 'tom_g_at',          name: 'Tom Georgouses',          note: "John + Betty's son",       x: 9855, y: 4050 },
  { id: 'toni_g_swanson',    name: 'Toni Swanson',            alt: 'née Georgouses',            x: 10155, y: 4050 },
  { id: 'swanson_husb',      name: 'Swanson',                 note: "Toni's husband",           x: 10425, y: 4050 },
  { id: 'gabe_gularte',      name: 'Gabe Gularte',                                              x: 9420, y: 4500 },
  { id: 'stephanie_swanson', name: 'Stephanie Swanson',       note: 'twin',                     x: 10020, y: 4500 },
  { id: 'stacy_swanson',     name: 'Stacy Swanson',           note: 'twin',                     x: 10290, y: 4500 },
  { id: 'michael_swanson',   name: 'Michael Swanson',                                           x: 10560, y: 4500 },

  /* ---------- JIM GEORGOUSES + TULA POLIZOIS + VAN FOSSEN (bottom row) ---------- */
  { id: 'georgia_polizois',  name: 'Georgia Polizois',        alt: 'née Georgouses',            x: 12000, y: 3150 },
  { id: 'alex_polizois',     name: 'Alex Polizois',                                             x: 12270, y: 3150 },
  { id: 'jim_g_jim',         name: 'Jim Georgouses',          note: "Tula's husband",           x: 12000, y: 3600 },
  { id: 'tula_polizois',     name: 'Tula Georgouses',         alt: 'née Polizois',              x: 12270, y: 3600 },
  { id: 'linda_stevenson',   name: 'Linda Georgouses',        alt: "née Stevenson (Alex's 1st)",x: 11700, y: 4050 },
  { id: 'alex_g_jim',        name: 'Alex Georgouses',         note: "Jim + Tula's son",         x: 11970, y: 4050 },
  { id: 'debbie_dean',       name: 'Debbie Georgouses',       alt: "née Dean (Alex's 2nd)",     x: 12240, y: 4050 },
  { id: 'yotetsa_vf',        name: 'Yotetsa Van Fossen',      alt: 'née Georgouses',            x: 12540, y: 4050 },
  { id: 'rick_vf',           name: 'Rick Van Fossen',                                           x: 12810, y: 4050 },
  { id: 'alexis_vf',         name: 'Alexis Van Fossen',                                         x: 12675, y: 4500 },

  /* ---------- PASS 6 ADDITIONS: people missed in earlier passes ---------- */
  /* Bill Hanson (Gayle's ex-husband) - put at sub-row y=1375 between Gen IV and Gen V */
  { id: 'bill_hanson',       name: 'Bill Hanson',             note: 'm. Gayle Nastos (divorced)', x: 22020, y: 2062 },
  { id: 'nillaby_hanson',    name: 'Nillaby Hanson',          note: "Gayle + Bill's daughter",    x: 21870, y: GY.V },
  /* Nick + Ageliki Galanis's 3 additional daughters (image 3) */
  { id: 'ge_galanis',        name: 'Ge_ Galanis',             note: 'first name partial in source', x: 19260, y: GY.VI },
  { id: 'maria_galanis',     name: 'Maria Galanis',                                              x: 19530, y: GY.VI },
  { id: 'christine_galanis', name: 'Christine Galanis',                                          x: 19800, y: GY.VI },
  /* Antoni / Tony Georgouses (image 5 - appears near Alex Pappas's children; parent unclear) */
  { id: 'tony_g_antoni',     name: 'Tony Georgouses',         note: 'Antoni; source: ambiguous parent line', x: 15750, y: 3150 },

  /* ---------- PASS 7 ADDITION ---------- */
  { id: 'thano_adamson',     name: 'Thano Adamson',           note: '4th sibling, name spanned page fold in source', x: 15270, y: GY.V },
];

const marriages = [
  ['john_sr_wife', 'john_sr'],
  ['vouganis_sr', 'vasiliki_v'],
  ['george_d', 'calipe'],
  ['constantine_r', 'athena_k'],
  ['constantine_s', 'evgenia'],
  ['nike_r', 'james_jimas'],
  ['helen_s', 'alexander_r'],
  ['gregoire_l', 'paraskevi_s'],
  ['james_k', 'angeline_l'],
  ['con_s', 'anna'],
  ['greg_s', 'jenny_p'],
  ['john_p', 'katina_p'],

  /* Pappathanacio + Pappas */
  ['athanasios_p', 'yannoula_p'],
  ['alex_p', 'angeline_pp'],

  /* Gouzounis */
  ['john_gouz_sr', 'maria_dem'],
  ['ageliki_gouz', 'nick_papa'],
  ['frosini_gouz', 'gus_gouz'],

  /* Tomaras line couples */
  ['constantina_papa', 'peter_tomaras_sr'],
  ['maria_papa', 'apostolos_anastasi'],
  ['tom_tomaras', 'joanna_tomaras'],
  ['lula_bouskos', 'bill_bouskos'],
  ['mary_steel', 'george_steel'],
  ['george_tomaras_jr', 'maria_cuclis'],
  ['angel_buck', 'gary_buck'],
  ['peter_bouskos_old', 'diana_collins'],
  ['tia_jenson', 'rob_jenson'],
  ['kathie_kar', 'vasili_kar'],

  /* Haralambos's family couples */
  ['haralambos_gouz', 'sofia_gorgo'],
  ['tom_h_gouz', 'georgia_kats'],

  /* Remaining Gouzounis sibling couples */
  ['asimo_gouz', 'kostas_a'],
  ['john_gouz_jr', 'soultana_zag'],

  /* Aspasia Kyriakis cluster couples */
  ['aspasia_k', 'dimitrios_k'],
  ['maria_courtis', 'george_courtis'],
  ['barbara_salazar', 'rene_salazar'],
  ['tony_k', 'patricia_joffroy'],
  ['katina_sahnas', 'stratis_sahnas'],
  ['yannoula_velasco', 'eduardo_velasco'],
  ['apostolos_k', 'maribel_abud'],
  ['nikita_k', 'omalena_corella'],
  ['dina_adamson', 'john_adamson'],

  /* Demitrios cluster couples */
  ['demitrios_g', 'maria_dg'],
  ['yannoula_riakos', 'riakos'],
  ['maria_morris', 'john_morris'],
  ['jennie_anderson', 'michael_anderson'],
  ['angela_galanis', 'george_galanis'],
  ['elizabeth_anderson', 'angelo_mountanos'],
  ['ann_robert', 'edouard_robert'],
  ['nick_galanis_son', 'ageliki_galanis'],
  ['tisa_hawk', 'john_hawk'],

  /* Vasiliki Kachoudas couple */
  ['vasiliki_kach', 'thoumas_kach'],

  /* (Giannis) John C. Georgouses cluster couples */
  ['giannis_jc', 'efthemia_santos'],
  ['katherine_beys', 'andrew_beys'],
  ['gus_gjc', 'bessie_papas'],
  ['sylvia_dem', 'james_dem'],
  ['florence_barnett', 'earl_barnett'],
  ['helen_catsinas', 'gregory_catsinas'],
  ['sofia_osborne', 'larry_osborne'],
  ['pamela_potts', 'ron_potts'],

  /* Avgares clan couples */
  ['evangelos_avg', 'katerine_avg'],
  ['kostas_avg', 'asimo_katchoudas'],
  ['andrew_avg', 'costandia_avg'],
  ['george_avg', 'maria_palam'],
  ['asimo_let', 'nick_let'],
  ['yannoula_char', 'spero_char'],
  ['katerine_angelo', 'pano_angelo'],
  ['efthemia_lep', 'louis_lep'],
  ['vasiliki_palam', 'kostas_zog'],
  ['katina_zog', 'dimitre_zog'],
  ['geogia_kanboris', 'gus_kanboris'],

  /* Panayioti family couples */
  ['panayioti_g', 'maria_papa_g'],
  ['nick_g_panay', 'fotoula'],

  /* Nikolaou Nick Georgouses lineage couples */
  ['nikolaou_g', 'panayota_pet'],
  ['panayota_pet', 'chris_pet'],
  ['chris_g_nik', 'irene_g'],
  ['pete_g_nik', 'venus_g'],
  ['maggie_greenberg', 'jack_greenberg'],
  ['christine_tourney', 'robert_tourney'],

  /* James Demetri Georgouses + Bouskos couples */
  ['demetri_james_g', 'matina_vrahos'],
  ['frances_bouskos', 'michael_b_d'],
  ['ann_andros', 'george_andros'],
  ['ernest_bouskos', 'andriana_arvanites'],

  /* Athanasios Tom Georgouses + Angelo Pappas couples */
  ['athanasios_tom_g', 'angelo_pappas'],
  ['john_g_at', 'betty_at'],
  ['linda_gularte', 'mike_gularte'],
  ['toni_g_swanson', 'swanson_husb'],

  /* Jim Georgouses + Tula Polizois couples */
  ['georgia_polizois', 'alex_polizois'],
  ['jim_g_jim', 'tula_polizois'],
  ['alex_g_jim', 'debbie_dean'],
  ['yotetsa_vf', 'rick_vf'],
];

/* busLevel 1..5: where the horizontal trunk sits inside the gap between
   parent and child generation. Lower = closer to parent. Used to fan out
   parallel families so trunks don't overlap. */

const descent = [
  /* Gen I -> Gen II */
  { from: 'demetrios_sr',                    to: 'dimitrios',      busLevel: 1 },
  { from: 'demetrios_sr',                    to: 'gm_psalmos',     busLevel: 1 },

  { from: 'john_sr+john_sr_wife',            to: 'kosta',          busLevel: 4 },
  { from: 'john_sr+john_sr_wife',            to: 'maria_s',        busLevel: 4 },
  { from: 'john_sr+john_sr_wife',            to: 'james_portland', busLevel: 4 },
  { from: 'john_sr+john_sr_wife',            to: 'efthimia',       busLevel: 4 },
  { from: 'john_sr+john_sr_wife',            to: 'constantine_s',  busLevel: 4 },

  { from: 'vouganis_sr+vasiliki_v',          to: 'john_v',         busLevel: 2 },
  { from: 'vouganis_sr+vasiliki_v',          to: 'vassilis_v',     busLevel: 2 },
  { from: 'vouganis_sr+vasiliki_v',          to: 'george_v',       busLevel: 2 },
  { from: 'vouganis_sr+vasiliki_v',          to: 'aristoteles_v',  busLevel: 2 },

  { from: 'george_d+calipe',                 to: 'evgenia',        busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'zafero',         busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'arthur_d',       busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'rena_d',         busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'john_d',         busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'dan_d',          busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'maria_d',        busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'andrina_d',      busLevel: 3 },
  { from: 'george_d+calipe',                 to: 'ben_d',          busLevel: 3 },
  { from: 'andrina_d',                       to: 'virginia_d',     busLevel: 2 },
  { from: 'ben_d',                           to: 'sophie_d',       busLevel: 2 },

  { from: 'constantine_r+athena_k',          to: 'nike_r',         busLevel: 2 },

  /* Gen II -> Gen III */
  { from: 'constantine_s+evgenia',           to: 'james_k',        busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'epaminondas',    busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'efrossini',      busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'helen_s',        busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'taki_skedros',           busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'skedros_sister_bingham', busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'iros_skedros',           busLevel: 1 },
  { from: 'constantine_s+evgenia',           to: 'unnamed_sk_1',           busLevel: 2 },
  { from: 'constantine_s+evgenia',           to: 'unnamed_sk_2',           busLevel: 2 },
  { from: 'constantine_s+evgenia',           to: 'unnamed_sk_3',           busLevel: 2 },
  { from: 'constantine_s+evgenia',           to: 'unnamed_sk_4',           busLevel: 2 },
  { from: 'constantine_s+evgenia',           to: 'unnamed_sk_5',           busLevel: 2 },

  { from: 'john_v',                          to: 'taki_v',         busLevel: 2 },
  { from: 'john_v',                          to: 'kiki_v',         busLevel: 2 },
  { from: 'john_v',                          to: 'christhanthi_v', busLevel: 2 },

  { from: 'aristoteles_v',                   to: 'george_v_jr',    busLevel: 2 },

  { from: 'nike_r+james_jimas',              to: 'irene_j',        busLevel: 3 },
  { from: 'nike_r+james_jimas',              to: 'harry_j',        busLevel: 3 },
  { from: 'nike_r+james_jimas',              to: 'andrew_j',       busLevel: 3 },
  { from: 'nike_r+james_jimas',              to: 'athena_j',       busLevel: 3 },

  /* Gen II -> Gen III (off-cycle, Alexander R is a Gen II person whose marriage
     to Gen III Helen places him visually at Gen III for clarity) */
  { from: 'constantine_r+athena_k',          to: 'alexander_r',    busLevel: 2 },

  /* Gen III -> Gen IV */
  { from: 'helen_s+alexander_r',             to: 'dino_r',         busLevel: 2 },
  { from: 'gregoire_l+paraskevi_s',          to: 'angeline_l',     busLevel: 2 },

  /* Gen III/IV -> Gen IV (off-row couple) */
  { from: 'james_k+angeline_l',              to: 'con_s',          busLevel: 2 },
  { from: 'james_k+angeline_l',              to: 'greg_s',         busLevel: 2 },

  /* Gen IV -> Gen V */
  { from: 'john_p+katina_p',                 to: 'jenny_p',        busLevel: 2 },
  { from: 'john_p+katina_p',                 to: 'tom_p',          busLevel: 2 },
  { from: 'john_p+katina_p',                 to: 'alex_p',         busLevel: 2 },

  /* Gen V -> Gen VI */
  { from: 'greg_s+jenny_p',                  to: 'taki_s',         busLevel: 2 },
  { from: 'greg_s+jenny_p',                  to: 'katina_s',       busLevel: 2 },
  { from: 'greg_s+jenny_p',                  to: 'angel_s',        busLevel: 2 },
  { from: 'greg_s+jenny_p',                  to: 'anthony_s',      busLevel: 2 },
  { from: 'greg_s+jenny_p',                  to: 'john_skedros_vi',busLevel: 2 },

  /* Pappathanacio -> Pappas siblings (existing John Pappas is one of them) */
  { from: 'athanasios_p+yannoula_p', to: 'john_p',      busLevel: 2 },
  { from: 'athanasios_p+yannoula_p', to: 'jim_pp',      busLevel: 2 },
  { from: 'athanasios_p+yannoula_p', to: 'mike_pp',     busLevel: 2 },
  { from: 'athanasios_p+yannoula_p', to: 'maria_pp',    busLevel: 2 },
  { from: 'athanasios_p+yannoula_p', to: 'epthalia_pp', busLevel: 2 },
  { from: 'athanasios_p+yannoula_p', to: 'ageliki_pp',  busLevel: 2 },

  /* Alex Pappas + Angeline -> their children */
  { from: 'alex_p+angeline_pp', to: 'kathryn_pp',   busLevel: 2 },
  { from: 'alex_p+angeline_pp', to: 'jacquelyn_pp', busLevel: 2 },
  { from: 'alex_p+angeline_pp', to: 'dena_pp',      busLevel: 2 },
  { from: 'alex_p+angeline_pp', to: 'john_alex_p',  busLevel: 2 },

  /* John + Maria Gouzounis -> Yannoula and her siblings */
  { from: 'john_gouz_sr+maria_dem', to: 'yannoula_p',      busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'ageliki_gouz',    busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'aspasia_gouz',    busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'asimo_gouz',      busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'frosini_gouz',    busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'haralambos_gouz', busLevel: 2 },

  /* Ageliki Papanicolaou + Nick Papanicolaou -> Tomaras + Apostolis daughters */
  { from: 'ageliki_gouz+nick_papa', to: 'constantina_papa', busLevel: 2 },
  { from: 'ageliki_gouz+nick_papa', to: 'maria_papa',       busLevel: 2 },

  /* Constantina + Peter Tomaras -> their children */
  { from: 'constantina_papa+peter_tomaras_sr', to: 'tom_tomaras',       busLevel: 2 },
  { from: 'constantina_papa+peter_tomaras_sr', to: 'lula_bouskos',      busLevel: 2 },
  { from: 'constantina_papa+peter_tomaras_sr', to: 'mary_steel',        busLevel: 2 },
  { from: 'constantina_papa+peter_tomaras_sr', to: 'george_tomaras_jr', busLevel: 2 },

  /* Maria + Apostolos Anastasi -> their children */
  { from: 'maria_papa+apostolos_anastasi', to: 'nikos_anast',    busLevel: 2 },
  { from: 'maria_papa+apostolos_anastasi', to: 'kostas_anast',   busLevel: 2 },
  { from: 'maria_papa+apostolos_anastasi', to: 'yannoula_anast', busLevel: 2 },

  /* Tomaras grandchildren */
  { from: 'tom_tomaras+joanna_tomaras',     to: 'butch_tomaras',     busLevel: 2 },
  { from: 'lula_bouskos+bill_bouskos',      to: 'angel_buck',        busLevel: 2 },
  { from: 'lula_bouskos+bill_bouskos',      to: 'arthur_bouskos',    busLevel: 2 },
  { from: 'lula_bouskos+bill_bouskos',      to: 'dena_bouskos',      busLevel: 2 },
  { from: 'lula_bouskos+bill_bouskos',      to: 'peter_bouskos_old', busLevel: 2 },
  { from: 'mary_steel+george_steel',        to: 'connie_steel',      busLevel: 2 },
  { from: 'mary_steel+george_steel',        to: 'tia_jenson',        busLevel: 2 },
  { from: 'george_tomaras_jr+maria_cuclis', to: 'kathie_kar',        busLevel: 2 },
  { from: 'george_tomaras_jr+maria_cuclis', to: 'peter_tomaras_jr',  busLevel: 2 },

  /* Frosini + Gus -> their children */
  { from: 'frosini_gouz+gus_gouz', to: 'elena',    busLevel: 2 },
  { from: 'frosini_gouz+gus_gouz', to: 'thespina', busLevel: 2 },

  /* Haralambos + Sofia -> their children */
  { from: 'haralambos_gouz+sofia_gorgo', to: 'tom_h_gouz', busLevel: 2 },
  { from: 'haralambos_gouz+sofia_gorgo', to: 'georgia_h',  busLevel: 2 },
  { from: 'haralambos_gouz+sofia_gorgo', to: 'ageliki_h',  busLevel: 2 },
  { from: 'tom_h_gouz+georgia_kats',     to: 'dimitri_gouz', busLevel: 2 },
  { from: 'georgia_h',                   to: 'sofia_h',      busLevel: 2 },

  /* John Sr + Maria Demetrios -> additional Gouzounis siblings */
  { from: 'john_gouz_sr+maria_dem', to: 'kostas_gouz',  busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'maria_gouz',   busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'georgia_g',    busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'anna_gouz',    busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'john_gouz_jr', busLevel: 2 },
  { from: 'john_gouz_sr+maria_dem', to: 'vasilis_gouz', busLevel: 2 },

  /* Aspasia + Dimitrios Kyriakis -> 11 children */
  { from: 'aspasia_k+dimitrios_k', to: 'maria_courtis',    busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'barbara_salazar',  busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'nick_k',           busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'tony_k',           busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'panagiotakis_g',   busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'katina_sahnas',    busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'yannoula_velasco', busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'apostolos_k',      busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'nikita_k',         busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'dina_adamson',     busLevel: 2 },
  { from: 'aspasia_k+dimitrios_k', to: 'taki_k',           busLevel: 2 },

  /* Kyriakis grandchildren */
  { from: 'maria_courtis+george_courtis',       to: 'james_courtis',     busLevel: 2 },
  { from: 'maria_courtis+george_courtis',       to: 'michael_courtis',   busLevel: 2 },
  { from: 'maria_courtis+george_courtis',       to: 'athena_courtis',    busLevel: 2 },
  { from: 'barbara_salazar+rene_salazar',       to: 'rene_jr_salazar',   busLevel: 2 },
  { from: 'barbara_salazar+rene_salazar',       to: 'elias_salazar',     busLevel: 2 },
  { from: 'tony_k+patricia_joffroy',            to: 'dimitri_kyriakis',  busLevel: 2 },
  { from: 'katina_sahnas+stratis_sahnas',       to: 'thano_sahnas',      busLevel: 2 },
  { from: 'katina_sahnas+stratis_sahnas',       to: 'dimitri_sahnas',    busLevel: 2 },
  { from: 'katina_sahnas+stratis_sahnas',       to: 'strato_sahnas',     busLevel: 2 },
  { from: 'nikita_k+omalena_corella',           to: 'yanula_k',          busLevel: 2 },
  { from: 'nikita_k+omalena_corella',           to: 'aspasia_k_jr',      busLevel: 2 },
  { from: 'dina_adamson+john_adamson',          to: 'tisa_hawk',         busLevel: 2 },
  { from: 'dina_adamson+john_adamson',          to: 'larina_adamson',    busLevel: 2 },
  { from: 'dina_adamson+john_adamson',          to: 'leana_adamson',     busLevel: 2 },
  { from: 'dina_adamson+john_adamson', to: 'thano_adamson', busLevel: 2 },
  { from: 'tisa_hawk+john_hawk',                to: 'joanna_hawk',       busLevel: 2 },

  /* Demitrios cluster descents */
  { from: 'demitrios_g+maria_dg',               to: 'yannoula_riakos',   busLevel: 2 },
  { from: 'demitrios_g+maria_dg',               to: 'constantine_g',     busLevel: 2 },
  { from: 'demitrios_g+maria_dg',               to: 'maria_morris',      busLevel: 2 },
  { from: 'yannoula_riakos+riakos',             to: 'gregory_riakos',    busLevel: 2 },
  { from: 'yannoula_riakos+riakos',             to: 'spiro_riakos',      busLevel: 2 },
  { from: 'maria_morris+john_morris',           to: 'jennie_anderson',   busLevel: 2 },
  { from: 'maria_morris+john_morris',           to: 'angela_galanis',    busLevel: 2 },
  { from: 'jennie_anderson+michael_anderson',   to: 'elizabeth_anderson',busLevel: 2 },
  { from: 'jennie_anderson+michael_anderson',   to: 'andrew_anderson',   busLevel: 2 },
  { from: 'jennie_anderson+michael_anderson',   to: 'philip_anderson',   busLevel: 2 },
  { from: 'jennie_anderson+michael_anderson',   to: 'michael_baurch',    busLevel: 2 },
  { from: 'elizabeth_anderson+angelo_mountanos',to: 'michelle_mountanos',busLevel: 2 },
  { from: 'angela_galanis+george_galanis',      to: 'ann_robert',        busLevel: 2 },
  { from: 'angela_galanis+george_galanis',      to: 'helen_miller',      busLevel: 2 },
  { from: 'angela_galanis+george_galanis',      to: 'chris_galanis_son', busLevel: 2 },
  { from: 'angela_galanis+george_galanis',      to: 'nick_galanis_son',  busLevel: 2 },
  { from: 'ann_robert+edouard_robert',          to: 'steven_robert',     busLevel: 2 },
  { from: 'ann_robert+edouard_robert',          to: 'edouard_robert_jr', busLevel: 2 },
  { from: 'ann_robert+edouard_robert',          to: 'desiree_robert',    busLevel: 2 },
  { from: 'helen_miller',                       to: 'chris_miller',      busLevel: 2 },
  { from: 'helen_miller',                       to: 'sheree_miller',     busLevel: 2 },
  { from: 'nick_galanis_son+ageliki_galanis',   to: 'george_galanis_jr', busLevel: 2 },

  /* Vasiliki Kachoudas -> Georgia */
  { from: 'vasiliki_kach+thoumas_kach',         to: 'georgia_kach',      busLevel: 2 },

  /* (Giannis) JC Georgouses cluster descents */
  { from: 'giannis_jc+efthemia_santos',         to: 'katherine_beys',    busLevel: 2 },
  { from: 'giannis_jc+efthemia_santos',         to: 'gus_gjc',           busLevel: 2 },
  { from: 'giannis_jc+efthemia_santos',         to: 'sylvia_dem',        busLevel: 2 },
  { from: 'giannis_jc+efthemia_santos',         to: 'florence_barnett',  busLevel: 2 },
  { from: 'katherine_beys+andrew_beys',         to: 'helen_catsinas',    busLevel: 2 },
  { from: 'katherine_beys+andrew_beys',         to: 'thalia_beys',       busLevel: 2 },
  { from: 'helen_catsinas+gregory_catsinas',    to: 'kathy_cats',        busLevel: 2 },
  { from: 'helen_catsinas+gregory_catsinas',    to: 'elizabeth_cats',    busLevel: 2 },
  { from: 'helen_catsinas+gregory_catsinas',    to: 'gregory_cats_jr',   busLevel: 2 },
  { from: 'sylvia_dem+james_dem',               to: 'sofia_osborne',     busLevel: 2 },
  { from: 'sylvia_dem+james_dem',               to: 'temia_dem',         busLevel: 2 },
  { from: 'sofia_osborne+larry_osborne',        to: 'sharon_osb',        busLevel: 2 },
  { from: 'sofia_osborne+larry_osborne',        to: 'valerie_osb',       busLevel: 2 },
  { from: 'sofia_osborne+larry_osborne',        to: 'margaret_osb',      busLevel: 2 },
  { from: 'florence_barnett',                   to: 'arthur_nastos',     busLevel: 2 },
  { from: 'florence_barnett',                   to: 'gayle_hanson',      busLevel: 2 },
  { from: 'florence_barnett',                   to: 'pamela_potts',      busLevel: 2 },
  { from: 'pamela_potts+ron_potts',             to: 'ryan_potts',        busLevel: 2 },

  /* Avgares clan descents */
  { from: 'evangelos_avg+katerine_avg', to: 'jim_avg',     busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'kostas_avg',  busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'tom_avg',     busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'andrew_avg',  busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'george_avg',  busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'basilis_avg', busLevel: 2 },
  { from: 'evangelos_avg+katerine_avg', to: 'asimo_let',   busLevel: 2 },
  { from: 'jim_avg', to: 'yannoula_char',   busLevel: 2 },
  { from: 'jim_avg', to: 'katerine_angelo', busLevel: 2 },
  { from: 'jim_avg', to: 'regina_avg',      busLevel: 2 },
  { from: 'kostas_avg+asimo_katchoudas', to: 'efthemia_lep', busLevel: 2 },
  { from: 'george_avg+maria_palam', to: 'vasiliki_palam', busLevel: 2 },
  { from: 'george_avg+maria_palam', to: 'katina_zog',     busLevel: 2 },
  { from: 'asimo_let+nick_let',     to: 'costadino_avg',  busLevel: 2 },
  { from: 'katerine_angelo+pano_angelo', to: 'aspasia_angelo', busLevel: 2 },
  { from: 'katerine_angelo+pano_angelo', to: 'demetra_angelo', busLevel: 2 },
  { from: 'katerine_angelo+pano_angelo', to: 'john_angelo',    busLevel: 2 },
  { from: 'efthemia_lep+louis_lep', to: 'geogia_kanboris', busLevel: 2 },
  { from: 'katina_zog+dimitre_zog', to: 'soula_avg',       busLevel: 2 },
  { from: 'geogia_kanboris+gus_kanboris', to: 'argerie_kanboris',  busLevel: 2 },
  { from: 'geogia_kanboris+gus_kanboris', to: 'efthemia_kanboris', busLevel: 2 },
  { from: 'geogia_kanboris+gus_kanboris', to: 'demetra_kanboris',  busLevel: 2 },

  /* Panayioti family descents */
  { from: 'panayioti_g+maria_papa_g', to: 'gus_g_panay',  busLevel: 2 },
  { from: 'panayioti_g+maria_papa_g', to: 'milton_g',     busLevel: 2 },
  { from: 'panayioti_g+maria_papa_g', to: 'nick_g_panay', busLevel: 2 },
  { from: 'nick_g_panay+fotoula',     to: 'john_g_panay', busLevel: 2 },

  /* Nikolaou lineage descents */
  { from: 'nikolaou_g+panayota_pet', to: 'chris_g_nik', busLevel: 2 },
  { from: 'nikolaou_g+panayota_pet', to: 'pete_g_nik',  busLevel: 2 },
  { from: 'nikolaou_g+panayota_pet', to: 'tom_g_nik',   busLevel: 2 },
  { from: 'chris_g_nik+irene_g',     to: 'maggie_greenberg',  busLevel: 2 },
  { from: 'pete_g_nik+venus_g',      to: 'christine_tourney', busLevel: 2 },
  { from: 'maggie_greenberg+jack_greenberg',   to: 'lorraine_g',  busLevel: 2 },
  { from: 'maggie_greenberg+jack_greenberg',   to: 'joanne_g',    busLevel: 2 },
  { from: 'christine_tourney+robert_tourney',  to: 'becky_t',     busLevel: 2 },
  { from: 'christine_tourney+robert_tourney',  to: 'nicolette_t', busLevel: 2 },

  /* James Demetri Georgouses + Bouskos descents */
  { from: 'demetri_james_g+matina_vrahos', to: 'frances_bouskos',  busLevel: 2 },
  { from: 'frances_bouskos+michael_b_d',   to: 'ann_andros',       busLevel: 2 },
  { from: 'frances_bouskos+michael_b_d',   to: 'ernest_bouskos',   busLevel: 2 },
  { from: 'frances_bouskos+michael_b_d',   to: 'james_bouskos_old',busLevel: 2 },
  { from: 'ann_andros+george_andros',      to: 'lisa_andros',      busLevel: 2 },
  { from: 'ann_andros+george_andros',      to: 'danny_andros',     busLevel: 2 },
  { from: 'ernest_bouskos+andriana_arvanites', to: 'michael_b_son',busLevel: 2 },
  { from: 'ernest_bouskos+andriana_arvanites', to: 'james_b_jr',   busLevel: 2 },

  /* Athanasios Tom Georgouses + Angelo Pappas descents */
  { from: 'athanasios_tom_g+angelo_pappas', to: 'john_g_at',      busLevel: 2 },
  { from: 'john_g_at',                      to: 'linda_gularte',  busLevel: 2 },
  { from: 'john_g_at+betty_at',             to: 'tom_g_at',       busLevel: 2 },
  { from: 'john_g_at+betty_at',             to: 'toni_g_swanson', busLevel: 2 },
  { from: 'linda_gularte+mike_gularte',     to: 'gabe_gularte',   busLevel: 2 },
  { from: 'toni_g_swanson+swanson_husb',    to: 'stephanie_swanson', busLevel: 2 },
  { from: 'toni_g_swanson+swanson_husb',    to: 'stacy_swanson',     busLevel: 2 },
  { from: 'toni_g_swanson+swanson_husb',    to: 'michael_swanson',   busLevel: 2 },

  /* Jim Georgouses + Tula Polizois descents */
  { from: 'georgia_polizois+alex_polizois', to: 'tula_polizois', busLevel: 2 },
  { from: 'jim_g_jim+tula_polizois',        to: 'alex_g_jim',    busLevel: 2 },
  { from: 'jim_g_jim+tula_polizois',        to: 'yotetsa_vf',    busLevel: 2 },
  { from: 'yotetsa_vf+rick_vf',             to: 'alexis_vf',     busLevel: 2 },

  /* Pass 6: Gayle Hanson -> Nillaby (single-parent attribution; Bill noted on cards but no marriage bracket) */
  { from: 'gayle_hanson', to: 'nillaby_hanson', busLevel: 2 },
  /* Pass 6: Nick + Ageliki Galanis's 3 daughters */
  { from: 'nick_galanis_son+ageliki_galanis', to: 'ge_galanis',        busLevel: 2 },
  { from: 'nick_galanis_son+ageliki_galanis', to: 'maria_galanis',     busLevel: 2 },
  { from: 'nick_galanis_son+ageliki_galanis', to: 'christine_galanis', busLevel: 2 },
];

/* =========================================================================
   RENDERING
   ========================================================================= */

const crossClusterLinks = [
  /* Constantine Georgouses (son of Demitrios + Maria Georgouses) married Aspasia Gouzounis (Yannoula's sister).
     The marriage isn't rendered visually because the cards are ~6500px apart on the canvas — drawing the
     bracket would obscure half the tree. The relationship still exists for connection-finding. */
  ['constantine_g', 'aspasia_gouz'],
];

/* ----------- Skedros family core: who counts as "the family" ----------- */
/* Seeded with Greg Skedros, his wife Jenny Pappas, the Pappathanacio matriarch, and the Gouzounis
   patriarch. The core is then expanded to everyone reachable via marriages + descents + crossClusterLinks. */

const CORE_SEEDS = ['greg_s', 'jenny_p', 'yannoula_p', 'athanasios_p', 'john_gouz_sr', 'maria_dem', 'james_k', 'angeline_l', 'constantine_s', 'evgenia'];

/* ----------- Family branch clusters used for the "Filter by family" tabs -----------
   Each cluster is identified by a seed person id. The cluster is then expanded by
   BFS over marriages + descents (without crossClusterLinks) to capture everyone
   in that connected branch of the tree. Add or rename entries here to change the
   tabs that appear in the navigation. */
const CLUSTER_DEFS = [
  { id: 'skedros',          label: 'Skedros family',            seed: 'greg_s'           },
  { id: 'demitrios_g',      label: 'Demitrios Georgouses',      seed: 'demitrios_g'      },
  { id: 'jc_georgouses',    label: 'John C. Georgouses',        seed: 'giannis_jc'       },
  { id: 'avgares',          label: 'Avgares clan',              seed: 'evangelos_avg'    },
  { id: 'kyriakis',         label: 'Kyriakis',                  seed: 'aspasia_k'        },
  { id: 'panayioti_g',      label: 'Panayioti Georgouses',      seed: 'panayioti_g'      },
  { id: 'nikolaou_g',       label: 'Nikolaou Georgouses',       seed: 'chris_g_nik'      },
  { id: 'demetri_james_g',  label: 'Demetri James Georgouses',  seed: 'demetri_james_g'  },
  { id: 'athanasios_tom_g', label: 'Athanasios Tom Georgouses', seed: 'athanasios_tom_g' },
  { id: 'polizois_jim_g',   label: 'Polizois / Jim Georgouses', seed: 'jim_g_jim'        },
];

const BRANCH_LABELS = [
  {
    "y": 60,
    "x": 660,
    "label": "Skedros"
  },
  {
    "y": 60,
    "x": 1980,
    "label": "Vouganis"
  },
  {
    "y": 60,
    "x": 3225,
    "label": "Demetriades"
  },
  {
    "y": 60,
    "x": 5370,
    "label": "Rizos"
  },
  {
    "y": 1155,
    "x": 1785,
    "label": "Limberiou"
  },
  {
    "y": 1665,
    "x": 3900,
    "label": "Pappas"
  },
  {
    "y": 1170,
    "x": 3810,
    "label": "Pappathanacio"
  },
  {
    "y": 900,
    "x": 5415,
    "label": "Gouzounis"
  },
  {
    "y": 1170,
    "x": 7005,
    "label": "Gouzounis line"
  },
  {
    "y": 1665,
    "x": 6135,
    "label": "Tomaras"
  },
  {
    "y": 1170,
    "x": 12045,
    "label": "Kyriakis"
  },
  {
    "y": 675,
    "x": 16200,
    "label": "Demitrios Georgouses line"
  },
  {
    "y": 675,
    "x": 20250,
    "label": "John C. Georgouses line"
  },
  {
    "y": 1665,
    "x": 16620,
    "label": "Anderson"
  },
  {
    "y": 1665,
    "x": 17190,
    "label": "Galanis"
  },
  {
    "y": 675,
    "x": 24615,
    "label": "Avgares clan"
  },
  {
    "y": 2950,
    "x": 1200,
    "label": "Panayioti Georgouses"
  },
  {
    "y": 2950,
    "x": 3570,
    "label": "Nikolaou Nick Georgouses"
  },
  {
    "y": 2950,
    "x": 6735,
    "label": "Demetri James Georgouses + Bouskos"
  },
  {
    "y": 2950,
    "x": 9585,
    "label": "Athanasios Tom Georgouses"
  },
  {
    "y": 2950,
    "x": 12135,
    "label": "Polizois + Jim Georgouses"
  }
];
