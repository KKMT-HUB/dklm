import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Attendance" };

export default async function Page() {
  await requireSession(rolesFor("attendance"));
  return (
    <ModulePlaceholder
      title="Attendance"
      description="Daily attendance records by class."
      planned={[
    "Mark attendance by class and day",
    "Review absences",
    "Export monthly summaries",
      ]}
    />
  );
}
