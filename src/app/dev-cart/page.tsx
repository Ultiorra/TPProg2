"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../../tp-kit/components/products/product-cart-line";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
import { addLine, useCart, updateLine, computeCartTotal,removeLine,clearCart } from "../../hooks/use-cart";
import { use, useEffect } from "react";
export default function DevCartPage() {
  const lines = useCart((state) => state.lines);
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={
              <Button variant="ghost" className="flex-1 !py-4" onClick={() => addLine(product)}
              >
                Ajouter au panier
              </Button>
            }
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
        {
          lines.map((line) => (
            <ProductCartLine
              key={line.product.id}
              product={line.product}
              qty={line.qty}
              onQtyChange={(quantity) => {
                line.qty = quantity;
                updateLine(line);
              } }
              onDelete={() => removeLine(line.product.id)}  
            />
          ))
          
        }
        <div className={` text-sm`}>
          <div className="flex flex-row gap-4 justify-between items-center mb-2">
            <h3 className="w-full">Total</h3>
            <span className="text-right"> {
              computeCartTotal(lines)
            }
            </span>
          </div>
          </div>
        

          <Button variant={"primary"} fullWidth>Commander</Button>

        
          

				<Button variant={"outline"} fullWidth onClick={() => clearCart()}>
        Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}