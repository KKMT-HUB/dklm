import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Examinations" };

export default async function Page() {
  await requireSession(rolesFor("examinations"));
  return (
    <ModulePlaceholder
      title="Examinations"
      description="Exams, marks, grades and report cards."
      planned={[
    "Schedule examinations",
    "Enter marks and grades",
    "Print report cards",
      ]}
    />
  );
}
