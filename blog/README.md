# Add a real journal entry

`/blog/` is a standalone journal index. It currently has no posts and does not
redirect. New entries are ordinary HTML; no CMS, npm, or generator is needed.

1. Create `blog/your-post-slug/index.html` using the head, shared navigation,
   theme scripts, stylesheet, and footer from `blog/index.html`.
2. Set a unique title, description, canonical URL and `og:url` for the new page.
   Keep Life marked `aria-current="page"` in the navigation.
3. Use one `<main id="content" tabindex="-1">`, one `<h1>`, the real publication
   date in `<time datetime="YYYY-MM-DD">`, and an `<article class="post-body">`.
4. Write the real entry. Add actual photos from `/assets/life/` using `<figure>`,
   descriptive image alternatives, accurate dimensions, and `<figcaption>`.
5. Remove the journal index's `.journal-empty` block and “Nothing published yet”
   label when the first real entry is ready. Add an entry using this structure,
   replacing every placeholder before publishing:

```html
<article class="journal-entry">
  <time datetime="YYYY-MM-DD">Actual publication date</time>
  <div>
    <h3><a href="/blog/your-post-slug/">Your real post title</a></h3>
    <p>An accurate one-sentence introduction to the entry.</p>
  </div>
</article>
```

Use `python3 scripts/check_site.py` from the repository root to check the new page
and its links, then preview the index and entry on a phone and desktop.
