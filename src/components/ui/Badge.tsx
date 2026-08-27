import type { ReactNode } from "react";

const COLOR_CLASSES: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-800",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  gray: "bg-gray-100 text-gray-600",
};

interface BadgeProps {
  color: string;
  children: ReactNode;
}

export function Badge({ color, children }: BadgeProps) {
  const colorClass = COLOR_CLASSES[color] ?? COLOR_CLASSES.gray;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {children}
    </span>
  );
}
