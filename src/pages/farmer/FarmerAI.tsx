import { Brain, TrendingUp, AlertTriangle, Lightbulb, CheckCircle, Info } from 'lucide-react';
import { aiInsights, predictionData, farmers } from '@/lib/mock-data';
import { useApp } from '@/lib/app-context';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const insightIcons = {
  warning: AlertTriangle,
  tip: Lightbulb,
  success: CheckCircle,
  info: Info,
};
const insightColors = {
  warning: 'bg-warning/10 border-warning/30 text-warning',
  tip: 'bg-accent/10 border-accent/30 text-accent',
  success: 'bg-primary/10 border-primary/30 text-primary',
  info: 'bg-info/10 border-info/30 text-info',
};

export default function FarmerAI() {
  const { currentFarmerId } = useApp();
  const farmer = farmers.find(f => f.id === currentFarmerId)!;

  const scoreColor = farmer.creditScore >= 80 ? 'text-primary' : farmer.creditScore >= 60 ? 'text-warning' : 'text-destructive';
  const loanEligibility = Math.round(farmer.creditScore * 2500);

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-accent" />
        <h2 className="text-xl font-display font-bold">AI Insights / AI अंतर्दृष्टि</h2>
      </div>

      {/* Credit Score */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 shadow-card text-center"
      >
        <p className="text-sm font-display font-semibold mb-2">Farmer Credit Score</p>
        <div className="relative inline-flex items-center justify-center w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
            <circle
              cx="60" cy="60" r="50" fill="none"
              stroke={farmer.creditScore >= 80 ? 'hsl(142, 55%, 35%)' : farmer.creditScore >= 60 ? 'hsl(36, 80%, 55%)' : 'hsl(0, 72%, 51%)'}
              strokeWidth="10"
              strokeDasharray={`${farmer.creditScore * 3.14} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute">
            <p className={`text-3xl font-display font-black ${scoreColor}`}>{farmer.creditScore}</p>
            <p className="text-[10px] text-muted-foreground">/100</p>
          </div>
        </div>
        <p className="text-sm mt-2 text-muted-foreground">
          Estimated Loan Eligibility: <span className="font-bold text-foreground">₹{loanEligibility.toLocaleString()}</span>
        </p>
      </motion.div>

      {/* Predictions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-4 shadow-card"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-accent" />
          <h3 className="font-display font-bold text-sm">Milk Production Prediction</h3>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={predictionData}>
            <XAxis dataKey="period" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="predicted" radius={[6, 6, 0, 0]}>
              {predictionData.map((d, i) => (
                <Cell key={i} fill={d.actual !== null ? 'hsl(142, 55%, 35%)' : 'hsl(195, 70%, 45%)'} opacity={d.actual !== null ? 1 : 0.6} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Smart Insights */}
      <div className="space-y-2">
        <h3 className="font-display font-bold text-sm">Smart Recommendations</h3>
        {aiInsights.map((insight, i) => {
          const Icon = insightIcons[insight.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className={`flex items-start gap-3 p-3 rounded-xl border ${insightColors[insight.type]}`}
            >
              <Icon className="h-5 w-5 mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">{insight.message}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
