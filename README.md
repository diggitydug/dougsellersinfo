Doug Sellers – Portfolio
========================

Tech: Vite + React + TypeScript + React Router. Deployed to GitHub Pages with a custom domain (dougsellers.info).

Quick start
-----------

1) Install dependencies

```powershell
npm install
```

2) Start dev server

```powershell
npm run dev
```

3) Build

```powershell
npm run build
```

Customize
---------

- Replace the photo placeholder on Home by dropping a square headshot at `src/assets/me.jpg` and swapping the markup in `src/pages/Home.tsx`.
- Edit `src/pages/About.tsx` with your bio and hobbies.
- Set your email handling in `src/pages/Contact.tsx` (currently opens a mailto link). You can later wire a serverless form service.
- Update social links and resume file:
	- Socials live in `src/components/Footer.tsx`.
	- Replace `public/resume.pdf` with your actual resume PDF.
- Theme: adjust colors in `src/styles.css`. Toggle lives in `src/components/NavBar.tsx` and logic in `src/components/ThemeProvider.tsx`.

Deploy
------

Pushing to `dev` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml` which builds the site and publishes to Pages. The `public/CNAME` file configures the custom domain `dougsellers.info`.

If you change the default branch or Pages settings, update the workflow triggers accordingly.

Notes
-----

- SPA routing: `public/404.html` redirects unknown routes back to `/` for GitHub Pages.
- This project uses TypeScript. Config is in `tsconfig*.json`.
# dougsellersinfo
Personal Site
