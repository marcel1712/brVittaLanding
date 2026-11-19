"""Gera public/og-image.jpg (1200 × 630): a imagem que aparece ao compartilhar o site no
WhatsApp, Instagram, Facebook e LinkedIn.

Usa as fontes da marca direto do node_modules (Anek Latin e Raleway) e a foto do Dr. Bruno.
Toda peça de divulgação médica precisa trazer nome e CRM (Res. CFM 2.336/2023), por isso o rodapé.

Requisitos: pip install pillow fonttools brotli
Uso (na raiz do projeto): python3 design/og/gerar-og-image.py
"""
import io

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFilter, ImageFont

CRM = 'CRM-SP 279822'  # manter igual a site.doctor.crm em src/config/site.ts

W, H = 1200, 630
GOLD = (240, 206, 128)
WHITE = (255, 255, 255)
SOFT = (201, 207, 219)


def font(woff2, size, axes):
    """Converte o woff2 variável para TTF em memória e aplica os eixos (ex.: peso e largura)."""
    f = TTFont(woff2)
    f.flavor = None
    buf = io.BytesIO()
    f.save(buf)
    buf.seek(0)
    ft = ImageFont.truetype(buf, size)
    ft.set_variation_by_axes(axes)
    return ft


ANEK = 'node_modules/@fontsource-variable/anek-latin/files/anek-latin-latin-standard-normal.woff2'
RALE = 'node_modules/@fontsource-variable/raleway/files/raleway-latin-wght-normal.woff2'

img = Image.new('RGB', (W, H), (0, 0, 0))

# brilho navy atrás da foto
glow = Image.new('RGB', (W, H), (0, 0, 0))
ImageDraw.Draw(glow).ellipse([620, 180, 1320, 900], fill=(35, 54, 92))
img = Image.blend(img, glow.filter(ImageFilter.GaussianBlur(140)), 0.9)

# foto do médico em moldura em arco, sangrando pela base
px, py, pw = 800, 58, 330
ph = H - py
src = Image.open('design/imagemDoutorBruno.webp').convert('RGB')
crop_w = 470
crop_h = round(crop_w * ph / pw)
cx = 365
foto = src.crop((cx - crop_w // 2, 420, cx + crop_w // 2, 420 + crop_h)).resize((pw, ph), Image.LANCZOS)
mask = Image.new('L', (pw, ph), 0)
md = ImageDraw.Draw(mask)
md.rectangle([0, pw // 2, pw, ph], fill=255)
md.ellipse([0, 0, pw - 1, pw - 1], fill=255)
img.paste(foto, (px, py), mask)

d = ImageDraw.Draw(img)
x0 = 70

# marca: monograma + VITTA PERFORMANCE com espaçamento largo
mono = Image.open('src/assets/monograma.png').convert('RGBA')
mono.thumbnail((40, 40), Image.LANCZOS)
img.paste(mono, (x0, 62), mono)
f_brand = font(RALE, 17, [500])
x = x0 + 54
for ch in 'VITTA PERFORMANCE':
    d.text((x, 72), ch, font=f_brand, fill=WHITE)
    x += d.textlength(ch, font=f_brand) + 5.2

# título no tamanho máximo que cabe antes da foto
max_w = px - x0 - 40
size = 104
while True:
    f_title = font(ANEK, size, [800, 125])
    if d.textlength('ESTÁ POR VIR.', font=f_title) <= max_w:
        break
    size -= 2
y = 170
d.text((x0, y), 'SEU MELHOR', font=f_title, fill=WHITE)
y += round(size * 0.92)
d.text((x0, y), 'ESTÁ POR VIR.', font=f_title, fill=GOLD)
y += round(size * 0.92) + 34

f_sub = font(RALE, 27, [400])
for linha in ['Saúde, emagrecimento e performance', 'com acompanhamento médico individualizado.']:
    d.text((x0, y), linha, font=f_sub, fill=SOFT)
    y += 38

# rodapé com nome, CRM e cidade
d.rectangle([x0, 548, x0 + 3, 584], fill=GOLD)
f_doc = font(RALE, 22, [700])
f_info = font(RALE, 19, [500])
d.text((x0 + 18, 546), 'Dr. Bruno Ricardo', font=f_doc, fill=WHITE)
d.text((x0 + 18, 572), f'Médico · {CRM} · Santo André, SP', font=f_info, fill=SOFT)

img.save('public/og-image.jpg', quality=88, optimize=True, progressive=True)
print('public/og-image.jpg', img.size, f'título {size}px')
