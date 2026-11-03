import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Reports" };

export default async function Page() {
  await requireSession(rolesFor("reports"));
  return (
    <ModulePlaceholder
      title="Reports"
      description="Academic summaries and trends."
      planned={[
    "See attendance trends",
    "Compare class results",
    "Export reports",
      ]}
    />
  );
}
