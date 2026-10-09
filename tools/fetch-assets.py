"""Download the reference homepage's public assets into public/assets with meaningful names.

Usage: python3 -I tools/fetch-assets.py
Writes analysis/assets-manifest.json (local path -> source URL).
"""
import json
import os
import re
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = os.path.join(ROOT, 'analysis/ref/index.html')
OUT = os.path.join(ROOT, 'public/assets')
CDN = 'https://cdn.prod.website-files.com/'
SITE = CDN + '6a071561c8d2a321a5d0a044/'

FIXED = {
    'lottie/talk-loop.json': SITE + '6a14581e0f3eb0d5d9f750a7_Talk-Loop-03-Lottie.json',
    'lottie/jumping-loop.json': SITE + '6a14581e59abbe4ed2c334c1_Jumping-Loop-01-Lottie.json',
    'lottie/stuut-eat.json': SITE + '6a14581ed4c4ab629850c692_Stuut-Eat-04-Lottie.json',
    'lottie/pop-up-loop.json': SITE + '6a14581ee4f1d4b6c2fdd599_Pop-Up-Loop-03-Lottie.json',
    'lottie/hiw-actually-does-the-work.json': SITE + '6ac6157a79f6e3059a73bf27_stuut-home-actually-does-the-work.json',
    'lottie/hiw-knows-everyones-business.json': SITE + '6ac61579609e8408469ca183_stuut-home-knows-everyones-business.json',
    'lottie/hiw-plays-by-your-rules.json': SITE + '6abfd46597c2eeb96b58cbad_stuut-home-plays-by-your-rules.json',
    'images/bubble.svg': SITE + '6a14590e3f58effc6307b3d5_bubble.svg',
    'images/blue-grid.svg': SITE + '6a07690547a7b500ad438bfd_blue-grid.svg',
    'icons/close.svg': SITE + '6a3b161739cfc1951b33230f_Stuut%20Menu%20Close%20Icon.svg',
    'icons/nav/collections.svg': SITE + '6a073ee67d1807b01bbb490e_icon-5.svg',
    'icons/nav/credit.svg': SITE + '6a073ee67d1807b01bbb490f_icon-1.svg',
    'icons/nav/cash-app.svg': SITE + '6a073ee67d1807b01bbb4910_icon-3.svg',
    'icons/nav/payments.svg': SITE + '6a073ee67d1807b01bbb4912_icon-6.svg',
    'icons/nav/disputes.svg': SITE + '6a073ee67d1807b01bbb490d_icon-2.svg',
    'icons/nav/security.svg': SITE + '6a073ee67d1807b01bbb4911_icon-4.svg',
    'icons/nav/blog.svg': SITE + '6ab174bd54ac16867150878e_fbcc62c0cfcd560165b9b24e7a82f309_bi_journal-code.svg',
    'icons/nav/guides.svg': SITE + '6ab174bd75b38c46ffd5353d_36fdaf4414a38b4da74720936ddd9b1e_icon-park-outline_guide-board.svg',
    'icons/nav/engineering.svg': SITE + '6ab174bd5f13b3207e0f6ffa_4397321a95940c2f5e0a32b182f5a5e9_carbon_ibm-engineering-lifecycle-mgmt.svg',
    'icons/nav/changelog.svg': SITE + '6ab174bd04966322950211c0_fc438cdc6a609112ffdb0d1a63f5e52d_Vector.svg',
    'icons/social/linkedin.svg': SITE + '6a74881da26dcebee2b596d0_social-icon-li.svg',
    'icons/social/x.svg': SITE + '6a74881dad74a9c3cfd38cee_social-icon-x.svg',
    'icons/social/instagram.svg': SITE + '6a74881de2d476bf5a78c063_social-icon-ig.svg',
    'icons/social/youtube.svg': SITE + '6a74881de5aa7b4328a4026c_social-icon-yt.svg',
    'brand/favicon.png': SITE + '6a074196a30e45fb7308e13c_stuut-favicon.png',
    'brand/webclip.png': SITE + '6a07419e807e05378ea50f43_stuut-webclip.png',
    'brand/og-image.png': SITE + '6a104602be696816a7d0d3d3_6a075d312a617d038fe352ca_og-image.png',
}
FONTS = {
    '../../src/fonts/QuadrantText-Regular.woff2': SITE + '6a0b6d3f7dabc2947715cf29_QuadrantText-Regular.woff2',
    '../../src/fonts/Hn-Medium.woff2': SITE + '6a3d3ee503b89ebd10cb651d_hn-medium.woff2',
    '../../src/fonts/Hn-Bold.woff2': SITE + '6a3d3ee5db53d948e618b2a9_hn-bold.woff2',
    '../../src/fonts/Hn-ExtraBold.woff2': SITE + '6a3d3ee503b89ebd10cb651a_hn-extra-bold.woff2',
}


def slug(s):
    s = urllib.parse.unquote(urllib.parse.unquote(s)).lower()
    s = re.sub(r'stuut partner customer (logos|headshots) ', '', s)
    s = re.sub(r' final 2026-04', '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s


def from_html():
    h = open(HTML, encoding='utf-8').read()
    found = {}
    # customer logos + integration logos + portraits live on the CMS bucket (...a04a)
    for url in re.findall(r'src="(https://cdn\.prod\.website-files\.com/6a071561c8d2a321a5d0a04a/[^"]+)"', h):
        base = url.rsplit('/', 1)[1]
        name = re.sub(r'^[0-9a-f]{24}_(?:[0-9a-f]{24}_)?', '', base)
        name, ext = os.path.splitext(name)
        alt = re.search(r'alt="([^"]*)"[^>]*src="' + re.escape(url), h)
        if 'Customer%20Logos' in url or 'Partner%20Customer%20Logos' in url:
            folder = 'logos/customers'
        elif 'Frame%202147239546' in url:
            folder, name = 'logos/customers', 'ncr-voyix'
        elif alt and alt.group(1) and not re.search(r'Logos', url):
            folder, name = 'people', alt.group(1)
        else:
            folder = 'logos/integrations'
        found[f'{folder}/{slug(name)}{ext}'] = url
    return found


def main():
    manifest = {**FIXED, **from_html(), **FONTS}
    for rel, url in manifest.items():
        dest = os.path.normpath(os.path.join(OUT, rel))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            continue
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=60) as r, open(dest, 'wb') as f:
            f.write(r.read())
        print('ok', rel, os.path.getsize(dest))
    with open(os.path.join(ROOT, 'analysis/assets-manifest.json'), 'w') as f:
        json.dump(manifest, f, indent=1)


if __name__ == '__main__':
    main()
