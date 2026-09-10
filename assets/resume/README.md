# Final résumé

Place your actual final PDF at `assets/resume/Satya_Maddipati_Resume.pdf`.
Do not copy either dummy PDF here. No final file is currently supplied.

Run `python3 scripts/build_resume.py` after adding (or removing) the file to
update static links for visitors without JavaScript. This legacy-named script
only updates links; it never generates, replaces, or edits a PDF.

With JavaScript, the site also checks the final URL and its PDF signature before
showing open/download links. Missing files, HTML error pages, and network errors
leave the readable `/resume/` background page available.

The old `resume/satya-maddipati-resume.pdf` is a pre-existing generated draft,
unlinked and not treated as the final résumé. It remains in the checkout; remove
or archive it outside the published tree before any future publication if you
want its old direct URL to disappear.
