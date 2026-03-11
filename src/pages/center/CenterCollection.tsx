import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { farmers } from '@/lib/mock-data';
import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function CenterCollection() {
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [milkType, setMilkType] = useState<'Cow' | 'Buffalo'>('Buffalo');
  const [quantity, setQuantity] = useState('');
  const [fat, setFat] = useState('');
  const [snf, setSnf] = useState('');
  const [rate, setRate] = useState(milkType === 'Buffalo' ? '65' : '45');

  const total = (parseFloat(quantity) || 0) * (parseFloat(rate) || 0);

  const handleSubmit = () => {
    if (!selectedFarmer || !quantity) return;
    toast.success(`Entry added: ${quantity}L from ${farmers.find(f => f.id === selectedFarmer)?.name} = ₹${total.toFixed(0)}`);
    setQuantity(''); setFat(''); setSnf('');
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Daily Collection / दैनिक संग्रह</h2>

      <div className="bg-card rounded-2xl p-4 shadow-card space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">Farmer / किसान</label>
          <select
            value={selectedFarmer}
            onChange={e => setSelectedFarmer(e.target.value)}
            className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm font-body"
          >
            <option value="">Select farmer...</option>
            {farmers.map(f => (
              <option key={f.id} value={f.id}>{f.name} - {f.village}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground block mb-1">Milk Type / दूध प्रकार</label>
          <div className="flex gap-2">
            {(['Cow', 'Buffalo'] as const).map(type => (
              <button
                key={type}
                onClick={() => { setMilkType(type); setRate(type === 'Buffalo' ? '65' : '45'); }}
                className={`flex-1 h-12 rounded-xl font-display font-bold text-sm border-2 transition-all ${
                  milkType === type
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {type === 'Cow' ? '🐄' : '🐃'} {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Quantity (L)</label>
            <Input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" className="h-12 rounded-xl text-lg" placeholder="0" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Rate (₹/L)</label>
            <Input value={rate} onChange={e => setRate(e.target.value)} type="number" className="h-12 rounded-xl text-lg" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Fat %</label>
            <Input value={fat} onChange={e => setFat(e.target.value)} type="number" className="h-12 rounded-xl" placeholder="0" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">SNF %</label>
            <Input value={snf} onChange={e => setSnf(e.target.value)} type="number" className="h-12 rounded-xl" placeholder="0" />
          </div>
        </div>

        {total > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gradient-primary rounded-xl p-4 text-center"
          >
            <p className="text-xs text-primary-foreground/80">Total Amount</p>
            <p className="text-3xl font-display font-black text-primary-foreground">₹{total.toFixed(0)}</p>
          </motion.div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!selectedFarmer || !quantity}
          className="w-full h-14 rounded-xl text-base font-display font-bold gradient-primary border-0"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Entry / प्रविष्टि जोड़ें
        </Button>
      </div>
    </div>
  );
}
