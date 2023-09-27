import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, ProductCardLayout, SectionContainer } from "tp-kit/components";
import { ProductCartLine } from "../../tp-kit/components/products/product-cart-line";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);
import { addLine, useCart, updateLine, computeCartTotal,removeLine,clearCart } from "../hooks/use-cart";
import { use, useEffect, useState } from "react";
export default function CartCounter() {
    console.log("render CartCounter");

    const lines = useCart((state) => state.lines);
    const  [qtyCumul, setQtyCumul] = useState(0);

    useEffect(() => {
        let qtyCumul = 0;
        lines.forEach((line) => {
            qtyCumul += line.qty;
        });
        setQtyCumul(qtyCumul);
    }, [lines]);

    


    return (
       
            <h3 className="w-full">  { qtyCumul } </h3>
    );



}