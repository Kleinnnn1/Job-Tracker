import type { ApplicationStatus } from "@/lib/types";

export interface PipelineStage {
  status: ApplicationStatus;
  label: string;
  color: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    status: "applied",
    label: "Applied",
    color: "slate",
  },
  {
    status: "interviewing",
    label: "Interviewing",
    color: "blue",
  },
  {
    status: "no_answer",
    label: "No Answer",
    color: "amber",
  },
  {
    status: "rejected",
    label: "Rejected",
    color: "red",
  },
  {
    status: "offer_accepted",
    label: "Offer Accepted",
    color: "green",
  },
  {
    status: "offer_declined",
    label: "Offer Declined",
    color: "gray",
  },
];

export const STAGE_MAP: Record<ApplicationStatus, PipelineStage> =
  PIPELINE_STAGES.reduce(
    (acc, stage) => {
      acc[stage.status] = stage;
      return acc;
    },
    {} as Record<ApplicationStatus, PipelineStage>,
  );

export const ACTIVE_STATUSES: ApplicationStatus[] = ["applied", "interviewing"];
export const TERMINAL_STATUSES: ApplicationStatus[] = [
  "offer_accepted",
  "offer_declined",
  "rejected",
];
