import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Students" };

export default async function Page() {
  await requireSession(rolesFor("students"));
  return (
    <ModulePlaceholder
      title="Students"
      description="Profiles, admissions and academic records."
      planned={[
    "Add and edit student profiles",
    "Record admissions by class",
    "View academic history",
      ]}
    />
  );
}
