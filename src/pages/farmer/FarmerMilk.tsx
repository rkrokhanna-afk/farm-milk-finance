import { milkEntries } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function FarmerMilk() {
  const { currentFarmerId } = useApp();
  const entries = milkEntries.filter(e => e.farmerId === currentFarmerId).slice(0, 30);

  const chartData = entries.slice(0, 14).reverse().map(e => ({
    date: e.date.slice(5),
    qty: e.quantity,
  }));

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Milk Records / दूध रिकॉर्ड</h2>

      <div className="bg-card rounded-2xl p-4 shadow-card">
        <h3 className="font-display font-bold text-sm mb-3">Supply Trend (14 days)</h3>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="qty" stroke="hsl(142, 55%, 35%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {entries.slice(0, 15).map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-card rounded-xl p-3 shadow-card flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold font-display">{e.date}</p>
              <p className="text-xs text-muted-foreground">{e.milkType} • Fat {e.fat}% • SNF {e.snf}%</p>
            </div>
            <div className="text-right">
              <p className="font-display font-bold">{e.quantity}L</p>
              <p className="text-xs text-primary font-semibold">₹{e.total.toFixed(0)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
