import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
  delay?: number;
}

const variantClasses = {
  primary: 'gradient-primary text-primary-foreground',
  secondary: 'gradient-secondary text-secondary-foreground',
  accent: 'gradient-accent text-accent-foreground',
  default: 'bg-card text-card-foreground shadow-card',
};

export default function StatCard({ title, value, subtitle, icon: Icon, variant = 'default', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={cn(
        "rounded-2xl p-4 relative overflow-hidden",
        variantClasses[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-xs font-medium opacity-80")}>{title}</p>
          <p className="text-2xl font-display font-bold">{value}</p>
          {subtitle && <p className="text-xs opacity-70">{subtitle}</p>}
        </div>
        <div className={cn("p-2 rounded-xl", variant === 'default' ? 'bg-primary/10' : 'bg-white/20')}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
