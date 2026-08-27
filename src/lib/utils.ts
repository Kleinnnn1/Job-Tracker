import type { Application, ApplicationStatus } from "@/lib/types";
import {
  STAGE_MAP,
  ACTIVE_STATUSES,
  TERMINAL_STATUSES,
} from "@/constants/pipeline";

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(isoDate: string): string {
  const date = new Date(isoDate);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];

  for (const [secondsInUnit, label] of intervals) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

export function getStatusLabel(status: ApplicationStatus): string {
  return STAGE_MAP[status].label;
}

export function getStatusColor(status: ApplicationStatus): string {
  return STAGE_MAP[status].color;
}

export function countByStatus(
  applications: Application[],
  status: ApplicationStatus,
): number {
  return applications.filter((app) => app.status === status).length;
}

export function countActive(applications: Application[]): number {
  return applications.filter((app) => ACTIVE_STATUSES.includes(app.status))
    .length;
}

export function countTerminal(applications: Application[]): number {
  return applications.filter((app) => TERMINAL_STATUSES.includes(app.status))
    .length;
}

export function getInterviewRate(applications: Application[]): number {
  if (applications.length === 0) return 0;
  const reachedInterview = applications.filter(
    (app) => app.status !== "applied" && app.status !== "no_answer",
  ).length;
  return Math.round((reachedInterview / applications.length) * 100);
}

export function getOfferRate(applications: Application[]): number {
  if (applications.length === 0) return 0;
  const offers = applications.filter(
    (app) => app.status === "offer_accepted" || app.status === "offer_declined",
  ).length;
  return Math.round((offers / applications.length) * 100);
}

export function generateTempId(): string {
  return `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
