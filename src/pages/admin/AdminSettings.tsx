import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [cowRate, setCowRate] = useState('45');
  const [buffaloRate, setBuffaloRate] = useState('65');

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Settings / सेटिंग्स</h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-4 shadow-card space-y-4">
        <h3 className="font-display font-bold text-sm">Milk Pricing / दूध मूल्य</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">🐄 Cow Rate (₹/L)</label>
            <Input value={cowRate} onChange={e => setCowRate(e.target.value)} type="number" className="h-12 rounded-xl text-lg" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">🐃 Buffalo Rate (₹/L)</label>
            <Input value={buffaloRate} onChange={e => setBuffaloRate(e.target.value)} type="number" className="h-12 rounded-xl text-lg" />
          </div>
        </div>
        <Button
          onClick={() => toast.success('Rates updated successfully!')}
          className="w-full h-12 rounded-xl font-display font-bold gradient-primary border-0"
        >
          Update Rates / दरें अपडेट करें
        </Button>
      </motion.div>
    </div>
  );
}
