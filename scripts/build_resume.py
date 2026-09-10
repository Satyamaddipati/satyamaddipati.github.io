"""Activate a supplied final résumé for visitors without JavaScript.

Legacy filename retained; this script never creates or overwrites a PDF.
Run after adding assets/resume/Satya_Maddipati_Resume.pdf.
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
URL = '/assets/resume/Satya_Maddipati_Resume.pdf'
pdf = ROOT / URL.lstrip('/')
available = pdf.is_file() and pdf.read_bytes().startswith(b'%PDF-')
for page in ROOT.rglob('*.html'):
    text = page.read_text()
    def update_link(match):
        tag = re.sub(r'\s+(target|rel)="[^"]*"', '', match.group())
        tag = re.sub(r'href="[^"]*"', f'href="{URL if available else "/resume/"}"', tag)
        return tag[:-1] + (' target="_blank" rel="noopener">' if available else '>')
    text = re.sub(r'<a\b[^>]*\bdata-resume-link\b[^>]*>', update_link, text)
    if page == ROOT / 'resume/index.html':
        message = 'My résumé, ready to read or download.' if available else 'My final résumé PDF will be available here soon. In the meantime, explore my work and background below.'
        text = re.sub(r'(<p id="resume-status" role="status">).*?(</p>)', lambda m:m[1]+message+m[2], text)
        actions = f'<div class="resume-actions" id="resume-downloads"><a class="button button-solid" href="{URL}" target="_blank" rel="noopener">Open résumé ↗</a><a class="button" href="{URL}" download>Download résumé ↓</a></div>' if available else '<div class="resume-actions" id="resume-downloads" hidden></div>'
        text = re.sub(r'<div class="resume-actions" id="resume-downloads"[^>]*>.*?</div>', actions, text)
        text = re.sub(r'<noscript>.*?</noscript>', '' if available else '<noscript><p class="small muted">PDF availability checking needs JavaScript. You can still read my background below.</p></noscript>', text)
    if text != page.read_text(): page.write_text(text)
print('Final résumé links activated.' if available else 'Final PDF absent or invalid; résumé links use the background page.')
