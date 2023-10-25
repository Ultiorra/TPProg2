import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductList } from "../../components/product-list";
import { NextPageProps } from "../../types";
import { Metadata } from "next";
import prisma from "../../../prisma/prisma";
import { ProductsCategoryData } from "tp-kit/types";
import { notFound } from "next/navigation";
import { getCategory } from "../../utils/database";


const categoryCache: { [categorySlug: string]: ProductsCategoryData | null } = {};
type Props = {
  categorySlug: string;
};

export async function generateMetadata({ params, searchParams} : NextPageProps<Props>) : Promise<Metadata> {
  const category = await getCategory(params.categorySlug)
  return {
    title: category?.name || "Page d’accueil - Starbucks",
    description: `Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits ${category.name}`
  }
}

export default async function CategoryPage({params}: NextPageProps<Props>) {
  const category = await getCategory(params.categorySlug)
  if (!category) {
    return notFound()
  }
  return <SectionContainer>
    <BreadCrumbs 
      items={[
        {
          label: "Accueil",
          url: "/"
        },
        {
          label: category.name,
          url: `/${category.slug}`
        }
      ]}
    />

    <ProductList categories={[category]} />
  </SectionContainer>
}