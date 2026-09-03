# KnowledgeoPedia

Your blog, now with a real admin panel for writing and publishing posts —
built with **Eleventy** (turns your content into pages) and **Decap CMS**
(the `/admin` writing panel).

---

## What changed from before

- Blog posts are no longer hand-written HTML. Each post is a markdown file in
  `src/posts/`, with a small block of info (title, category, image, etc.) at
  the top called "frontmatter."
- Your header, footer, and page layout live once in `src/_includes/base.njk`
  and get reused everywhere — you don't edit `index.html`, `categories.html`,
  etc. by hand anymore.
- Category pages (`/categories/tech/`, `/categories/finance/`, ...) are
  generated automatically from whatever posts exist — you never create these
  by hand.
- Publishing a post = writing it in `/admin`, clicking Publish, and Netlify
  rebuilds the site automatically. No more downloading files and dragging
  them into a folder.

---

## 1. Run it locally (see it on your computer first)

Open a terminal in this folder and run:

```bash
npm install
npm run start
```

This opens a local preview (usually `http://localhost:8080`) so you can see
the site exactly as it'll look live. Press `Ctrl+C` to stop it.

To just build the final files (without a live preview) run:

```bash
npm run build
```

Output goes into a `_site` folder — that's the finished website.

---

## 2. Push this to GitHub

Replace the contents of your existing `MyBlogSite` GitHub repo with these
files, then:

```bash
git add .
git commit -m "Migrate to Eleventy + Decap CMS"
git push
```

---

## 3. Connect the repo to Netlify (free)

1. Go to [netlify.com](https://www.netlify.com) and sign up / log in (you can
   use your GitHub account to sign in — one click).
2. Click **"Add new site" → "Import an existing project"** and pick your
   `MyBlogSite` repo.
3. Netlify will auto-detect the build settings from `netlify.toml`
   (`npm run build`, publish folder `_site`) — just click **Deploy**.
4. In a minute or two, your site will be live at a `*.netlify.app` address.

---

## 4. Turn on the admin panel (Identity + Git Gateway)

This is what lets you log in at `/admin` and publish posts.

1. In your Netlify site dashboard, go to **Site configuration → Identity**
   and click **Enable Identity**.
2. Under Identity settings, set **Registration** to **Invite only** (so
   random people can't sign up).
3. Go to **Identity → Services → Git Gateway** and click **Enable Git
   Gateway**. This lets the admin panel commit posts to your GitHub repo on
   your behalf.
4. Back on the main Identity tab, click **Invite users**, enter your own
   email, and accept the invite email that arrives — it'll ask you to set a
   password.
5. Open `admin/config.yml` and replace `your-site-name` in the two `_url`
   lines near the top with your actual Netlify site address, then commit and
   push that change.

---

## 5. Start writing

Go to `https://your-site-name.netlify.app/admin`, log in, and you'll see:

- **Blog Posts** — title, date, category, author, cover image, an optional
  video embed URL, an excerpt, and a full markdown editor with drag-and-drop
  image uploads.
- **Author Profiles** — edit the name/bio/photo shown on each post.

Every save creates a draft; clicking **Publish** commits it to GitHub and
Netlify rebuilds the live site automatically (about 30-60 seconds).

---

## Project structure

```
src/
  _data/
    categories.json   -> the 9 category definitions (name, color, icon)
    authors.json       -> author profiles (editable via /admin too)
    currentYear.js      -> auto-updates the footer copyright year
  _includes/
    base.njk           -> shared header/nav/footer for every page
    post.njk            -> layout for a single blog post
  posts/
    *.md                -> every blog post (sample content included)
  assets/
    css/style.css       -> all site styling
    img/uploads/         -> where images uploaded via /admin get saved
  index.njk             -> homepage
  categories.njk         -> "all categories" page
  category-page.njk       -> template that auto-generates one page per category
admin/
  index.html            -> loads the Decap CMS admin app
  config.yml             -> defines what fields the admin panel shows
eleventy.config.js       -> Eleventy setup (collections, filters, etc.)
netlify.toml             -> tells Netlify how to build the site
```

## Adding more categories later

Add an entry to `src/_data/categories.json` (slug, name, color, bg, icon SVG
path) and it'll automatically show up in the nav dropdown, the categories
page, and become selectable in the admin panel once you also add it to the
`category` field options in `admin/config.yml`.
