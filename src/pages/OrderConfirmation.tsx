import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  
  const orderId = searchParams.get('order_id');
  const trackingNumber = searchParams.get('tracking');

  useEffect(() => {
    if (!orderId || !trackingNumber) {
      navigate('/');
      return;
    }
    
    // Clear cart after successful order
    dispatch({ type: 'CLEAR_CART' });
  }, [orderId, trackingNumber, navigate, dispatch]);

  if (!orderId || !trackingNumber) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 to-success/10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase! Your order has been successfully placed and confirmed.
            </p>
            
            <div className="bg-success/10 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order ID:</span>
                  <span className="font-mono text-primary">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tracking Number:</span>
                  <span className="font-mono text-success text-lg">{trackingNumber}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center justify-center gap-2">
                <Package className="h-5 w-5" />
                What's Next?
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Your order will be processed within 24 hours</li>
                <li>• Tracking updates will be sent to your email</li>
                <li>• Estimated delivery: 3-5 business days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/')} variant="gradient">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              <Button 
                onClick={() => alert(`Track your order with: ${trackingNumber}`)} 
                variant="outline"
              >
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};