import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"

export const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/profile/orders')
            .then(({ data }) => setOrders(data))
            .catch(() => {})
            .finally(() => setLoading(false))

    }, [])

    return loading ? <Loading /> : (
        <DataTable
            data={orders.map(order => {
                return {
                    'Details': <ul>
                        {order.details?.map(detail => <li key={detail._id}>
                            {detail.qty} x {detail.product?.name || <span className="text-danger">removed product</span>} @ Rs. {detail.price} = Rs. {detail.total}
                        </li>)}
                    </ul>,
                    'Status': order.status,
                    'Created At': dtFormat(order.createdAt),
                    'Updated At': dtFormat(order.updatedAt),
                };
            })}
        />
    );
    
}