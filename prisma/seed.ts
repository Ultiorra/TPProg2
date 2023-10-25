import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
async function main() {
    
    for (const category of PRODUCTS_CATEGORY_DATA) {
        const newCategory = await prisma.productCategory.create({
            data: {
                id: category.id as number,
                name: category.name,
                slug: category.slug,
            } 
        })
        for( const product of category.products){
            const newProduct = await prisma.product.create({
                data: {
                    id: product.id as number,
                    name: product.name,
                    slug: product.slug,
                    desc: product.desc,
                    price: product.price,
                    categoryId: category.id,
                    img: product.img,
                    path: product.path,
                },
            })
        }

    }

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })