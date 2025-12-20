import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface DishItemProps {
  name: string;
  quantity: number;
  status: 'pending' | 'cooking' | 'smooth' | 'creaming' | 'completed';
  progress: number;
  icon: string;
  note?: string;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    barColor: 'bg-status-pending',
    textColor: 'text-status-pending',
  },
  cooking: {
    label: 'Cooking',
    barColor: 'bg-status-cooking',
    textColor: 'text-status-cooking',
  },
  smooth: {
    label: 'Smooth',
    barColor: 'bg-status-smooth',
    textColor: 'text-status-smooth',
  },
  creaming: {
    label: 'Creaming',
    barColor: 'bg-status-smooth',
    textColor: 'text-status-smooth',
  },
  completed: {
    label: 'Done',
    barColor: 'bg-status-completed',
    textColor: 'text-status-completed',
  },
};

export function DishItem({ name, quantity, status, progress, icon, note }: DishItemProps) {
  const config = statusConfig[status];

  return (
    <div className="group p-4 rounded-xl bg-secondary/50 hover:bg-secondary/80 transition-all duration-200 border border-border/50">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <span className="text-3xl">{icon}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h4 className="font-semibold text-foreground truncate">{name}</h4>
              <span className="text-muted-foreground font-medium">×{quantity}</span>
            </div>
            <span className={cn("text-xs font-semibold uppercase tracking-wider", config.textColor)}>
              {config.label}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className={cn("progress-fill", config.barColor)}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Special Note */}
          {note && (
            <div className="flex items-center gap-2 mt-2 text-destructive/80">
              <FileText className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{note}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
