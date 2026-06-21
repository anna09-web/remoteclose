import LegalPage from "../components/LegalPage";
import { SITE } from "../lib/content";

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="June 21, 2026">
      <p>
        We collect the information you provide through the application form
        (name, email, phone number, and your responses) solely to evaluate
        your application and contact you about the program. We do not sell
        your personal data to third parties.
      </p>
      <p>
        Your information may be stored using secure third-party tools for
        the purpose of managing applications and communication.
      </p>
      <p>
        You may request access to or deletion of your data at any time by
        emailing{" "}
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="text-accent-2 hover:underline"
        >
          {SITE.contactEmail}
        </a>
        .
      </p>
      <p>
        By submitting the form, you consent to being contacted by email
        and/or phone regarding {SITE.name}. This site may use basic
        cookies/analytics to improve performance.
      </p>
    </LegalPage>
  );
}
