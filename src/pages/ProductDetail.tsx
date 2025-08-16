import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 py-16">
      <div className="container mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="text-muted-foreground ml-2">(4.8 out of 5)</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Premium build quality and materials</li>
                  <li>• Advanced technology and innovation</li>
                  <li>• Comprehensive warranty coverage</li>
                  <li>• Fast and reliable customer support</li>
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  handleAddToCart();
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};