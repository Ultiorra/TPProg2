import { NextResponse } from "next/server"
import prisma from "../../../../prisma/prisma"



export async function GET(req : Request) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search')
    const cat = searchParams.getAll('cat')

    let result
    
    if (cat.length > 0 && search != null) {
        result = await prisma.productCategory.findMany({
            include: {
                products: {
                    where: {
                        slug: {
                            contains: search,
                            mode:"insensitive"
                        }
                    }
                }
            },
            where: {
                slug: {
                    in: cat
                }
            }
        })
    } else if (cat.length > 0) {
        result = await prisma.productCategory.findMany({
            include: {
                products:true
            },
            where: {
                slug: {
                    in: cat
                }
            }
        })
    } else if (search != null) {
        result = await prisma.productCategory.findMany({
            include: {
                products: {
                    where: {
                        slug: {
                            contains: search,
                            mode:"insensitive"
                        }
                    }
                }
            }
        })
    } else {
        result = await prisma.productCategory.findMany({
            include:{
                products:true
            }
        })
    }

    return NextResponse.json(
        {
            params:{
                categoriesSlugs:cat,
                search:search
            },
            categories:result
        })
}