import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms and Conditions">
      <p>This is a placeholder. Replace it with your terms of use before launch.</p>
      <p>It should cover account responsibilities, acceptable use, and how your institution handles disputes.</p>
    </LegalPage>
  );
}
