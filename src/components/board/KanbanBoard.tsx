"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import type { Application, ApplicationStatus } from "@/lib/types";
import { PIPELINE_STAGES } from "@/constants/pipeline";
import { KanbanColumn } from "@/components/board/KanbanColumn";
import { JobCard } from "@/components/board/JobCard";

interface KanbanBoardProps {
  applications: Application[];
  onCardClick: (application: Application) => void;
  onMoveStatus: (id: string, status: ApplicationStatus) => void;
}

export function KanbanBoard({
  applications,
  onCardClick,
  onMoveStatus,
}: KanbanBoardProps) {
  const [activeApplication, setActiveApplication] =
    useState<Application | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const app = applications.find((a) => a.id === event.active.id);
    setActiveApplication(app ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveApplication(null);
    if (!over) return;

    const activeApp = applications.find((a) => a.id === active.id);
    if (!activeApp) return;

    const overId = over.id as string;
    const isColumnId = PIPELINE_STAGES.some((stage) => stage.status === overId);
    const targetStatus = isColumnId
      ? (overId as ApplicationStatus)
      : applications.find((a) => a.id === overId)?.status;

    if (targetStatus && targetStatus !== activeApp.status) {
      onMoveStatus(activeApp.id, targetStatus);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => (
          <KanbanColumn
            key={stage.status}
            stage={stage}
            applications={applications.filter(
              (app) => app.status === stage.status,
            )}
            onCardClick={onCardClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeApplication ? (
          <JobCard application={activeApplication} onClick={() => {}} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
