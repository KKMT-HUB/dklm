import Link from "next/link";
import { ModuleIcon } from "@/components/dashboard/module-icon";
import { requireSession } from "@/lib/auth/session";
import { modulesForRole, ROLE_LABELS, rolesFor } from "@/lib/roles";

export default async function DashboardPage() {
  const session = await requireSession(rolesFor("overview"));
  const modules = modulesForRole(session.role).filter((m) => m.key !== "overview");

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-900">Welcome, {session.name}</h1>
      <p className="mt-2 text-ink-600">You are signed in as {ROLE_LABELS[session.role]}. These are the areas you can open.</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => (
          <li key={module.key}>
            <Link
              href={module.href}
              className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 transition hover:border-accent-400 hover:shadow-lg hover:shadow-primary-900/10"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-700 group-hover:text-accent-200">
                <ModuleIcon name={module.icon} className="size-5" />
              </span>
              <span>
                <span className="block font-display font-semibold text-primary-900">{module.label}</span>
                <span className="mt-1 block text-sm text-ink-600">{module.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
