import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { ProductList } from "../components/product-list";
import { Metadata } from "next";
import prisma from "../../prisma/prisma";
import { ProductsCategoryData } from "tp-kit/types";


export const metadata:Metadata = {
  title: `Page d’accueil - Starbucks`,
  description: "Commandez de délicieuses boissons préparées avec soin par nos baristas"
}

export default async function Home() {
  const categories =  await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  }) 
  
  return (<SectionContainer>
    <BreadCrumbs items={[
      {
        label: "Accueil",
        url: "/"
      }
    ]} />

    <ProductList categories={categories} showFilters />
  </SectionContainer>);
}
