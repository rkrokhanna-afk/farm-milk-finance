import { LogOut, Globe } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function TopBar() {
  const { role, setRole, setIsLoggedIn, language, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const roleLabel = role === 'farmer' ? '🐄 Farmer' : role === 'center' ? '🏪 Center' : '👑 Admin';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥛</span>
          <h1 className="font-display font-bold text-lg text-foreground">DoodhBhandaar</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
            {roleLabel}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
