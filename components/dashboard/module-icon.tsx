import {
  CalendarCheck,
  ChartColumn,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Presentation,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { ModuleIconName } from "@/lib/roles";

const icons: Record<ModuleIconName, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "graduation-cap": GraduationCap,
  presentation: Presentation,
  "calendar-check": CalendarCheck,
  "clipboard-check": ClipboardCheck,
  "chart-column": ChartColumn,
  settings: Settings,
};

export function ModuleIcon({ name, className }: { name: ModuleIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
