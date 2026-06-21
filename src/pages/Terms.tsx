import LegalPage from "../components/LegalPage";
import { SITE } from "../lib/content";

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="June 21, 2026">
      <p>
        By accessing this website and submitting an application, you agree
        to these Terms. {SITE.name} provides educational sales-training
        content and program information. We make no guarantee of specific
        income, job placement, or results — outcomes depend on individual
        effort.
      </p>
      <p>
        All content, branding, and materials on this site are the property
        of {SITE.name} and may not be copied or redistributed without
        permission.
      </p>
      <p>
        Submitting an application does not guarantee acceptance into the
        program. We reserve the right to update these Terms at any time;
        continued use of the site constitutes acceptance.
      </p>
      <p>
        For questions, contact{" "}
        <a
          href={`mailto:${SITE.contactEmail}`}
          className="text-accent-2 hover:underline"
        >
          {SITE.contactEmail}
        </a>
        .
      </p>
    </LegalPage>
  );
}
