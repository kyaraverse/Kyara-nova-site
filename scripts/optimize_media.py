from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path('/home/ubuntu/webdev-static-assets')
OUT = ROOT / 'optimized-kyara'
OUT.mkdir(parents=True, exist_ok=True)

SOURCES = {
    'hero-crystal.jpg': ROOT / 'kyara-real/hero-crystal.jpg',
    'kyara-square-profile.png': ROOT / 'kyara-real/kyara-square-profile.png',
    'portrait-close.png': ROOT / 'kyara-real/portrait-close.png',
    'signal.png': ROOT / 'kyara-provided/signal.png',
    'error.png': ROOT / 'kyara-provided/error.png',
    'cosmic-eye.png': ROOT / 'kyara-eye/cosmic-eye.png',
    'campo-nova.png': ROOT / 'kyara-narrative/campo-nova.png',
    'space-cockpit.png': ROOT / 'kyara-real/space-cockpit.png',
    'sunset-forest.png': ROOT / 'kyara-narrative/sunset-forest.png',
    'star-mark.png': ROOT / 'kyara-provided/star-mark.png',
    'eye-galaxy.png': ROOT / 'kyara-narrative/eye-galaxy.png',
    'eclipse-moon.png': ROOT / 'kyara-narrative/eclipse-moon.png',
    'portrait-full.jpg': ROOT / 'kyara-real/portrait-full.jpg',
    'cataratas-iguacu.jpg': ROOT / 'mente/cataratas-iguacu.jpg',
    'mirian-mural.jpg': ROOT / 'mente/mirian-mural.jpg',
    'mirian-florianopolis.jpg': ROOT / 'mente/mirian-florianopolis.jpg',
    'ponte-hercilio-luz.jpg': ROOT / 'mente/ponte-hercilio-luz.jpg',
    'miucha-studio.png': ROOT / 'mente/miucha-studio.png',
    '1000141955.webp': ROOT / 'kyara-real/1000141955.webp',
    '1000141958.webp': ROOT / 'kyara-real/1000141958.webp',
    '1000144316.png': ROOT / 'kyara-real/1000144316.png',
    '1000144317.png': ROOT / 'kyara-real/1000144317.png',
    'blue-screen-test-red.png': ROOT / 'blue_screen_test_red.png',
}

for name, source in SOURCES.items():
    if not source.exists():
        print(f'SKIP missing: {source}')
        continue
    try:
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw)
            has_alpha = 'A' in image.getbands()
            if has_alpha:
                image = image.convert('RGBA')
            else:
                image = image.convert('RGB')
            max_width = 1920 if name in {'hero-crystal.jpg', 'campo-nova.png', 'space-cockpit.png', 'sunset-forest.png', 'blue-screen-test-red.png'} else 1600
            if image.width > max_width:
                height = round(image.height * max_width / image.width)
                image = image.resize((max_width, height), Image.Resampling.LANCZOS)
            output = OUT / f'{Path(name).stem}.webp'
            image.save(output, 'WEBP', quality=82, method=6, lossless=False)
            print(f'{source} -> {output} ({image.width}x{image.height}, {output.stat().st_size} bytes)')
    except Exception as exc:
        print(f'ERROR {source}: {exc}')
