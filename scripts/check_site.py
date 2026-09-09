"""Static HTML, local-link and palette checks. Run with python3 scripts/check_site.py."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
VOID = {'meta','link','img','br','hr','input','source','wbr','area','base','embed','param','track'}
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.refs=[]; self.h1=0; self.main=0; self.stack=[]; self.errors=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        self.refs.extend(a[k] for k in ('href','src') if k in a)
        if tag=='img' and 'alt' not in a: self.errors.append('Image missing alt attribute')
        if tag=='h1': self.h1+=1
        if tag=='main': self.main+=1
        if tag in ('a','button') and tag in self.stack: self.errors.append('Nested '+tag)
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self,tag):
        if not self.stack or self.stack[-1]!=tag: self.errors.append('Mismatched closing '+tag)
        if tag in self.stack: self.stack=self.stack[:len(self.stack)-1-self.stack[::-1].index(tag)]
    def handle_startendtag(self,tag,attrs):
        self.handle_starttag(tag,attrs)
        if tag not in VOID: self.handle_endtag(tag)
pages={}
for file in ROOT.rglob('*.html'):
    page=Page(); page.feed(file.read_text()); pages[file.resolve()]=page
errors=[]
for file,page in pages.items():
    errors.extend(f'{file.relative_to(ROOT)}: {x}' for x in page.errors)
    if page.stack: errors.append(f'Unclosed tags in {file.name}: {page.stack}')
    if len(page.ids)!=len(set(page.ids)): errors.append(f'Duplicate IDs in {file.name}')
    if page.h1!=1 or page.main!=1: errors.append(f'Expected one h1/main in {file.name}')
    for ref in page.refs:
        url=urlsplit(ref)
        if url.scheme or url.netloc: continue
        target=ROOT/url.path.lstrip('/') if url.path.startswith('/') else file.parent/url.path if url.path else file
        if target.is_dir(): target=target/'index.html'
        if not target.exists(): errors.append(f'{file.name}: missing {ref}')
        elif url.fragment and target.resolve() in pages and unquote(url.fragment) not in pages[target.resolve()].ids: errors.append(f'{file.name}: missing anchor {ref}')

def luminance(color):
    channels=[int(color[i:i+2],16)/255 for i in (0,2,4)]
    channels=[c/12.92 if c<=.04045 else ((c+.055)/1.055)**2.4 for c in channels]
    return sum(c*w for c,w in zip(channels,(.2126,.7152,.0722)))
def contrast(a,b):
    light,dark=sorted((luminance(a),luminance(b)),reverse=True)
    return (light+.05)/(dark+.05)
for name,foregrounds,backgrounds in [
    ('light',['272e29','60685f','31584b'],['f6f5ef','fffefa','e8ede2','efeadc']),
    ('dark',['eeefe5','b3bcae','a4c6a5'],['1b211e','232b25','2d382e','333229'])]:
    ratios=[contrast(f,b) for f in foregrounds for b in backgrounds]
    if min(ratios)<4.5: errors.append(f'{name} palette fails normal-text contrast: {min(ratios):.2f}')
    print(f'{name} palette: minimum text contrast {min(ratios):.2f}:1')
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; HTML structure, local links, fragments, IDs, image alternatives, and text palette.')
