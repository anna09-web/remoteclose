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
- `src/lib/typeform.ts` — Typeform integration point for the application form

## Connecting Typeform

The application form (`src/components/ApplicationForm.tsx`) currently
validates input client-side and simulates a submission. To wire it up to
Typeform:

1. Set `TYPEFORM_ENDPOINT` in `src/lib/typeform.ts` to a backend proxy
   endpoint that forwards submissions to the Typeform API (don't call
   Typeform's API directly from the browser — it requires a secret key).
2. Alternatively, set `USE_TYPEFORM_EMBED = true` and swap in an embedded/
   hosted Typeform instead of the custom form.

See the `TODO: connect Typeform here` comment in `ApplicationForm.tsx` for
the exact spot to wire this up.
