"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../../tp-kit/components/products/product-cart-line";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
import { addLine, useCart, updateLine, computeCartTotal,removeLine,clearCart } from "../../hooks/use-cart";
import { use, useEffect } from "react";
import  Cart  from "../../components/cart";
import CartCounter from "../../components/cartCounter";
import AddToCartButton from "../../components/addToCartButton";
export default function DevCartPage() {
  console.log("render DevCartPage");
  //Je constate qu'il y'a un render à chaque fois que je clique sur un des boutons/ a chaque fois que je modifie le panier
 
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
      <CartCounter/>
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={
              <AddToCartButton
                product={product}
              />
            }
          />
        ))}
      </section>

      <Cart/>

    </SectionContainer>
  );
}