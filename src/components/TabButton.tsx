import { cn } from "@/lib/utils";

interface TabButtonProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
  status?: 'all' | 'pending' | 'cooking' | 'completed';
}

const statusColors = {
  all: 'bg-primary',
  pending: 'bg-status-pending',
  cooking: 'bg-status-cooking',
  completed: 'bg-status-completed',
};

export function TabButton({ label, count, isActive, onClick, status = 'all' }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
        isActive
          ? "bg-card text-foreground shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-card/50"
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold",
            isActive
              ? cn(statusColors[status], "text-background")
              : "bg-muted text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
