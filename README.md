# Mohsin Ahmad — Interactive 3D Virtual Office Portfolio

A premium, production-quality **3D virtual office** built with React, TypeScript,
Vite, Three.js, React Three Fiber, and Drei. Visitors enter an explorable,
cutaway isometric office with **eight connected rooms**, a controllable
character, a persistent left sidebar, floating room labels, a profile panel,
smooth camera navigation, a guided tour, and a cinematic loading screen.

## Quick start

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to /dist
npm run preview    # preview the production build locally
npm run typecheck  # TypeScript check only
```

## Tech stack

React 18 · TypeScript · Vite 5 · Three.js · @react-three/fiber · @react-three/drei ·
Tailwind CSS · Framer Motion · Lucide React

## The eight rooms

1. **Reception** — welcome + entry actions
2. **Development Studio** — frontend stack, live code editor, tech detail panels
3. **Analytics Lab** — Excel / Power BI dashboard demos (SVG charts, KPI cards)
4. **Project Showroom** — five real, deployed projects with working links
5. **Meeting Room** — areas of interest + contact entry points
6. **Education Corner** — BS Software Engineering + learning timeline
7. **Contact Lounge** — contact details + validated contact form
8. **Owner's Cabin** — full professional profile, skills, CV

Navigate via the **left sidebar**, the **floating 3D room labels**, the
**mobile room strip**, or the **Guided Tour**. Move the character with
**WASD / arrow keys**; **drag** to orbit and **scroll** to zoom; **click the
floor** to walk there (tap-to-move). **Esc** returns to the overview.

## Editing your content (data files)

All content lives in `src/data/` — no need to touch 3D code to update it:

| File | What it controls |
|------|------------------|
| `profile.ts` | Name, headline, about, education, contact, socials, CV path |
| `projects.ts` | The five projects shown in the Showroom |
| `skills.ts` | Frontend + analytics skills, dev tools, learning timeline |
| `rooms.ts` | Room positions, camera targets, taglines, tour order |
| `navigation.ts` | Sidebar order + guided-tour copy |

### Adding a project

Append an object to the `projects` array in `src/data/projects.ts`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  tagline: 'Short subtitle',
  description: 'What it actually does.',
  technologies: ['React', 'CSS3'],
  links: { live: 'https://example.com/', repo: 'https://github.com/you/repo' },
  previewVerified: false,   // set true only with a real, verified screenshot
  accent: '#D9AE63',
}
```

> **Screenshots:** This build uses tasteful neutral placeholders rather than
> fabricated screenshots. To show real previews, capture each site and place
> images in `public/assets/images/`, then render them in
> `src/components/roomContent/ProjectShowroomContent.tsx`.

## CV

The real CV lives at `public/assets/cv/Mohsin-Ahmad-CV.pdf` and is referenced by
`profile.cvPath`. **Download CV** downloads that exact file; **View CV** opens it
in a modal. To update it, replace the PDF (keep the filename) or change `cvPath`.

## Contact form backend

The form is fully validated but does **not** pretend to send mail without a
backend. To enable real delivery, set a POST endpoint (e.g. Formspree, Getform, or
your own serverless function) — no secret keys in the frontend:

```bash
cp .env.example .env
# then edit .env:
VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Until that is set, the form reports honestly that no mail service is configured
and offers the direct email address.

## Deployment (Vercel)

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build `npm run build`, output `dist`.
4. Add any `VITE_*` env vars under **Settings → Environment Variables**.
5. Deploy. `vercel.json` already configures the SPA rewrite + CV caching.

Works the same on Netlify, GitHub Pages, or any static host (serve `dist/`).

## Accessibility & performance notes

- Semantic HTML, keyboard-accessible controls, visible focus rings.
- Reduced-motion media query disables heavy animation.
- Adaptive render quality: lower DPR / effects on small or low-core devices.
- WebGL error boundary + a full non-3D fallback that still shows all content.
- Three.js / R3F / Framer Motion are code-split into separate chunks.

---

Built for **Mohsin Ahmad** · Software Engineering Student · Frontend Developer ·
Data Analytics Enthusiast · Peshawar, Pakistan.
