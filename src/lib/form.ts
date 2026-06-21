// Form submission backend config.
//
// Typeform's API has no endpoint to create a response from external
// data — responses can only be created by someone filling out the
// Typeform-hosted form itself — so it can't receive submissions from
// our custom multi-step form. We use Formspree instead: it accepts a
// plain JSON POST and forwards each submission to your inbox (and to
// the Formspree dashboard).
//
// Setup:
//   1. Create a form at https://formspree.io (free tier works).
//   2. Copy its endpoint, e.g. https://formspree.io/f/abcd1234
//   3. Paste it below.
//
// TODO: connect Formspree here.
export const FORM_ENDPOINT = "";
