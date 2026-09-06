## Contributors

- Designer: **Olha Kasimova**
- Developer: **Valerii Solod**

# Psychologist

This project is an initial Next.js 15 foundation for a psychologist website.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- SCSS Modules
- modern-normalize
- Swiper
- Formik
- Yup
- clsx

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`

## Environment

Copy `.env.example` to `.env.local` and adjust values as needed.

```bash
cp .env.example .env.local
```

The default public site URL is configured as `http://localhost:3000`.

## Practices and marquee

The marquee appears between the people stories and About me, with a 64px strip and 40px spacing on either side. Its existing continuous animation is preserved.

Grounding and parenting checklists support keyboard and pointer input. Completing every item opens the Figma completion dialog with the current practice title and a 1–5 rating. Escape, the close button, or the backdrop dismisses it and returns focus. Unchecking a step allows a new completion. Progress and ratings stay in component memory only and reset on page reload; nothing is sent to a server.

Box breathing repeats inhale, hold, exhale, hold at four seconds per phase using the existing illustrations. Cards remain three columns on desktop and one column at 1100px and below.

Run `npm test` with Node.js 22.18+ for practice state and breathing cycle regression tests. Run `npx tsc --noEmit --incremental false` and `npm run build` for integration checks.
