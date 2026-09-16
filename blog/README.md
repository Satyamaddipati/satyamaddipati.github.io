# Publish a real notebook entry

The index at `/blog/` currently has no published posts. Homepage Exploring
entries are ideas, not articles, and deliberately have no dates or links.

1. Create `blog/your-post-slug/index.html` using the shared head, navigation,
   stylesheet, script, and footer from the blog index.
2. Set a unique title, description, canonical URL, and Open Graph URL. Mark Notes
   as `aria-current="page"`.
3. Use one `main id="content" tabindex="-1"`, one h1, and an article with class
   `post-body`. Add the actual publication date using a time element.
4. Replace the index empty state with a real entry. Link it from the homepage
   Notes list and replace Exploring with its actual date only when published.
5. Run `python3 scripts/check_site.py` and preview on mobile and desktop.

Index entry pattern (replace all example content before publishing):

```html
<article class="journal-entry">
  <time datetime="YYYY-MM-DD">Actual date</time>
  <div>
    <h2><a href="/blog/your-post-slug/">Real title</a></h2>
    <p>An accurate one-sentence introduction.</p>
  </div>
</article>
```
