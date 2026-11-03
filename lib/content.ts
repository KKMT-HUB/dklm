import {
  BookOpen,
  Building2,
  CalendarCheck,
  ChartColumn,
  ClipboardCheck,
  Clock,
  Eye,
  FolderOpen,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  MousePointerClick,
  Presentation,
  Smartphone,
  Target,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export interface ContentItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const aboutCards: ContentItem[] = [
  { title: "Our Vision", description: "To build a connected and digitally empowered Islamic education community.", icon: Eye },
  { title: "Our Mission", description: "To simplify educational activities through accessible, efficient, and innovative technology.", icon: Target },
  { title: "Our Commitment", description: "To provide a reliable, user-friendly digital experience that supports educational growth.", icon: Handshake },
];

export const services: ContentItem[] = [
  { title: "Madrasa Management", description: "Manage madrasa information, classes, students, and teachers.", icon: Building2 },
  { title: "Student Management", description: "Organize student profiles, admissions, and academic records.", icon: GraduationCap },
  { title: "Teacher Portal", description: "Provide teachers with easy access to educational tools and assigned responsibilities.", icon: Presentation },
  { title: "Attendance Management", description: "Maintain and manage attendance records.", icon: CalendarCheck },
  { title: "Examination Management", description: "Organize examinations, marks, grades, and academic reports.", icon: ClipboardCheck },
  { title: "Digital Learning", description: "Support digital learning resources and educational activities.", icon: BookOpen },
  { title: "Reports & Analytics", description: "Present useful academic information through clear dashboards.", icon: ChartColumn },
  { title: "Administrative Tools", description: "Simplify daily administrative operations.", icon: Wrench },
];

export const benefits: ContentItem[] = [
  { title: "Easy-to-use interface", description: "Clear screens that teachers and staff can learn in minutes.", icon: MousePointerClick },
  { title: "Centralized educational management", description: "Classes, students and staff managed from one place.", icon: LayoutDashboard },
  { title: "Time-saving digital workflows", description: "Less paperwork for attendance, marks and records.", icon: Clock },
  { title: "Accessible across devices", description: "Works on phones, tablets and computers.", icon: Smartphone },
  { title: "Organized academic information", description: "Records stay structured and easy to find.", icon: FolderOpen },
  { title: "Scalable platform for educational institutions", description: "Grows from a single madrasa to many institutions.", icon: TrendingUp },
];

export const footerServiceLinks = [
  "Madrasa Management",
  "Student Management",
  "Attendance Management",
  "Examination Management",
  "Reports & Analytics",
];
