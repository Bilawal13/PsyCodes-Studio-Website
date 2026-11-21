import os
import subprocess
import shutil
from PIL import Image

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
scratch_dir = os.path.join(base_dir, "src", "scratch")
banner_dir = os.path.join(base_dir, "public", "assets", "banner")
branding_dir = os.path.join(base_dir, "public", "assets", "branding")
logo_dir = os.path.join(base_dir, "public", "assets", "logo")

tasks = [
    {
        "html": os.path.join(scratch_dir, "render_banner_dark.html"),
        "width": 1920,
        "height": 1080,
        "outputs": [
            os.path.join(banner_dir, "banner_2.png"),
            os.path.join(banner_dir, "psycodes_banner_dark.png"),
            os.path.join(branding_dir, "psycodes_social_banner.jpg"),
        ]
    },
    {
        "html": os.path.join(scratch_dir, "render_banner_light.html"),
        "width": 1920,
        "height": 1080,
        "outputs": [
            os.path.join(banner_dir, "psycodes_banner_light.png"),
            os.path.join(branding_dir, "psycodes_social_banner_light.jpg"),
        ]
    },
    {
        "html": os.path.join(scratch_dir, "render_avatar_dark.html"),
        "width": 1024,
        "height": 1024,
        "outputs": [
            os.path.join(branding_dir, "psycodes_avatar.jpg"),
            os.path.join(logo_dir, "psycodes_avatar_dark.png"),
        ]
    },
    {
        "html": os.path.join(scratch_dir, "render_avatar_light.html"),
        "width": 1024,
        "height": 1024,
        "outputs": [
            os.path.join(branding_dir, "psycodes_avatar_light.jpg"),
            os.path.join(logo_dir, "psycodes_avatar_light.png"),
        ]
    },
    {
        "html": os.path.join(scratch_dir, "render_logo_trans_dark.html"),
        "width": 1024,
        "height": 1024,
        "outputs": [
            os.path.join(logo_dir, "Psycodes_logo_trans.png"),
            os.path.join(logo_dir, "psycodes_logo_trans_dark.png"),
        ]
    },
    {
        "html": os.path.join(scratch_dir, "render_logo_trans_light.html"),
        "width": 1024,
        "height": 1024,
        "outputs": [
            os.path.join(logo_dir, "psycodes_logo_trans_light.png"),
        ]
    }
]

for idx, t in enumerate(tasks):
    html_url = "file:///" + t["html"].replace("\\", "/")
    tmp_shot = os.path.join(scratch_dir, f"tmp_shot_{idx}.png")
    
    cmd = [
        chrome_path,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        f"--window-size={t['width']},{t['height']}",
        f"--screenshot={tmp_shot}",
        html_url
    ]
    
    print(f"Rendering {os.path.basename(t['html'])} ({t['width']}x{t['height']})...")
    subprocess.run(cmd, check=True)
    
    if not os.path.exists(tmp_shot):
        print(f"Error: {tmp_shot} was not created!")
        continue
        
    im = Image.open(tmp_shot)
    
    for out_path in t["outputs"]:
        ext = os.path.splitext(out_path)[1].lower()
        if ext in [".jpg", ".jpeg"]:
            im_rgb = im.convert("RGB")
            im_rgb.save(out_path, quality=95, optimize=True)
        else:
            im.save(out_path, optimize=True)
        print(f"  -> Saved {out_path} ({os.path.getsize(out_path)} bytes)")
        
    if os.path.exists(tmp_shot):
        os.remove(tmp_shot)

print("All raster and vector brand assets successfully rendered and updated!")
