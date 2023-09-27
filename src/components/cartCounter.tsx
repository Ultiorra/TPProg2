import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../tp-kit/components/products/product-cart-line";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
import { addLine, useCart, updateLine, computeCartTotal,removeLine,clearCart } from "../hooks/use-cart";
import { use, useEffect, useState } from "react";
export default function CartCounter() {
    console.log("render CartCounter");

    const count = useCart((state) => state.count);



    return (
       
            <h3 className="w-full">  { count } </h3>
    );



}