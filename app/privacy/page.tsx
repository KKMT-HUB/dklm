import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>This is a placeholder. Replace it with your institution&apos;s privacy policy before launch.</p>
      <p>It should explain what student, teacher and staff data you collect, why, how long you keep it, and who to contact about it.</p>
    </LegalPage>
  );
}
