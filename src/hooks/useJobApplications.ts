"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Application,
  NewApplication,
  UpdateApplication,
} from "@/lib/types";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { generateTempId } from "@/lib/utils";

interface UseJobApplicationsResult {
  applications: Application[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredApplications: Application[];
  addApplication: (newApp: NewApplication) => void;
  updateApplication: (update: UpdateApplication) => void;
  removeApplication: (id: string) => void;
  moveApplicationStatus: (id: string, status: Application["status"]) => void;
}

export function useJobApplications(): UseJobApplicationsResult {
  const [applications, setApplications] =
    useState<Application[]>(MOCK_APPLICATIONS);
  const [isLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addApplication = useCallback((newApp: NewApplication) => {
    const now = new Date().toISOString();
    const application: Application = {
      ...newApp,
      id: generateTempId(),
      createdAt: now,
      updatedAt: now,
    };
    setApplications((prev) => [application, ...prev]);
  }, []);

  const updateApplication = useCallback((update: UpdateApplication) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === update.id
          ? { ...app, ...update, updatedAt: new Date().toISOString() }
          : app,
      ),
    );
  }, []);

  const removeApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  const moveApplicationStatus = useCallback(
    (id: string, status: Application["status"]) => {
      updateApplication({ id, status });
    },
    [updateApplication],
  );

  const filteredApplications = useMemo(() => {
    if (!searchQuery.trim()) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter(
      (app) =>
        app.company.toLowerCase().includes(q) ||
        app.jobTitle.toLowerCase().includes(q) ||
        app.location?.toLowerCase().includes(q),
    );
  }, [applications, searchQuery]);

  return {
    applications,
    isLoading,
    searchQuery,
    setSearchQuery,
    filteredApplications,
    addApplication,
    updateApplication,
    removeApplication,
    moveApplicationStatus,
  };
}
