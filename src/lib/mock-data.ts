export type UserRole = 'farmer' | 'center' | 'admin';

export interface Farmer {
  id: string;
  name: string;
  village: string;
  mobile: string;
  cattleCount: number;
  milkType: 'Cow' | 'Buffalo' | 'Both';
  centerId: string;
  creditScore: number;
  upiId?: string;
  bankAccount?: string;
}

export interface MilkEntry {
  id: string;
  farmerId: string;
  farmerName: string;
  milkType: 'Cow' | 'Buffalo';
  quantity: number;
  fat: number;
  snf: number;
  rate: number;
  total: number;
  date: string;
}

export interface Payment {
  id: string;
  farmerId: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending';
}

export const farmers: Farmer[] = [
  { id: 'f1', name: 'Ramesh Kumar', village: 'Govindpur', mobile: '9876543210', cattleCount: 5, milkType: 'Buffalo', centerId: 'c1', creditScore: 82, upiId: 'ramesh@upi', bankAccount: '****4521' },
  { id: 'f2', name: 'Suresh Yadav', village: 'Laxmipur', mobile: '9876543211', cattleCount: 3, milkType: 'Cow', centerId: 'c1', creditScore: 74, upiId: 'suresh@upi' },
  { id: 'f3', name: 'Meena Devi', village: 'Rampur', mobile: '9876543212', cattleCount: 8, milkType: 'Both', centerId: 'c1', creditScore: 91 },
  { id: 'f4', name: 'Vijay Singh', village: 'Shivpur', mobile: '9876543213', cattleCount: 4, milkType: 'Buffalo', centerId: 'c2', creditScore: 68 },
  { id: 'f5', name: 'Lakshmi Bai', village: 'Govindpur', mobile: '9876543214', cattleCount: 6, milkType: 'Cow', centerId: 'c2', creditScore: 87 },
];

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return formatDate(d);
};

export const milkEntries: MilkEntry[] = [];
for (let day = 0; day < 30; day++) {
  farmers.forEach(f => {
    const qty = Math.round((8 + Math.random() * 15) * 10) / 10;
    const fat = Math.round((3.5 + Math.random() * 3) * 10) / 10;
    const snf = Math.round((7.5 + Math.random() * 1.5) * 10) / 10;
    const type = f.milkType === 'Both' ? (Math.random() > 0.5 ? 'Buffalo' : 'Cow') : f.milkType;
    const rate = type === 'Buffalo' ? 60 + Math.round(Math.random() * 10) : 40 + Math.round(Math.random() * 10);
    milkEntries.push({
      id: `me-${f.id}-${day}`,
      farmerId: f.id,
      farmerName: f.name,
      milkType: type,
      quantity: qty,
      fat,
      snf,
      rate,
      total: Math.round(qty * rate * 100) / 100,
      date: daysAgo(day),
    });
  });
}

export const payments: Payment[] = [];
for (let week = 0; week < 8; week++) {
  farmers.forEach(f => {
    const weekEntries = milkEntries.filter(
      e => e.farmerId === f.id && 
      new Date(e.date) >= new Date(daysAgo((week + 1) * 7)) &&
      new Date(e.date) < new Date(daysAgo(week * 7))
    );
    const total = weekEntries.reduce((s, e) => s + e.total, 0);
    if (total > 0) {
      payments.push({
        id: `p-${f.id}-${week}`,
        farmerId: f.id,
        amount: Math.round(total),
        date: daysAgo(week * 7),
        status: week < 2 ? 'Pending' : 'Paid',
      });
    }
  });
}

export const weeklyMilkData = Array.from({ length: 12 }, (_, i) => ({
  week: `W${i + 1}`,
  cow: Math.round(200 + Math.random() * 100),
  buffalo: Math.round(300 + Math.random() * 150),
}));

export const monthlyIncomeData = [
  { month: 'Oct', income: 28000 },
  { month: 'Nov', income: 32000 },
  { month: 'Dec', income: 29500 },
  { month: 'Jan', income: 35000 },
  { month: 'Feb', income: 38000 },
  { month: 'Mar', income: 41000 },
];

export const aiInsights = [
  { type: 'warning' as const, message: 'Your milk production dropped 15% this month compared to last month.' },
  { type: 'tip' as const, message: 'You can increase earnings by supplying more buffalo milk — rates are 40% higher.' },
  { type: 'success' as const, message: 'Your income trend qualifies you for a dairy expansion loan of up to ₹2,00,000.' },
  { type: 'info' as const, message: 'Predicted milk production for next month: 480 liters based on your cattle and seasonal trends.' },
];

export const predictionData = [
  { period: 'This Week', predicted: 105, actual: 98 },
  { period: 'Next Week', predicted: 112, actual: null },
  { period: 'Week 3', predicted: 108, actual: null },
  { period: 'Week 4', predicted: 115, actual: null },
];
