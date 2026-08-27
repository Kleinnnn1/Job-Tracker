"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Application } from "@/lib/types";
import type { PipelineStage } from "@/constants/pipeline";
import { JobCard } from "@/components/board/JobCard";

const HEADER_DOT_CLASSES: Record<string, string> = {
  slate: "bg-slate-400",
  blue: "bg-blue-400",
  amber: "bg-amber-400",
  red: "bg-red-400",
  green: "bg-green-400",
  gray: "bg-gray-400",
};

interface KanbanColumnProps {
  stage: PipelineStage;
  applications: Application[];
  onCardClick: (application: Application) => void;
}

export function KanbanColumn({
  stage,
  applications,
  onCardClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.status });
  const dotClass = HEADER_DOT_CLASSES[stage.color] ?? HEADER_DOT_CLASSES.gray;

  return (
    <div className="flex flex-col w-72 shrink-0">
      <div className="flex items-center gap-2 px-1 pb-3">
        <span
          className={`h-2 w-2 rounded-full ${dotClass}`}
          aria-hidden="true"
        />
        <h2 className="text-sm font-semibold text-slate-700">{stage.label}</h2>
        <span className="text-xs text-slate-400">{applications.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`
          flex flex-col gap-2 rounded-lg p-2 min-h-30 flex-1
          transition-colors duration-150
          ${isOver ? "bg-slate-100" : "bg-slate-50"}
        `}
      >
        <SortableContext
          items={applications.map((app) => app.id)}
          strategy={verticalListSortingStrategy}
        >
          {applications.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-xs text-slate-400 border border-dashed border-slate-200 rounded-lg">
              No applications yet
            </div>
          ) : (
            applications.map((app) => (
              <JobCard key={app.id} application={app} onClick={onCardClick} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}
