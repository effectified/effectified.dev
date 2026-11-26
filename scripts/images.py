# Turns the 4K key-visual masters in brand/key-visuals/*.jpg into the site's WebP sizes in public/lp/.
# Usage: uv run --with pillow python scripts/images.py
# Each master becomes <name>-<width>.webp for every width below that is not wider than the master.

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MASTERS = ROOT / "brand" / "key-visuals"
OUT = ROOT / "public" / "lp"
WIDTHS = (828, 1440, 2560, 3840)
QUALITY = 80


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for master in sorted(MASTERS.glob("*.jpg")):
        image = Image.open(master).convert("RGB")
        for width in WIDTHS:
            if width > image.width:
                continue
            height = round(image.height * width / image.width)
            target = OUT / f"{master.stem}-{width}.webp"
            image.resize((width, height), Image.LANCZOS).save(target, "WEBP", quality=QUALITY, method=6)
            print(f"{target.relative_to(ROOT)} {target.stat().st_size // 1024} KiB")


main()
