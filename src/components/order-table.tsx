"use client"
import { useState, useEffect } from "react"
import { OrderTableLayout } from "tp-kit/components"
import { useRouter } from "next/navigation"

type Props = {
    orders : any[]
}

// james lénégro

export default function OrderTable({orders} : Props) {

    const router = useRouter();

    return (
        <OrderTableLayout
        onRowClick={(order) => {
            console.log("hojoj")
            router.push(`/mon-compte/commandes/${order.id}`)
        }}
        orders={orders}
        />
    )


}