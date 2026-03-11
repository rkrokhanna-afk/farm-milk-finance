import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/lib/app-context';
import { UserRole } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowRight, Milk, Users, Shield } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'role' | 'phone' | 'otp'>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { setRole, setIsLoggedIn } = useApp();
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('phone');
  };

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) setStep('otp');
  };

  const handleOtpSubmit = () => {
    if (otp.length >= 4 && selectedRole) {
      setRole(selectedRole);
      setIsLoggedIn(true);
      navigate(selectedRole === 'farmer' ? '/farmer' : selectedRole === 'center' ? '/center' : '/admin');
    }
  };

  const roles = [
    { id: 'farmer' as UserRole, icon: Milk, label: 'Farmer', sublabel: 'किसान', desc: 'Track milk & income' },
    { id: 'center' as UserRole, icon: Users, label: 'Collection Center', sublabel: 'संग्रह केंद्र', desc: 'Manage milk collection' },
    { id: 'admin' as UserRole, icon: Shield, label: 'Admin', sublabel: 'प्रशासक', desc: 'System management' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-6xl mb-3"
          >
            🥛
          </motion.div>
          <h1 className="text-3xl font-display font-black text-primary-foreground">DoodhBhandaar</h1>
          <p className="text-primary-foreground/70 text-sm mt-1 font-body">डिजिटल दूध प्रबंधन</p>
        </div>

        <div className="bg-card rounded-3xl p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div key="role" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                <p className="text-sm font-semibold text-foreground font-display mb-4">Select your role / अपनी भूमिका चुनें</p>
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleRoleSelect(r.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <r.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-display font-bold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.sublabel} • {r.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </motion.div>
            )}

            {step === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <button onClick={() => setStep('role')} className="text-xs text-muted-foreground hover:text-foreground">← Back</button>
                <p className="text-sm font-semibold font-display">Enter mobile number / मोबाइल नंबर दर्ज करें</p>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="9876543210"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-11 h-14 text-lg rounded-xl font-body"
                    maxLength={10}
                  />
                </div>
                <Button
                  onClick={handlePhoneSubmit}
                  disabled={phone.length < 10}
                  className="w-full h-14 rounded-xl text-base font-display font-bold gradient-primary border-0"
                >
                  Send OTP / OTP भेजें
                </Button>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <button onClick={() => setStep('phone')} className="text-xs text-muted-foreground hover:text-foreground">← Back</button>
                <p className="text-sm font-semibold font-display">Enter OTP / OTP दर्ज करें</p>
                <p className="text-xs text-muted-foreground">Sent to +91 {phone}</p>
                <Input
                  type="tel"
                  placeholder="1234"
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-14 text-2xl text-center tracking-[0.5em] rounded-xl font-body"
                  maxLength={6}
                />
                <Button
                  onClick={handleOtpSubmit}
                  disabled={otp.length < 4}
                  className="w-full h-14 rounded-xl text-base font-display font-bold gradient-primary border-0"
                >
                  Login / लॉगिन
                </Button>
                <p className="text-center text-xs text-muted-foreground">Demo: Enter any 4+ digits</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
