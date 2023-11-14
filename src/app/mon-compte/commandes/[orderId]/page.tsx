import { notFound, useRouter } from "next/navigation";
import { OrderDetailsLayout } from "tp-kit/components";
import prisma from "../../../../../prisma/prisma";
import { NextPageProps } from "../../../../types";

type Props = {
    orderId: number;
  };

export default async function CommandePage({params}: NextPageProps<Props>) {
    const orderId = params.orderId
    const order = await prisma.order.findUnique({
        include: {
            lines : {
                include : {
                    product : true
                }
            }
        },
        where: {
            id: +orderId
        }
    })
    if (!order) notFound();

    return (
        <OrderDetailsLayout order={order}/>
    )
}