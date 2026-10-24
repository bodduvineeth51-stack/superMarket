# Basko Market

A grocery store website you walk through in 3D. Visitors scroll (or swipe) down the aisles, tap products on the shelves to see the price, and add them to a working cart.

Built with plain HTML, CSS and JavaScript plus [three.js](https://threejs.org/) (loaded from a CDN). There is no build step.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Put it on GitHub Pages

```bash
git init
git add .
git commit -m "Basko Market 3D store"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root) → Save**.
Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

## Controls

| Action | Desktop | Phone |
| --- | --- | --- |
| Walk | Scroll, ↑ / ↓, or the dock arrows | Swipe up / down |
| Look around | Drag, ← / → | Swipe left / right |
| Jump to an aisle | Aisle buttons at the bottom | Same |
| See a product | Click it | Tap it |
| Buy a product | Drag it into the trolley | Drag it into the trolley |

## Customise

Everything lives in `js/main.js`:

- **Products and aisles**: edit the `CATS` array near the top. Each product is
  `[name, brand, size, price, shape, packColour, accentColour]`.
  Shapes: `carton`, `cereal`, `tub`, `brick`, `sack`, `bag`, `bottle`, `jar`, `can`, `spray`, `tissue`, `pump`, `tube`.
- **Store colours**: the `C` object in `main.js` (3D scene) and the `:root` variables in `css/style.css` (interface).
- **Store name**: search for `Basko` in `index.html` and `main.js`.

The cart is saved in the visitor's browser (localStorage). "Place order" is a demo and does not take payment; connect a checkout service (Shopify, Razorpay, Stripe and so on) to sell for real.
