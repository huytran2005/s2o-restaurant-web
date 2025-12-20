import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  status: 'active' | 'pending' | 'cooking' | 'completed';
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const statusStyles = {
  active: {
    border: 'border-primary/50',
    glow: 'glow-pending animate-pulse-glow',
    iconBg: 'bg-primary/20',
    iconColor: 'text-primary',
    activeBorder: 'ring-2 ring-primary ring-offset-2 ring-offset-background',
  },
  pending: {
    border: 'border-status-pending/50',
    glow: '',
    iconBg: 'bg-status-pending/20',
    iconColor: 'text-status-pending',
    activeBorder: 'ring-2 ring-status-pending ring-offset-2 ring-offset-background',
  },
  cooking: {
    border: 'border-status-cooking/50',
    glow: 'glow-cooking',
    iconBg: 'bg-status-cooking/20',
    iconColor: 'text-status-cooking',
    activeBorder: 'ring-2 ring-status-cooking ring-offset-2 ring-offset-background',
  },
  completed: {
    border: 'border-status-completed/50',
    glow: '',
    iconBg: 'bg-status-completed/20',
    iconColor: 'text-status-completed',
    activeBorder: 'ring-2 ring-status-completed ring-offset-2 ring-offset-background',
  },
};

export function StatCard({ title, value, status, icon, isActive, onClick }: StatCardProps) {
  const styles = statusStyles[status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "stat-card border-2 animate-fade-in w-full text-left transition-all duration-200",
        "hover:scale-[1.02] hover:shadow-lg cursor-pointer",
        styles.border,
        styles.glow,
        isActive && styles.activeBorder
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-3xl font-serif font-bold text-foreground">
            {value}
          </p>
        </div>
        <div className={cn("p-2.5 rounded-xl", styles.iconBg)}>
          <div className={cn("w-5 h-5", styles.iconColor)}>
            {icon}
          </div>
        </div>
      </div>
    </button>
  );
}
