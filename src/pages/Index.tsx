import { useState, useMemo } from "react";
import { OrderCard } from "@/components/OrderCard";
import { TabButton } from "@/components/TabButton";
import { useLiveClock } from "@/hooks/useLiveClock";
import { Clock, CheckCircle2, UtensilsCrossed, RefreshCw, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kitchenBg from "@/assets/kitchen-bg.jpg";

type OrderStatus = 'pending' | 'cooking' | 'completed';
type FilterType = 'all' | OrderStatus;

interface Order {
  orderId: string;
  tables: string[];
  status: OrderStatus;
  createdAt: Date;
  estimatedTime?: string;
  dishes: {
    id: string;
    name: string;
    quantity: number;
    status: 'pending' | 'cooking' | 'smooth' | 'creaming' | 'completed';
    progress: number;
    icon: string;
    note?: string;
  }[];
}

const initialOrders: Order[] = [
  {
    orderId: "03",
    tables: ["Table 08", "Table Bar-2"],
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000), // 5 mins ago
    estimatedTime: "15 min",
    dishes: [
      { id: "1", name: "Salmon Sashimi", quantity: 2, status: "cooking", progress: 60, icon: "🍣" },
      { id: "2", name: "Wagyu Burger", quantity: 1, status: "pending", progress: 0, icon: "🍔", note: "No onions, Medium Rare" },
      { id: "3", name: "Truffle Ramen", quantity: 2, status: "smooth", progress: 80, icon: "🥢" },
    ],
  },
  {
    orderId: "04",
    tables: ["Table Bar-2"],
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60000), // 2 mins ago
    estimatedTime: "10 min",
    dishes: [
      { id: "4", name: "Spicy Tuna Roll", quantity: 1, status: "pending", progress: 0, icon: "🍣" },
      { id: "5", name: "Edamame", quantity: 1, status: "pending", progress: 0, icon: "🥢" },
    ],
  },
  {
    orderId: "05",
    tables: ["Table 12"],
    status: "cooking",
    createdAt: new Date(Date.now() - 12 * 60000), // 12 mins ago
    estimatedTime: "8 min",
    dishes: [
      { id: "6", name: "Caesar Salad", quantity: 1, status: "cooking", progress: 70, icon: "🥗" },
      { id: "7", name: "Grilled Lobster", quantity: 1, status: "cooking", progress: 55, icon: "🦞", note: "Extra butter sauce" },
    ],
  },
  {
    orderId: "06",
    tables: ["Table 05"],
    status: "cooking",
    createdAt: new Date(Date.now() - 8 * 60000), // 8 mins ago
    estimatedTime: "5 min",
    dishes: [
      { id: "8", name: "Miso Soup", quantity: 2, status: "smooth", progress: 90, icon: "🍜" },
      { id: "9", name: "Tempura Set", quantity: 1, status: "cooking", progress: 65, icon: "🍤" },
    ],
  },
  {
    orderId: "02",
    tables: ["Table 03"],
    status: "completed",
    createdAt: new Date(Date.now() - 25 * 60000), // 25 mins ago
    estimatedTime: "20 min",
    dishes: [
      { id: "10", name: "Steak Frites", quantity: 1, status: "completed", progress: 100, icon: "🥩" },
      { id: "11", name: "Red Wine", quantity: 2, status: "completed", progress: 100, icon: "🍷" },
    ],
  },
];

export default function Index() {
  const currentTime = useLiveClock();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  const stats = useMemo(() => ({
    active: orders.filter(o => o.status !== 'completed').length,
    pending: orders.filter(o => o.status === 'pending').length,
    cooking: orders.filter(o => o.status === 'cooking').length,
    completed: orders.filter(o => o.status === 'completed').length,
  }), [orders]);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'all') {
      return orders.filter(o => o.status !== 'completed');
    }
    return orders.filter(o => o.status === activeFilter);
  }, [orders, activeFilter]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleRefresh = () => {
    // Simulate refresh - in real app would fetch from server
    setOrders([...initialOrders]);
    setActiveFilter('all');
  };

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentOrderIndex(0);
  };

  const handlePrevOrder = () => {
    setCurrentOrderIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextOrder = () => {
    setCurrentOrderIndex(prev => Math.min(filteredOrders.length - 1, prev + 1));
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${kitchenBg})` }}
      >
        <div className="absolute inset-0 bg-background/92 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <header className="shrink-0 px-4 lg:px-6 py-4 border-b border-border/50 bg-card/30 backdrop-blur-md">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-serif font-bold text-foreground">
                  Kitchen Display
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 text-foreground bg-card/50 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-lg font-bold tabular-nums">{currentTime}</span>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="shrink-0 px-4 lg:px-6 py-3 border-b border-border/30 bg-card/20 backdrop-blur-sm">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg">
              <TabButton
                label="All"
                count={stats.active}
                isActive={activeFilter === 'all'}
                onClick={() => handleFilterClick('all')}
                status="all"
              />
              <TabButton
                label="Pending"
                count={stats.pending}
                isActive={activeFilter === 'pending'}
                onClick={() => handleFilterClick('pending')}
                status="pending"
              />
              <TabButton
                label="In Progress"
                count={stats.cooking}
                isActive={activeFilter === 'cooking'}
                onClick={() => handleFilterClick('cooking')}
                status="cooking"
              />
              <TabButton
                label="Completed"
                count={stats.completed}
                isActive={activeFilter === 'completed'}
                onClick={() => handleFilterClick('completed')}
                status="completed"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={soundEnabled ? "text-primary" : "text-muted-foreground"}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Orders Section Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-serif font-semibold text-foreground">
                {activeFilter === 'all' ? 'Active Orders' : 
                 activeFilter === 'pending' ? 'Pending Orders' :
                 activeFilter === 'cooking' ? 'Orders In Progress' : 'Completed Orders'}
                <span className="ml-2 text-muted-foreground text-sm font-normal">
                  ({filteredOrders.length})
                </span>
              </h2>

              {/* Navigation Arrows */}
              {filteredOrders.length > 2 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevOrder}
                    disabled={currentOrderIndex === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {currentOrderIndex + 1}-{Math.min(currentOrderIndex + 2, filteredOrders.length)} / {filteredOrders.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextOrder}
                    disabled={currentOrderIndex >= filteredOrders.length - 2}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Orders Grid */}
            {filteredOrders.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {filteredOrders.map((order, index) => (
                  <div
                    key={order.orderId}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-fade-in"
                  >
                    <OrderCard
                      {...order}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No orders in this category</p>
                <p className="text-sm">All caught up! 🎉</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
