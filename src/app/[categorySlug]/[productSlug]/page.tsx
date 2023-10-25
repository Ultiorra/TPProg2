import { ProductFilters } from '../../../components/product-filters';
import {ProductList} from '../../../components/product-list';
import { ProductAttributesTable } from '../../../components/product-attributes-table';
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BreadCrumbs, Button, Heading, ProductCardLayout, ProductGridLayout, ProductRating, SectionContainer } from 'tp-kit/components';
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
const categories = PRODUCTS_CATEGORY_DATA;
import {NextPageProps} from "../../../types";
import { Metadata } from 'next';
import AddToCartButton from '../../../components/addToCartButton';
import {ProductsCategoryData,ProductData} from "tp-kit/types";  
import prisma from '../../../../prisma/prisma';
import cache from 'react'
import { getProduit } from '../../../utils/database';
type Props = {
  categorySlug : string
  productSlug : string
}

export async function generateMetadata({params} : NextPageProps<Props>) : Promise<Metadata> {
  const results = await getProduit(params.categorySlug, params.productSlug)
  const currentproduct = results[0]
  const currentcategory = results[1]

  if (!currentcategory) notFound();

  if (!currentproduct) notFound();

  return {
    title: currentproduct.name ,
    description: currentproduct.desc != "" ? currentproduct.desc : "Succombez pour notre " + currentproduct.name + " et commandez-le sur notre site !"
  }
}

export default async function Home({params} : NextPageProps<Props>) {
  const results = await getProduit(params.categorySlug, params.productSlug)
  const currentproduct = results[0]
  const currentcategories = results[1]

  if (!currentcategories) notFound();

  

  if (!currentproduct) notFound();
  return ( 
    <main>
      <BreadCrumbs
                items={[
                    {
                        label: 'Home',
                        url: '/',   
                    },
                    {
                        label: currentcategories.name,
                        url: `/${currentcategories.slug}`,
                    },
                    {
                        label: currentproduct.name,
                        url: `/${currentcategories.slug}/${currentproduct.slug}`,
                    },  
                ]}

            
        />
      <SectionContainer>
        <div className="flex flex-row">
          <Image src={currentproduct.img} width={500} height={500} alt='product image' />
          <div className="flex flex-col" style={{marginTop: '50px', marginLeft: '2rem'}}>
            <article className="prose lg:prose-xl"
                >
                  <h1 className="text-2xl font-bold">
                {currentproduct.name}
              </h1>
            </article>
            <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
              <ProductRating value={Math.random() *5 } size={24}/>
            </div>
            <p className="text-2xl font-bold" style={{marginTop: '2rem', marginBottom: '2rem'}}>
              {currentproduct.desc}
            </p>
            <div className="flex flex-row" style={{marginTop: '2rem', marginBottom: '2rem'}}>
              <p className="text-2xl font-bold">
                {currentproduct.price}€
              </p>
              <div className="flex flex-row" style={{marginLeft: '50rem'}}>
                <AddToCartButton product={currentproduct}/>
              </div>
            </div>
            <ProductAttributesTable data={[
                { label: "Intensité", rating: Math.random() *5  },
                { label: "Volupté", rating: Math.random() *5  },
                { label: "Amertume", rating: Math.random() *5  },
                { label: "Onctuosité", rating: Math.random() *5  },
                { label: "Instagramabilité", rating: Math.random() *5  },
              ]} />
        </div>
        </div>
        <Heading
                          as="h1"
                          size="md"
                          weight="bold"
                          >
                          Vous aimerez aussi:
                      </Heading>
        <ProductGridLayout products={
          currentcategories.products.filter(product => {
            return product.slug != params.productSlug
          })
        } 
        children={(producte : ProductData) => (
          <ProductCardLayout
          button={(<Button
                  variant="light"
              >
              Ajouter au panier
          </Button>)}
      product={{
          desc: producte.desc,
          id: producte.id,
          img: producte.img,
          name: producte.name,
          path: producte.path,
          price: producte.price,
          slug: producte.slug
      }}  
      />
        )}
        />
      </SectionContainer>
    </main>
  )
}