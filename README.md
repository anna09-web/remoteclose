# RemoteClose

Landing page for RemoteClose — a premium remote sales / high-ticket closing
training program. Single-page site built with React, TypeScript, Tailwind
CSS v4, and Framer Motion.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project structure

- `src/components/` — page sections (Hero, Stats, Curriculum, ApplicationForm, etc.)
- `src/pages/` — Terms of Use and Privacy Policy pages (hash-routed at `#/terms` and `#/privacy`)
- `src/lib/content.ts` — editable site copy: stats, curriculum, testimonials, contact email
- `src/lib/form.ts` — form submission backend config for the application form

## Connecting the application form backend

The application form (`src/components/ApplicationForm.tsx`) currently
validates input client-side and simulates a submission.

We use [Formspree](https://formspree.io) rather than Typeform: Typeform's
API has no endpoint to create a response from external data (responses can
only be created by someone filling out the Typeform-hosted form itself),
so it can't act as a backend for our custom multi-step form. Formspree
accepts a plain JSON POST and forwards it to your inbox.

To connect it:

1. Create a form at [formspree.io](https://formspree.io) (free tier works).
2. Copy its endpoint, e.g. `https://formspree.io/f/abcd1234`.
3. Set `FORM_ENDPOINT` in `src/lib/form.ts` to that URL.

See the `TODO: connect Formspree here` comment in `ApplicationForm.tsx` for
the exact spot this is wired up.
