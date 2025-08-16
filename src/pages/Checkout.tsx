import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const Checkout = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = state.total + 9.99 + (state.total * 0.08);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    
    // Simulate redirecting to delivery service provider
    const deliveryServiceUrl = `/delivery-service/payment?order_id=${orderId}&amount=${total.toFixed(2)}&email=${customerDetails.email}&name=${customerDetails.name}&payment_method=${paymentMethod}`;
    
    toast({
      title: "Redirecting to Delivery Service",
      description: "Please complete your delivery and payment details.",
    });
    
    // Redirect to delivery service provider
    setTimeout(() => {
      navigate(deliveryServiceUrl);
    }, 1500);
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                    placeholder="Enter your phone number"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="h-5 w-5 text-primary" />
                    <Label htmlFor="upi" className="flex-1">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Banknote className="h-5 w-5 text-primary" />
                    <Label htmlFor="paypal" className="flex-1">PayPal</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <hr />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$9.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(state.total * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <Button type="submit" variant="gradient" className="w-full" size="lg">
                    Proceed to Payment & Delivery
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};