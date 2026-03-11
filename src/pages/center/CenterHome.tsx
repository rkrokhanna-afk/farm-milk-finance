import { Droplets, Users, IndianRupee, Package } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { milkEntries, farmers } from '@/lib/mock-data';
import { motion } from 'framer-motion';

export default function CenterHome() {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntries = milkEntries.filter(e => e.date === todayStr);
  const totalToday = todayEntries.reduce((s, e) => s + e.quantity, 0);
  const totalValue = todayEntries.reduce((s, e) => s + e.total, 0);
  const sentToDairy = Math.round(totalToday * 0.83);
  const remaining = Math.round(totalToday - sentToDairy);

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Collection Center / संग्रह केंद्र</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Today's Collection" value={`${totalToday.toFixed(0)}L`} icon={Droplets} variant="primary" delay={0} />
        <StatCard title="Active Farmers" value={`${farmers.length}`} icon={Users} variant="accent" delay={0.1} />
        <StatCard title="Sent to Dairy" value={`${sentToDairy}L`} icon={Package} variant="default" delay={0.2} />
        <StatCard title="Today's Value" value={`₹${Math.round(totalValue).toLocaleString()}`} icon={IndianRupee} variant="secondary" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Inventory Status</h3>
        <div className="space-y-3">
          {[
            { label: 'Total Collected', value: `${totalToday.toFixed(0)}L`, pct: 100 },
            { label: 'Sent to Dairy', value: `${sentToDairy}L`, pct: 83 },
            { label: 'Remaining', value: `${remaining}L`, pct: 17 },
          ].map((item, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  className="h-full gradient-primary rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Today's Entries</h3>
        <div className="space-y-2">
          {todayEntries.slice(0, 5).map(e => (
            <div key={e.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm font-semibold">{e.farmerName}</p>
                <p className="text-[10px] text-muted-foreground">{e.milkType} • Fat {e.fat}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">{e.quantity}L</p>
                <p className="text-[10px] text-primary">₹{e.total.toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
