import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireSession } from "@/lib/auth/session";
import { modulesForRole } from "@/lib/roles";

export const metadata: Metadata = { title: { default: "Dashboard", template: "%s | Muallim Web" }, robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const nav = modulesForRole(session.role).map(({ href, label, icon }) => ({ href, label, icon }));

  return (
    <DashboardShell user={{ name: session.name, role: session.role }} nav={nav}>
      {children}
    </DashboardShell>
  );
}
