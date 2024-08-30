import { DataTable, Loading } from "@/components"
import http from "@/http"
import { dtFormat } from "@/lib"
import { useEffect, useState } from "react"

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('/profile/reviews')
            .then(({ data }) => setReviews(data))
            .catch(() => {})
            .finally(() => setLoading(false))

    }, [])

    return loading ? <Loading /> : (
        <DataTable
            searchables={['Name', 'Email', 'Phone', 'Address']}
            sortables={['Name', 'Email', 'Phone', 'Address']}
            data={reviews.map(review => {
                return {
                    'Product': review.product?.name,
                    'Comment': review.comment,
                    'Rating': review.rating,
                    'Created At': dtFormat(review.createdAt),
                    'Updated At': dtFormat(review.updatedAt),
                };
            })}
        />
    );
    
    
}