"""Tratamento de cor da marca: mapeia a luminância para um degradê navy -> ardósia -> marfim,
mantendo um pouco da cor original. Uso: grade.py entrada saida [mistura_original] [max_lado]"""
import sys, numpy as np
from PIL import Image, ImageOps
src, dst = sys.argv[1], sys.argv[2]
keep = float(sys.argv[3]) if len(sys.argv) > 3 else 0.12
maxside = int(sys.argv[4]) if len(sys.argv) > 4 else 1600
im = Image.open(src).convert('RGB'); im.thumbnail((maxside, maxside), Image.LANCZOS)
a = np.asarray(im).astype(np.float32) / 255
L = 0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2]
L = np.clip((L - 0.04) / 0.92, 0, 1) ** (float(sys.argv[5]) if len(sys.argv) > 5 else 1.0)  # níveis + gama
L = L*L*(3 - 2*L)*0.55 + L*0.45                # curva S suave
stops = np.array([0, .35, .72, 1.0])
cols = np.array([[5,8,15],[27,39,64],[138,143,152],[243,234,214]], np.float32)/255
out = np.stack([np.interp(L, stops, cols[:,c]) for c in range(3)], -1)
out = out*(1-keep) + a*keep
Image.fromarray((np.clip(out,0,1)*255).astype(np.uint8)).save(dst, quality=90)
print(dst, im.size)
