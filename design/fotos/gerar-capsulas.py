"""Gera as fotos das cápsulas do título (hero) a partir dos originais em design/fotos/.

Cada foto é recortada na proporção da cápsula (1,9:1) em volta do assunto, para ser
reconhecível mesmo pequena (≈ 180 × 95 px), e levemente dessaturada para combinar com o preto
e o dourado do site. NÃO usar fotos desfocadas por movimento: no tamanho da cápsula viram borrão.
Uso (na raiz do projeto): python3 design/fotos/gerar-capsulas.py
"""
from PIL import Image, ImageEnhance

R = 1.9           # largura / altura da cápsula (precisa bater com .pill em src/pages/index.astro)
W = 640
H = round(W / R)
# arquivo de origem -> (caixa de recorte em px do original, nome de saída)
ITENS = [
    ('design/fotos/tenis.jpg',          (0, 262, 840, 704),     'pill-tenis'),
    ('design/fotos/halterofilia.jpg',   (120, 130, 1050, 620),  'pill-halterofilia'),
    ('design/fotos/volei.jpg',          (430, 196, 1150, 575),  'pill-volei'),
    ('design/fotos/natacao.jpg',        (0, 440, 735, 827),     'pill-natacao'),
    ('design/fotos/corrida-senior.jpg', (760, 330, 1840, 899),  'pill-corrida-senior'),
    ('design/fotos/ciclismo.jpg',       (90, 215, 1050, 720),   'pill-ciclismo'),
    ('design/fotos/futebol.jpg',        (0, 100, 1170, 716),    'pill-futebol'),
    ('design/fotos/consulta.jpg',       (0, 0, 612, 323),       'pill-consulta'),
]

for origem, caixa, nome in ITENS:
    im = Image.open(origem).convert('RGB').crop(caixa).resize((W, H), Image.LANCZOS)
    im = ImageEnhance.Color(im).enhance(0.88)
    im = ImageEnhance.Contrast(im).enhance(1.04)
    im.save(f'src/assets/{nome}.jpg', quality=88)
    print(nome, im.size)
