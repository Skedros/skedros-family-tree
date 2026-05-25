# The Skedros Family Tree

A static website telling the story of the Skedros, Pappathanacio, Gouzounis,
Demetriades, Rizos, Tomaras, Kyriakis, Georgouses, and Avgares families — built
from family records, the 1974 Helen Skedros Rizos interview (Greek Archives,
University of Utah), and ongoing contributions from relatives.

## What's here

```
/
├── index.html          The interactive family tree (335 people, all clusters)
├── profile.html        Per-person profile page (loads from ?id=PERSON_ID)
├── submit.html         A form for relatives to send stories, photos, corrections
├── thanks.html         The "thank you" page shown after submitting
│
├── data/               (reserved for future use - e.g. a JSON copy)
├── js/
│   ├── data.js         Every person, marriage, descent, and section header
│   ├── family.js       Graph + relations + path-finding logic (shared)
│   ├── tree.js         Tree rendering and pan/zoom
│   └── profile.js      Profile-page rendering
├── css/
│   ├── shared.css      Palette, typography, banner with navigation
│   ├── tree.css        Tree canvas, person cards, descent/marriage lines
│   ├── profile.css     Profile layout, gallery, biography, family grid
│   └── submit.css      Form styling
├── photos/             Drop family photos here (see "Adding photos" below)
│
├── .nojekyll           Tells GitHub Pages not to preprocess the files
└── README.md           This file
```

Every page loads `data.js` first, so the family data lives in exactly one place.
Editing that one file updates the tree, every profile page, and every
relationship link across the site.

---

## Setting up on GitHub Pages

1. Create a new repository on GitHub (e.g. `skedros-family-tree`).
2. Drop the contents of this folder into the repo and push.
3. In the repo settings → Pages → Source, choose "Deploy from a branch" and
   pick the `main` branch (root `/`).
4. Wait a minute. The site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

That's the entire deploy.

---

## Wiring up the submission form

The form in `submit.html` posts to **FormSubmit.co**, which is a free service
that emails each submission (with file attachments) to a single inbox. It
needs no account — just configuration.

1. Open `submit.html`.
2. Find this line:
   ```html
   action="https://formsubmit.co/REPLACE_WITH_YOUR_EMAIL"
   ```
3. Replace `REPLACE_WITH_YOUR_EMAIL` with the email address that should
   receive submissions. For example:
   ```html
   action="https://formsubmit.co/athan@example.com"
   ```
4. Push the change to GitHub.
5. The first time someone submits the form, FormSubmit will send a one-time
   confirmation email to that address. Click the link inside it. From then on,
   every submission (with attached photos) lands in your inbox.

That's all. No backend, no server, no monthly fees.

> If you'd rather use a different service (Formspree, Web3Forms, Basin,
> EmailJS), just change the form's `action` attribute. The form fields use
> standard HTML names, so any decent form-handling service will work.

---

## Adding or updating people

All family data lives in **`js/data.js`**. To add or change a person:

### Add a new person

Find the `people` array and append a new entry:

```js
{
  id: 'someones_unique_id',         // lowercase, snake_case, no spaces
  name: 'Their Display Name',
  alt: 'née Maiden, or Greek name', // optional
  dates: '1900 - 1980',             // optional
  note: 'one-line context',         // optional, shows on the card
  x: 5000,                          // px position on the tree canvas
  y: GY.III,                        // GY.I through GY.VI for the six generations
  bio: `The full biography here.

Paragraphs are separated by blank lines.

Use backticks (template literals), not regular quotes, so the multi-line
content works.`,
  photos: ['portrait.jpg', 'wedding.jpg']  // optional - see "Adding photos"
}
```

Required fields: `id`, `name`, `x`, `y`. Everything else is optional.

For placeholder entries where the name isn't recorded, set `unknown: true`
to get the dashed striped card style. For someone who died young, set
`deceasedYoung: true` to get the † dagger after the name.

### Add a marriage

Add a pair to the `marriages` array:

```js
['husband_id', 'wife_id'],
```

The site automatically renders the marriage bracket between the two cards.

### Add a parent → child relationship

Add an object to the `descent` array:

```js
{ from: 'parent_a_id+parent_b_id', to: 'child_id', busLevel: 1 },
```

The `from` field is two parent ids joined with `+`. The `busLevel` (1, 2,
or 3) controls how far the bus line drops below the parents before going
horizontal — adjust if the descent line collides with other cards.

### Add a section header on the tree

Section headers like "Skedros", "Pappathanacio", "Avgares clan" live in the
`BRANCH_LABELS` array at the bottom of `data.js`:

```js
{ "x": 5000, "y": 450, "label": "Section Name" }
```

The headers automatically get a soft halo so descent lines never bisect the
text.

---

## Adding photos

1. Drop the image files into the `photos/` folder. Any format browsers support
   (jpg, png, webp, heic) works.
2. Reference them in that person's entry in `data.js`:
   ```js
   photos: ['helen_portrait.jpg', 'helen_wedding_1914.jpg', 'helen_red_cross.jpg']
   ```
3. On the tree, the first photo becomes the detail-panel thumbnail.
4. On the profile page, the first photo becomes the hero image, and **if there
   are two or more photos**, the gallery section appears below the hero with
   prev/next buttons and a thumbnail strip.

Use lowercase filenames with underscores and no spaces — easier on web servers
and across operating systems.

---

## Working on the site locally

You can open `index.html` directly in a browser and the site will load — all
the scripts use plain `<script src>` tags, no CORS-blocked fetch calls.

If you want a proper local web server (recommended for testing photos), run:

```sh
python3 -m http.server 8000
```

from this folder, then open <http://localhost:8000/> in your browser.

---

## How the "Connection to the Skedros Family" feature works

Every person in the tree gets analyzed against the **Skedros family core** —
which is defined as everyone reachable from the seed family by marriage or
birth. The seeds are configured in `data.js` as `CORE_SEEDS`:

```js
const CORE_SEEDS = ['greg_s', 'jenny_p', 'yannoula_p', 'athanasios_p',
                    'john_gouz_sr', 'maria_dem', 'james_k', 'angeline_l',
                    'constantine_s', 'evgenia'];
```

When you click a person — on the tree, or anywhere on a profile page —
the site walks the family graph from that person back to the nearest core
member and displays the chain of relationships in plain English. Core
members get a warm gold border in the tree.

There's also a `crossClusterLinks` array for marriages whose endpoints are
visually too far apart to render as a bracket. The Constantine Georgouses +
Aspasia Gouzounis link is currently the only entry — it ties the entire
Demitrios Georgouses cluster to the Skedros core without drawing a six-
thousand-pixel marriage line across the canvas.

---

## Contact

Submissions and questions go to the email configured in `submit.html`.
