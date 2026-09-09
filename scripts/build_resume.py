"""Regenerate the static résumé page and PDF. Requires reportlab, no site build step.
Run from any directory: python3 scripts/build_resume.py
The shared facts live in resume/content.json; page chrome lives in resume/index.html.
"""
import json
import re
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / 'resume/content.json').read_text())
e = escape

# The marked region alone is generated; navigation and page design remain editable.
html = [f'<h2 class="resume-name">{e(data["name"])}</h2>',
        f'<p class="muted">{e(data["summary"])}</p>',
        '<div class="resume-contact">' + ''.join(f'<a href="{e(url)}">{e(label)}</a>' for label, url in [
            (data['email'], 'mailto:' + data['email']), ('GitHub', data['github']), ('LinkedIn', data['linkedin'])]) + '</div>']
for section, title in [('education', 'Education'), ('experience', 'Experience'), ('projects', 'Selected projects')]:
    html.append(f'<section class="resume-section"><h3>{title}</h3>')
    for item in data[section]:
        heading = item.get('organization', item['title'])
        date = f'<span>{e(item["dates"])}</span>' if 'dates' in item else ''
        html.append(f'<article class="resume-item"><div class="resume-item-heading"><h4>{e(heading)}</h4>{date}</div>')
        if section != 'projects': html.append(f'<p><strong>{e(item["title"])}</strong></p>')
        for key in ['note', 'details', 'tech', 'description']:
            if key in item: html.append(f'<p>{e(item[key])}</p>')
        if 'bullets' in item: html.append('<ul>' + ''.join(f'<li>{e(b)}</li>' for b in item['bullets']) + '</ul>')
        if 'url' in item: html.append(f'<p><a href="{e(item["url"])}">View live project ↗</a></p>')
        html.append('</article>')
    html.append('</section>')
html.append('<section class="resume-section resume-skills"><h3>Technical skills</h3>')
html.extend(f'<p><strong>{e(k)}:</strong> {e(v)}</p>' for k, v in data['skills'].items())
html.append('</section>')
page_path = ROOT / 'resume/index.html'
page = page_path.read_text()
page, count = re.subn(r'<!-- RESUME CONTENT START -->.*?<!-- RESUME CONTENT END -->',
    '<!-- RESUME CONTENT START -->\n' + '\n'.join(html) + '\n<!-- RESUME CONTENT END -->', page, flags=re.S)
if count != 1: raise RuntimeError('Expected one résumé content marker pair')
page_path.write_text(page)

# One-column, selectable text with live links. No decorative charts or skill ratings.
accent = colors.HexColor('#31584b')
ink = colors.HexColor('#272e29')
muted = colors.HexColor('#515b53')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=22, leading=25, textColor=ink, spaceAfter=4),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8.5, leading=11, textColor=accent, spaceAfter=5),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=accent, spaceBefore=9, spaceAfter=5, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=13, textColor=ink),
    'meta': ParagraphStyle('meta', fontName='Helvetica', fontSize=9, leading=11, textColor=muted),
    'heading': ParagraphStyle('heading', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=ink),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=10, leading=13, textColor=ink, leftIndent=8, firstLineIndent=-8, spaceBefore=2),
}
def p(text, style='body'): return Paragraph(text, styles[style])
def row(left, right):
    table = Table([[p(left, 'heading'), p(right, 'meta')]], colWidths=[368, 152])
    table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0),(-1,-1),0), ('RIGHTPADDING',(0,0),(-1,-1),0), ('TOPPADDING',(0,0),(-1,-1),0), ('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    return table
story = [p(e(data['name']), 'name')]
contacts = [('mailto:' + data['email'], data['email']), (data['github'], 'GitHub'), (data['linkedin'], 'LinkedIn'), (data['website'], 'Portfolio')]
story.append(p(' &nbsp; | &nbsp; '.join(f'<link href="{e(url)}">{e(label)}</link>' for url,label in contacts), 'contact'))
story.append(p(e(data['summary'])))
for section,title in [('education','EDUCATION'), ('experience','EXPERIENCE'), ('projects','SELECTED PROJECTS')]:
    story.append(p(title, 'section'))
    for item in data[section]:
        group=[]
        if section=='projects':
            title_text = e(item['title'])
            if item.get('url'): title_text = f'<link href="{e(item["url"])}">{title_text}</link>'
            group.append(p(title_text + ' <font name="Helvetica" size="8.2"> | ' + e(item['tech']) + '</font>', 'heading'))
            group.append(p(e(item['description'])))
        else:
            group.append(row(e(item['organization']) + ' | ' + e(item['title']), e(item['dates'])))
            if item.get('note'): group.append(p(e(item['note']), 'meta'))
            if item.get('details'): group.append(p(e(item['details'])))
            group.extend(p('- ' + e(b), 'bullet') for b in item.get('bullets', []))
        group.append(Spacer(1, 5))
        story.append(KeepTogether(group))
story.append(p('TECHNICAL SKILLS', 'section'))
for key,value in data['skills'].items(): story.append(p(f'<b>{e(key)}:</b> {e(value)}'))
out = ROOT / 'resume/satya-maddipati-resume.pdf'
doc = SimpleDocTemplate(str(out), pagesize=letter, rightMargin=40, leftMargin=40, topMargin=32, bottomMargin=32,
    title='Satya Bhargav Maddipati - Resume', author=data['name'])
doc.build(story)
print(f'Updated {page_path.relative_to(ROOT)} and {out.relative_to(ROOT)}')
