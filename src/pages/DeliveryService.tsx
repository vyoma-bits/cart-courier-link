import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Truck, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const DeliveryService = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');
  const customerEmail = searchParams.get('email');
  const customerName = searchParams.get('name');
  const paymentMethod = searchParams.get('payment_method');
  
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    if (!orderId || !amount) {
      navigate('/');
    }
  }, [orderId, amount, navigate]);

  const generateTrackingNumber = () => {
    return `DLV-${Date.now().toString().slice(-6)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!deliveryAddress.street || !deliveryAddress.city || !deliveryAddress.state || !deliveryAddress.postalCode) {
      toast({
        title: "Missing Address Information",
        description: "Please fill in all required address fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const tracking = generateTrackingNumber();
      setTrackingNumber(tracking);
      setIsSuccess(true);
      setIsProcessing(false);
      
      toast({
        title: "Payment Successful!",
        description: `Your order has been confirmed. Tracking: ${tracking}`,
      });
    }, 2000);
  };

  const handleReturnToStore = () => {
    navigate(`/order-confirmation?order_id=${orderId}&tracking=${trackingNumber}`);
  };

  if (!orderId || !amount) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/5 to-success/10 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been confirmed and will be delivered soon.
            </p>
            <div className="bg-success/10 p-4 rounded-lg mb-6">
              <p className="font-semibold">Tracking Number:</p>
              <p className="text-lg font-mono text-success">{trackingNumber}</p>
            </div>
            <Button onClick={handleReturnToStore} variant="gradient" className="w-full">
              Return to TechStore
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Truck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Express Delivery Service</h1>
          </div>
          <p className="text-muted-foreground">
            Complete your delivery address and payment to finalize your order
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Delivery & Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery & Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Delivery Address</h3>
                  <div>
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                      id="street"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, street: e.target.value})}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                        placeholder="NY"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={deliveryAddress.postalCode}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, postalCode: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={deliveryAddress.country}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, country: e.target.value})}
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Method
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Selected: {paymentMethod?.toUpperCase()} (Simulated for demo)
                  </p>
                </div>

                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Payment...' : `Confirm Payment - $${amount}`}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Order ID:</span>
                  <span className="font-mono text-sm">{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer:</span>
                  <span className="text-sm">{customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm">{customerEmail}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="text-xl font-bold text-primary">${amount}</span>
                </div>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-accent" />
                  Delivery Information
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery: 1-2 business days</li>
                  <li>• Free shipping on orders over $50</li>
                  <li>• Tracking number provided after confirmation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};