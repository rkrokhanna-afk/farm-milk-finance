import { Droplets, Users, IndianRupee, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { milkEntries, farmers, payments, monthlyIncomeData } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function AdminHome() {
  const totalMilk = milkEntries.reduce((s, e) => s + e.quantity, 0);
  const totalEarnings = milkEntries.reduce((s, e) => s + e.total, 0);
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Admin Dashboard / प्रशासन</h2>

      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Total Milk" value={`${Math.round(totalMilk).toLocaleString()}L`} icon={Droplets} variant="primary" delay={0} />
        <StatCard title="Active Farmers" value={`${farmers.length}`} icon={Users} variant="accent" delay={0.1} />
        <StatCard title="Total Earnings" value={`₹${Math.round(totalEarnings).toLocaleString()}`} icon={IndianRupee} variant="secondary" delay={0.2} />
        <StatCard title="Payments Made" value={`₹${Math.round(totalPaid).toLocaleString()}`} icon={TrendingUp} variant="default" delay={0.3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={monthlyIncomeData}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 55%, 35%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 55%, 35%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Revenue']} />
            <Area type="monotone" dataKey="income" stroke="hsl(142, 55%, 35%)" fill="url(#incomeGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Top Farmers</h3>
        {farmers.sort((a, b) => b.creditScore - a.creditScore).slice(0, 5).map((f, i) => (
          <div key={f.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground w-5">#{i + 1}</span>
              <div>
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-[10px] text-muted-foreground">{f.village}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">{f.creditScore}/100</p>
              <p className="text-[10px] text-muted-foreground">Credit Score</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
