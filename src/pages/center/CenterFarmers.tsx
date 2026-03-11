import { farmers, milkEntries } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { User, Phone } from 'lucide-react';

export default function CenterFarmers() {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Registered Farmers / पंजीकृत किसान</h2>

      <div className="space-y-3">
        {farmers.map((f, i) => {
          const monthEntries = milkEntries.filter(e => e.farmerId === f.id).slice(0, 30);
          const monthMilk = monthEntries.reduce((s, e) => s + e.quantity, 0);
          const monthIncome = monthEntries.reduce((s, e) => s + e.total, 0);

          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-card rounded-2xl p-4 shadow-card"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.village} • {f.milkType} • {f.cattleCount} cattle</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{f.mobile}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-display">{Math.round(monthMilk)}L</p>
                  <p className="text-[10px] text-primary font-semibold">₹{Math.round(monthIncome).toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">30d</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
