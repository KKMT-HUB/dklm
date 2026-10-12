import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Teachers" };

export default async function Page() {
  await requireSession(rolesFor("teachers"));
  return (
    <ModulePlaceholder
      title="Teachers"
      description="Staff profiles and class assignments."
      planned={[
    "Add and edit teacher profiles",
    "Assign teachers to classes",
    "Track responsibilities",
      ]}
    />
  );
}
