import { ReactNode } from "react";
import prisma from "../../../prisma/prisma";
import OrderTable from "../../components/order-table";
import { SectionContainer } from "tp-kit/components";

type Props = {
    children : ReactNode
}

export default async function OrderLayout({children} : Props) {

    const orders = await prisma.order.findMany();

    return (
        <>
        <SectionContainer >
            <div className="flex flex-col" style={{marginTop: '50px', marginLeft: '2rem', backgroundColor: 'white'}}>
            <OrderTable orders={orders}/>
            </div>
        </SectionContainer>
        {children}
        </>
    )
}