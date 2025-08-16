import { ShoppingCart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-soft border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Store className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TechStore
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className={location.pathname === '/' ? 'text-primary' : ''}
            >
              Products
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/about')}
              className={location.pathname === '/about' ? 'text-primary' : ''}
            >
              About
            </Button>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/cart')}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Cart</span>
              {totalItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};