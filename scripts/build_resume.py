"""Render the résumé HTML from content.json and activate its PDF links.

Legacy filename retained; this script never creates or overwrites a PDF.
Run after updating resume/resume.pdf.
"""
from pathlib import Path
from html import escape
import json
import re

ROOT = Path(__file__).resolve().parents[1]
URL = '/resume/resume.pdf'
pdf = ROOT / URL.lstrip('/')
available = pdf.is_file() and pdf.read_bytes().startswith(b'%PDF-')
data = json.loads((ROOT / 'resume/content.json').read_text())

def paragraph(value):
    return f'<p>{escape(value)}</p>'

def entry(item):
    heading = item.get('organization', item['title'])
    parts = ['<article class="resume-item"><div class="resume-item-heading">',
             f'<h4>{escape(heading)}</h4>']
    if item.get('dates'):
        parts.append(f'<span>{escape(item["dates"])}</span>')
    parts.append('</div>')
    if heading != item['title']:
        parts.append(f'<p><strong>{escape(item["title"])}</strong></p>')
    for key in ('note', 'details', 'tech', 'description'):
        if item.get(key):
            parts.append(paragraph(item[key]))
    if item.get('bullets'):
        parts.append('<ul>' + ''.join(f'<li>{escape(b)}</li>' for b in item['bullets']) + '</ul>')
    if item.get('url'):
        parts.append(f'<p><a href="{escape(item["url"], quote=True)}">View live project ↗</a></p>')
    parts.append('</article>')
    return '\n'.join(parts)

content = [f'<h2 class="resume-name">{escape(data["name"])}</h2>',
           f'<p class="muted">{escape(data["summary"])}</p>',
           paragraph(data['location']), '<div class="resume-contact">']
for label, url in [(data['email'], 'mailto:' + data['email']), ('GitHub', data['github']), ('LinkedIn', data['linkedin']), ('Twitter', data['twitter'])]:
    content.append(f'<a href="{escape(url, quote=True)}">{escape(label)}</a>')
content.append('</div>')
research = data.get('research', []) + [e for e in data['experience'] if e['title'] == 'Graduate Research Assistant']
industry = [e for e in data['experience'] if e['title'] != 'Graduate Research Assistant']
professional = [p for p in data['projects'] if p.get('category') == 'Professional work'] + data.get('professional_work', [])
projects = [p for p in data['projects'] if p.get('category') != 'Professional work']
for title, items in [('Education', data['education']), ('Research experience', research),
                     ('Industry and teaching experience', industry), ('Selected professional work', professional),
                     ('Selected projects', projects)]:
    content.append(f'<section class="resume-section"><h3>{title}</h3>')
    content.extend(entry(item) for item in items)
    content.append('</section>')
content.append('<section class="resume-section resume-skills"><h3>Technical skills</h3>')
content.extend(f'<p><strong>{escape(k)}:</strong> {escape(v)}</p>' for k, v in data['skills'].items())
content.append('</section>')

for page in ROOT.rglob('*.html'):
    text = page.read_text()
    def update_link(match):
        tag = re.sub(r'\s+(target|rel)="[^"]*"', '', match.group())
        tag = re.sub(r'href="[^"]*"', f'href="{URL if available else "/resume/"}"', tag)
        return tag[:-1] + (' target="_blank" rel="noopener">' if available else '>')
    text = re.sub(r'<a\b[^>]*\bdata-resume-link\b[^>]*>', update_link, text)
    if page == ROOT / 'resume/index.html':
        start, end = '<!-- RESUME CONTENT START -->', '<!-- RESUME CONTENT END -->'
        before, after_start = text.split(start, 1)
        _, after = after_start.split(end, 1)
        text = before + start + '\n' + '\n'.join(content) + '\n' + end + after
        message = 'My résumé, ready to read or download.' if available else 'My final résumé PDF will be available here soon. In the meantime, explore my work and background below.'
        text = re.sub(r'(<p id="resume-status" role="status">).*?(</p>)', lambda m:m[1]+message+m[2], text)
        actions = f'<div class="resume-actions" id="resume-downloads"><a class="button button-solid" href="{URL}" target="_blank" rel="noopener">Open résumé ↗</a><a class="button" href="{URL}" download>Download résumé ↓</a></div>' if available else '<div class="resume-actions" id="resume-downloads" hidden></div>'
        text = re.sub(r'<div class="resume-actions" id="resume-downloads"[^>]*>.*?</div>', actions, text)
        text = re.sub(r'<noscript>.*?</noscript>', '', text)
    if text != page.read_text(): page.write_text(text)
print('Final résumé links activated.' if available else 'Final PDF absent or invalid; résumé links use the background page.')
