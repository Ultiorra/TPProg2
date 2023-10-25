import { cache } from "react"
import prisma from "../../prisma/prisma"

export const getCategory = cache (
    async (categorySlug: string) => {


        console.log("categoryCache")
        const category = await prisma.productCategory.findFirst({
          where: {
            slug: categorySlug
          },
          include: {
            products: true,
          },
        })  

      
        return category
      }
      
)

export const getProduit = cache (
    async (categorySlug: string, productSlug: string) => {
        const category = await prisma.productCategory.findFirst({
          where: {
            slug: categorySlug
          },
          include: {
            products: 
            {
              where: {
                slug: {not : productSlug}
              }
            },
      
          },
        })
       if(!category) return [null, null]
        const produit = await prisma.product.findFirst({
          where: {
            slug: productSlug,
            categoryId: category.id
          }
        })  
       
       
        return [produit, category]
      }
) 