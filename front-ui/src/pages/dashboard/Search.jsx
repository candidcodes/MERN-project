import { Loading, ProductSection } from "@/components"
import http from "@/http"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const Search = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const [query] = useSearchParams()

    useEffect(() => {
        setLoading(true)
        http.get(`/products/search?term=${query.get('term')}`)
            .then(({ data }) => {
                setProducts(data)
            })
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [query.get('term')])

    return loading ? 
        <Loading /> :
        <ProductSection title={`Search: ${query.get('term')}`} products={products} size="small"/>
        
}
