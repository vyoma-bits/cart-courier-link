import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Premium Tech Products</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover the latest in technology with our curated collection of premium devices and accessories.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our carefully selected collection of high-quality tech products, 
              from the latest smartphones to professional-grade laptops.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};