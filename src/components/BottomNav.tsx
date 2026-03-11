import { Home, BarChart3, Wallet, Brain, Users, Package, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/app-context';
import { cn } from '@/lib/utils';

const farmerTabs = [
  { path: '/farmer', icon: Home, label: 'Home' },
  { path: '/farmer/milk', icon: Package, label: 'Milk' },
  { path: '/farmer/income', icon: Wallet, label: 'Income' },
  { path: '/farmer/ai', icon: Brain, label: 'AI' },
];

const centerTabs = [
  { path: '/center', icon: Home, label: 'Home' },
  { path: '/center/collection', icon: Package, label: 'Collect' },
  { path: '/center/farmers', icon: Users, label: 'Farmers' },
  { path: '/center/inventory', icon: BarChart3, label: 'Stock' },
];

const adminTabs = [
  { path: '/admin', icon: Home, label: 'Home' },
  { path: '/admin/centers', icon: Package, label: 'Centers' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function BottomNav() {
  const { role } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = role === 'farmer' ? farmerTabs : role === 'center' ? centerTabs : adminTabs;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[60px]",
                active
                  ? "text-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className={cn("h-5 w-5", active && "drop-shadow-sm")} />
              <span className="text-[10px] font-semibold font-display">{tab.label}</span>
              {active && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
