import { payments } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function FarmerIncome() {
  const { currentFarmerId } = useApp();
  const myPayments = payments.filter(p => p.farmerId === currentFarmerId);
  const paid = myPayments.filter(p => p.status === 'Paid');
  const pending = myPayments.filter(p => p.status === 'Pending');
  const totalPaid = paid.reduce((s, p) => s + p.amount, 0);
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Income & Payments / आय और भुगतान</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="gradient-primary rounded-2xl p-4">
          <p className="text-xs text-primary-foreground/80">Total Paid</p>
          <p className="text-2xl font-display font-bold text-primary-foreground">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="gradient-secondary rounded-2xl p-4">
          <p className="text-xs text-secondary-foreground/80">Pending</p>
          <p className="text-2xl font-display font-bold text-secondary-foreground">₹{totalPending.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-display font-bold text-sm">Payment History</h3>
        {myPayments.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bg-card rounded-xl p-3 shadow-card flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-semibold font-display">{p.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-display font-bold">₹{p.amount.toLocaleString()}</p>
              <span className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                p.status === 'Paid' ? 'bg-primary/15 text-primary' : 'bg-warning/15 text-warning'
              )}>
                {p.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
