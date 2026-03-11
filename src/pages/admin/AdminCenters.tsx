import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

const centers = [
  { id: 'c1', name: 'Govindpur Center', village: 'Govindpur', farmers: 3, dailyAvg: 450 },
  { id: 'c2', name: 'Shivpur Center', village: 'Shivpur', farmers: 2, dailyAvg: 320 },
];

export default function AdminCenters() {
  return (
    <div className="space-y-5 animate-fade-in">
      <h2 className="text-xl font-display font-bold">Collection Centers / संग्रह केंद्र</h2>
      <div className="space-y-3">
        {centers.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-2xl p-4 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display font-bold">{c.name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" /> {c.village}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="font-bold">{c.farmers}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{c.dailyAvg}L/day avg</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
