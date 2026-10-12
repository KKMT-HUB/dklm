import type { Metadata } from "next";
import { ModulePlaceholder } from "@/components/dashboard/module-placeholder";
import { requireSession } from "@/lib/auth/session";
import { rolesFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Settings" };

export default async function Page() {
  await requireSession(rolesFor("settings"));
  return (
    <ModulePlaceholder
      title="Settings"
      description="Institution and account settings."
      planned={[
    "Update institution details",
    "Manage classes and terms",
    "Manage user accounts and roles",
      ]}
    />
  );
}
