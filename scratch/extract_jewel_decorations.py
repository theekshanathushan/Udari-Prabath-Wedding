import os
import shutil
from PIL import Image
from collections import deque

# Output directories
WORKSPACE_DIR = r"c:\Users\User\OneDrive - NSBM\Documents\Mobile develpment\Udari-Prabath-Wedding\assets\images\jewel-decorations"
ARTIFACT_DIR = r"C:\Users\User\.gemini\antigravity\brain\262c3804-d14d-42ef-b7bd-69ba84f206a7"

os.makedirs(WORKSPACE_DIR, exist_ok=True)
os.makedirs(ARTIFACT_DIR, exist_ok=True)

def remove_background_flood(img, seeds=None, threshold=240, feather=True):
    """
    Flood fills background starting from specified seeds (default: all 4 borders).
    Produces a clean RGBA image with transparent background and soft anti-aliased edges.
    """
    img = img.convert("RGBA")
    w, h = img.size
    pix = img.load()

    visited = bytearray(w * h)
    queue = deque()

    def is_bg(r, g, b):
        if r >= threshold and g >= threshold and b >= threshold:
            return True
        if r >= (threshold - 10) and g >= (threshold - 10) and b >= (threshold - 10) and (max(r,g,b) - min(r,g,b) <= 12):
            return True
        return False

    if seeds is None:
        # Default seeds: all 4 outer edges
        for x in range(w):
            queue.append((x, 0))
            queue.append((x, h - 1))
            visited[0 * w + x] = 1
            visited[(h - 1) * w + x] = 1
        for y in range(h):
            queue.append((0, y))
            queue.append((w - 1, y))
            visited[y * w + 0] = 1
            visited[y * w + (w - 1)] = 1
    else:
        for sx, sy in seeds:
            if 0 <= sx < w and 0 <= sy < h and not visited[sy * w + sx]:
                queue.append((sx, sy))
                visited[sy * w + sx] = 1

    bg_set = set()
    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pix[x, y]
        if is_bg(r, g, b):
            bg_set.add((x, y))
            for dx, dy in ((-1,0), (1,0), (0,-1), (0,1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h:
                    idx = ny * w + nx
                    if not visited[idx]:
                        visited[idx] = 1
                        queue.append((nx, ny))

    # Set background to transparent
    for (x, y) in bg_set:
        r, g, b, _ = pix[x, y]
        pix[x, y] = (r, g, b, 0)

    # Edge anti-aliasing / soft feathering
    if feather:
        for x in range(1, w - 1):
            for y in range(1, h - 1):
                if (x, y) not in bg_set:
                    r, g, b, _ = pix[x, y]
                    bg_neighbors = sum(1 for dx, dy in ((-1,0),(1,0),(0,-1),(0,1)) if (x+dx, y+dy) in bg_set)
                    if bg_neighbors > 0:
                        min_val = min(r, g, b)
                        if min_val >= (threshold - 15):
                            alpha = int(max(20, min(240, (255 - min_val) * 9 - bg_neighbors * 18)))
                            pix[x, y] = (r, g, b, alpha)

    return img

def trim_transparency(img, pad=10):
    """Crops transparent borders leaving specified padding."""
    bbox = img.getbbox()
    if not bbox:
        return img
    min_x = max(0, bbox[0] - pad)
    min_y = max(0, bbox[1] - pad)
    max_x = min(img.width, bbox[2] + pad)
    max_y = min(img.height, bbox[3] + pad)
    return img.crop((min_x, min_y, max_x, max_y))

def save_dual(img, filename):
    workspace_path = os.path.join(WORKSPACE_DIR, filename)
    artifact_path = os.path.join(ARTIFACT_DIR, filename)
    img.save(workspace_path, "PNG", optimize=True)
    img.save(artifact_path, "PNG", optimize=True)
    print(f"Saved: {filename} -> {img.size} ({os.path.getsize(workspace_path):,} bytes)")
    return workspace_path

print("Starting jewel decoration extraction...")

# 1. Hanging Marigold & Rose Garlands
src_garlands = r"C:\Users\User\.gemini\antigravity\brain\262c3804-d14d-42ef-b7bd-69ba84f206a7\hanging_marigold_rose_garlands_1794651001635.jpg"
img_garlands = Image.open(src_garlands)
trans_garlands = remove_background_flood(img_garlands, threshold=242)
trans_garlands = trim_transparency(trans_garlands, pad=15)
save_dual(trans_garlands, "hanging-marigold-rose-garlands.png")

# 2. Ornate Gold Mandala Corner Frame (Left and Right Mirrored)
src_corner = r"C:\Users\User\.gemini\antigravity\brain\262c3804-d14d-42ef-b7bd-69ba84f206a7\ornate_gold_mandala_corner_1794651112787.jpg"
img_corner = Image.open(src_corner)
trans_corner_left = remove_background_flood(img_corner, threshold=240)
trans_corner_left = trim_transparency(trans_corner_left, pad=15)
save_dual(trans_corner_left, "gold-mandala-corner-left.png")

# Right mirrored version
trans_corner_right = trans_corner_left.transpose(Image.FLIP_LEFT_RIGHT)
save_dual(trans_corner_right, "gold-mandala-corner-right.png")

# 3. Golden Wedding Arch / Frame (with transparent outside AND interior)
src_arch = r"C:\Users\User\.gemini\antigravity\brain\262c3804-d14d-42ef-b7bd-69ba84f206a7\golden_wedding_arch_frame_1794651213756.jpg"
img_arch = Image.open(src_arch)
# Seed from both borders and inside the arch window
w_arch, h_arch = img_arch.size
arch_seeds = []
# Outer borders
for x in range(w_arch):
    arch_seeds.append((x, 0))
    arch_seeds.append((x, h_arch - 1))
for y in range(h_arch):
    arch_seeds.append((0, y))
    arch_seeds.append((w_arch - 1, y))
# Center window seed
arch_seeds.append((w_arch // 2, h_arch // 2))
arch_seeds.append((w_arch // 2, h_arch // 2 + 100))
arch_seeds.append((w_arch // 2, h_arch // 2 - 50))

trans_arch = remove_background_flood(img_arch, seeds=arch_seeds, threshold=240)
trans_arch = trim_transparency(trans_arch, pad=15)
save_dual(trans_arch, "golden-wedding-arch-frame.png")

# Master sheet for remaining elements
src_master = r"C:\Users\User\.gemini\antigravity\brain\262c3804-d14d-42ef-b7bd-69ba84f206a7\jewel_tone_decorations_pack_1794650947877.jpg"
img_master = Image.open(src_master)

# 4. Gold Floral Divider Line
crop_divider = img_master.crop((15, 440, 530, 625))
trans_divider = remove_background_flood(crop_divider, threshold=238)
trans_divider = trim_transparency(trans_divider, pad=10)
save_dual(trans_divider, "gold-floral-divider.png")

# 5. Small Gold Lotus Motifs
# Blooming lotus
crop_lotus = img_master.crop((150, 640, 395, 845))
trans_lotus = remove_background_flood(crop_lotus, threshold=238)
trans_lotus = trim_transparency(trans_lotus, pad=10)
save_dual(trans_lotus, "gold-lotus-motif.png")

# Bud / Stylized lotus pair
crop_lotus_bud = img_master.crop((20, 810, 270, 1005))
trans_lotus_bud = remove_background_flood(crop_lotus_bud, threshold=238)
trans_lotus_bud = trim_transparency(trans_lotus_bud, pad=10)
save_dual(trans_lotus_bud, "gold-lotus-bud-motif.png")

# 6. Gold Paisley Motif
crop_paisley = img_master.crop((550, 810, 685, 1005))
trans_paisley = remove_background_flood(crop_paisley, threshold=238)
trans_paisley = trim_transparency(trans_paisley, pad=10)
save_dual(trans_paisley, "gold-paisley-motif.png")

# 7. Seamless Faint Gold Paisley Pattern Tile
# Create a 400x400 transparent canvas with tiled subtle paisley motifs
tile_size = 400
pattern_tile = Image.new("RGBA", (tile_size, tile_size), (0, 0, 0, 0))

# Resize paisley for subtle repeating motif
pm_w = 90
pm_h = int(trans_paisley.height * (pm_w / trans_paisley.width))
small_paisley = trans_paisley.resize((pm_w, pm_h), Image.Resampling.LANCZOS)

# Create faint semi-transparent version (alpha scaled down to ~35%)
faint_paisley = small_paisley.copy()
fp_pix = faint_paisley.load()
for py in range(pm_h):
    for px in range(pm_w):
        r, g, b, a = fp_pix[px, py]
        if a > 0:
            fp_pix[px, py] = (r, g, b, int(a * 0.38))

# Mirrored faint paisley
faint_paisley_flipped = faint_paisley.transpose(Image.FLIP_LEFT_RIGHT).rotate(15, expand=True)

# Paste in balanced grid for seamless wallpaper tile
pattern_tile.alpha_composite(faint_paisley, (40, 40))
pattern_tile.alpha_composite(faint_paisley, (240, 240))
pattern_tile.alpha_composite(faint_paisley_flipped, (240, 30))
pattern_tile.alpha_composite(faint_paisley_flipped, (40, 230))

save_dual(pattern_tile, "gold-paisley-pattern-tile.png")

print("All jewel-tone wedding decorations extracted successfully!")

