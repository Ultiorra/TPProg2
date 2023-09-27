"use client";
import { ProductData } from "tp-kit/types";
import { addLine } from "../hooks/use-cart";
import { Button } from "tp-kit/components"; 
import { Loader } from '@mantine/core';

import { useState } from "react"; 

type Props = {
  product: ProductData;
};

export default function AddToCartButton({ product }: Props) {
  const [isLoading, setIsLoading] = useState(false); 
  const [variant, setVariant] = useState("primary");

  const handleAddToCart = async () => {
    setIsLoading(true); 
    setVariant("outline");
    await addLine(product);
    setIsLoading(false);
    setVariant("primary");
  };

  return (
    <Button
      variant= {variant}
      className={`flex-1 !py-4 ${isLoading ? "stroke-blue-500" : ""}`} 
      onClick={handleAddToCart}
      disabled={isLoading} 
    >
      {isLoading ? (
        <Loader size={24} color="blue" /> 
      ) : (
        "Ajouter au panier"
      )}
    </Button>
  );
}
