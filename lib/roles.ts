import type { Role } from "@/types/auth";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  institution_admin: "Institution Admin",
  teacher: "Teacher",
  student: "Student",
};

export type ModuleKey =
  | "overview"
  | "students"
  | "teachers"
  | "attendance"
  | "examinations"
  | "reports"
  | "settings";

export type ModuleIconName =
  | "layout-dashboard"
  | "graduation-cap"
  | "presentation"
  | "calendar-check"
  | "clipboard-check"
  | "chart-column"
  | "settings";

export interface DashboardModule {
  key: ModuleKey;
  href: string;
  label: string;
  description: string;
  icon: ModuleIconName;
  /** Roles that may open this module. Starting point; adjust to your policy. */
  roles: readonly Role[];
}

const ALL: readonly Role[] = ["super_admin", "institution_admin", "teacher", "student"];
const STAFF: readonly Role[] = ["super_admin", "institution_admin", "teacher"];
const ADMINS: readonly Role[] = ["super_admin", "institution_admin"];

export const DASHBOARD_MODULES: readonly DashboardModule[] = [
  { key: "overview", href: "/dashboard", label: "Overview", description: "Your portal at a glance.", icon: "layout-dashboard", roles: ALL },
  { key: "students", href: "/dashboard/students", label: "Students", description: "Profiles, admissions and academic records.", icon: "graduation-cap", roles: STAFF },
  { key: "teachers", href: "/dashboard/teachers", label: "Teachers", description: "Staff profiles and class assignments.", icon: "presentation", roles: ADMINS },
  { key: "attendance", href: "/dashboard/attendance", label: "Attendance", description: "Daily attendance records by class.", icon: "calendar-check", roles: ALL },
  { key: "examinations", href: "/dashboard/examinations", label: "Examinations", description: "Exams, marks, grades and report cards.", icon: "clipboard-check", roles: ALL },
  { key: "reports", href: "/dashboard/reports", label: "Reports", description: "Academic summaries and trends.", icon: "chart-column", roles: STAFF },
  { key: "settings", href: "/dashboard/settings", label: "Settings", description: "Institution and account settings.", icon: "settings", roles: ADMINS },
];

export function modulesForRole(role: Role) {
  return DASHBOARD_MODULES.filter((m) => m.roles.includes(role));
}

export function rolesFor(key: ModuleKey): readonly Role[] {
  return DASHBOARD_MODULES.find((m) => m.key === key)?.roles ?? [];
}
