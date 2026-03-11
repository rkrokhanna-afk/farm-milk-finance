import { milkEntries, weeklyMilkData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function CenterInventory() {
  const last7 = milkEntries.slice(0, 35);
  const cowTotal = last7.filter(e => e.milkType === 'Cow').reduce((s, e) => s + e.quantity, 0);
  const buffaloTotal = last7.filter(e => e.milkType === 'Buffalo').reduce((s, e) => s + e.quantity, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Inventory / सूची</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 shadow-card text-center">
          <p className="text-3xl mb-1">🐄</p>
          <p className="text-2xl font-display font-bold">{Math.round(cowTotal)}L</p>
          <p className="text-xs text-muted-foreground">Cow Milk (7d)</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card text-center">
          <p className="text-3xl mb-1">🐃</p>
          <p className="text-2xl font-display font-bold">{Math.round(buffaloTotal)}L</p>
          <p className="text-xs text-muted-foreground">Buffalo Milk (7d)</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Weekly Collection Trends</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyMilkData}>
            <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="cow" name="Cow" fill="hsl(142, 55%, 35%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="buffalo" name="Buffalo" fill="hsl(36, 80%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
