import { Droplets, IndianRupee, TrendingUp, Award } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { milkEntries, payments, farmers, monthlyIncomeData } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function FarmerHome() {
  const { currentFarmerId } = useApp();
  const farmer = farmers.find(f => f.id === currentFarmerId)!;
  const myEntries = milkEntries.filter(e => e.farmerId === currentFarmerId);
  const todayEntries = myEntries.filter(e => e.date === new Date().toISOString().split('T')[0]);
  const thisMonthEntries = myEntries.slice(0, 30);
  const totalMilk = thisMonthEntries.reduce((s, e) => s + e.quantity, 0);
  const totalIncome = thisMonthEntries.reduce((s, e) => s + e.total, 0);
  const pendingPayments = payments.filter(p => p.farmerId === currentFarmerId && p.status === 'Pending');
  const pendingAmount = pendingPayments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Namaste, {farmer.name.split(' ')[0]}! 🙏
        </h2>
        <p className="text-sm text-muted-foreground">{farmer.village} • {farmer.cattleCount} cattle</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Today's Milk" value={`${todayEntries.reduce((s, e) => s + e.quantity, 0).toFixed(1)}L`} icon={Droplets} variant="primary" delay={0} />
        <StatCard title="Monthly Income" value={`₹${Math.round(totalIncome).toLocaleString()}`} icon={IndianRupee} variant="secondary" delay={0.1} />
        <StatCard title="Total Milk (30d)" value={`${Math.round(totalMilk)}L`} icon={TrendingUp} variant="default" delay={0.2} />
        <StatCard title="Credit Score" value={`${farmer.creditScore}/100`} icon={Award} variant="accent" delay={0.3} />
      </div>

      {pendingAmount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-warning/10 border border-warning/30 rounded-2xl p-4"
        >
          <p className="text-sm font-semibold text-foreground">💰 Pending Payment</p>
          <p className="text-2xl font-display font-bold text-foreground">₹{pendingAmount.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{pendingPayments.length} payments pending</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <h3 className="font-display font-bold text-sm mb-3">Income Trend / आय रुझान</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyIncomeData}>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v / 1000}k`} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, 'Income']} />
            <Bar dataKey="income" fill="hsl(142, 55%, 35%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
