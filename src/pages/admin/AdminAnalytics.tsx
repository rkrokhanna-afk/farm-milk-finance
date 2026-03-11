import { weeklyMilkData, monthlyIncomeData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const pieData = [
  { name: 'Cow', value: 45 },
  { name: 'Buffalo', value: 55 },
];
const COLORS = ['hsl(142, 55%, 35%)', 'hsl(36, 80%, 55%)'];

export default function AdminAnalytics() {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Analytics / विश्लेषण</h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 shadow-card">
        <h3 className="font-display font-bold text-sm mb-3">Milk Type Distribution</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card rounded-2xl p-4 shadow-card">
        <h3 className="font-display font-bold text-sm mb-3">Weekly Collection</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyMilkData}>
            <XAxis dataKey="week" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="cow" name="Cow" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="buffalo" name="Buffalo" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
