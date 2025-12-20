import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DishItem } from "@/components/DishItem";
import { Play, CheckCircle, Clock, MapPin, Timer, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

interface Dish {
  id: string;
  name: string;
  quantity: number;
  status: 'pending' | 'cooking' | 'smooth' | 'creaming' | 'completed';
  progress: number;
  icon: string;
  note?: string;
}

interface OrderCardProps {
  orderId: string;
  tables: string[];
  status: 'pending' | 'cooking' | 'completed';
  dishes: Dish[];
  createdAt: Date;
  estimatedTime?: string;
  onStatusChange?: (orderId: string, newStatus: 'pending' | 'cooking' | 'completed') => void;
}

const statusConfig = {
  pending: {
    badge: 'status-pending',
    border: 'border-status-pending/30 animate-pulse-border',
    label: 'Pending',
    icon: Clock,
  },
  cooking: {
    badge: 'status-cooking',
    border: 'border-status-cooking/50 glow-cooking',
    label: 'In Progress',
    icon: Timer,
  },
  completed: {
    badge: 'status-completed',
    border: 'border-status-completed/30',
    label: 'Completed',
    icon: CheckCircle,
  },
};

function useTimeAgo(timestamp: Date) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);

  let timeAgo: string;
  if (diffMins < 1) {
    timeAgo = 'Just now';
  } else if (diffMins < 60) {
    timeAgo = `${diffMins}m ago`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours}h ago`;
  } else {
    timeAgo = 'Over a day';
  }

  const isUrgent = diffMins >= 10;
  return { timeAgo, isUrgent };
}

export function OrderCard({ orderId, tables, status, dishes, createdAt, estimatedTime, onStatusChange }: OrderCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;
  const { timeAgo, isUrgent } = useTimeAgo(createdAt);

  const handleStartOrder = () => {
    setCurrentStatus('cooking');
    onStatusChange?.(orderId, 'cooking');
  };

  const handleMarkReady = () => {
    setCurrentStatus('completed');
    onStatusChange?.(orderId, 'completed');
  };

  return (
    <div className={cn(
      "order-card border-2 p-5 animate-fade-in",
      config.border,
      isUrgent && currentStatus === 'pending' && "ring-2 ring-destructive/50"
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-xl font-serif font-bold text-foreground">
              #{orderId}
            </h2>
            {currentStatus === 'pending' && (
              <span className="text-lg">🔥</span>
            )}
            {isUrgent && currentStatus === 'pending' && (
              <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
            )}
          </div>

          {/* Tables */}
          <div className="flex items-center gap-3 text-muted-foreground">
            {tables.map((table, index) => (
              <div key={index} className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{table}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Badge */}
        <div className={cn("status-badge", config.badge)}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </div>
      </div>

      {/* Time Info */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md",
          isUrgent && currentStatus === 'pending' 
            ? "bg-destructive/20 text-destructive" 
            : "bg-muted/50 text-muted-foreground"
        )}>
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">{timeAgo}</span>
        </div>
        {estimatedTime && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Timer className="w-3.5 h-3.5" />
            <span>Est: <span className="text-foreground font-medium">{estimatedTime}</span></span>
          </div>
        )}
      </div>

      {/* Dishes */}
      <div className="space-y-2 mb-4">
        {dishes.map((dish) => (
          <DishItem
            key={dish.id}
            name={dish.name}
            quantity={dish.quantity}
            status={dish.status}
            progress={dish.progress}
            icon={dish.icon}
            note={dish.note}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {currentStatus === 'pending' && (
          <Button variant="start" size="default" onClick={handleStartOrder} className="flex-1">
            <Play className="w-4 h-4" />
            Start Order
          </Button>
        )}
        {currentStatus === 'cooking' && (
          <Button variant="ready" size="default" onClick={handleMarkReady} className="flex-1">
            <CheckCircle className="w-4 h-4" />
            Mark Ready
          </Button>
        )}
        {currentStatus === 'completed' && (
          <div className="flex items-center gap-2 text-status-completed w-full justify-center py-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold text-sm">Order Completed</span>
          </div>
        )}
      </div>
    </div>
  );
}
