"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../../tp-kit/components/products/product-cart-line";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
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
            button={<Button variant={"ghost"} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
				<ProductCartLine
          product={products[0]}
          qty={1}
          onQtyChange={(quantity) => console.log(quantity)}
          onDelete={() => console.log("delete")}/>
        <ProductCartLine
          product={products[1]}
          qty={2}
          onQtyChange={(quantity) => console.log(quantity)}
          onDelete={() => console.log("delete")}/>
         <div className={` text-sm`}>
          <div className="flex flex-row gap-4 justify-between items-center mb-2">
            <h3 className="w-full">Total</h3>
            <span className="text-right"> {
              products[0].price * 1 + products[1].price * 2
            }
            </span>
          </div>
          </div>

          <Button variant={"primary"} fullWidth>Commander</Button>

        
          

				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}