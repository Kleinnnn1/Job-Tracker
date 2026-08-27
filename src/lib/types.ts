export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "offer_accepted"
  | "offer_declined"
  | "rejected"
  | "no_answer";

export interface Application {
  id: string;
  userId: string;
  company: string;
  jobTitle: string;
  status: ApplicationStatus;
  appliedDate: string;
  location?: string;
  notes?: string;
  isFavorite: boolean;
  jobUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type NewApplication = Omit<
  Application,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateApplication = Partial<Omit<Application, "id" | "userId">> & {
  id: string;
};
