"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Application } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate, timeAgo, getStatusColor } from "@/lib/utils";

interface JobCardProps {
  application: Application;
  onClick: (application: Application) => void;
}

export function JobCard({ application, onClick }: JobCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: application.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(application)}
      className="
        cursor-grab active:cursor-grabbing
        rounded-lg border border-slate-200 bg-white p-3
        shadow-sm hover:shadow-md hover:border-slate-300
        transition-shadow duration-150
      "
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 leading-snug">
          {application.jobTitle}
        </h3>
        {application.isFavorite && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-amber-400"
            aria-label="Favorite"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L10 18.354l-4.627 2.822c-.997.608-2.231-.29-1.961-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.083-5.006Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <p className="text-sm text-slate-600 mt-0.5">{application.company}</p>

      <div className="flex items-center justify-between mt-3">
        <Badge color={getStatusColor(application.status)}>
          {formatDate(application.appliedDate)}
        </Badge>
        <span className="text-xs text-slate-400">
          {timeAgo(application.updatedAt)}
        </span>
      </div>

      {application.location && (
        <p className="text-xs text-slate-400 mt-2 truncate">
          {application.location}
        </p>
      )}
    </div>
  );
}
