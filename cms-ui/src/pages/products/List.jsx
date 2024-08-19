import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from '@/http'
import { DataTable, Loading } from "@/components"
import { Link } from "react-router-dom"
import { dtFormat, imgUrl } from "@/lib"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        http.get('/cms/product')
            .then(({data}) => setProducts(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete product record?',
            buttons: [
            {
                label: 'Yes',
                className: 'text-bg-danger',
                onClick: () => {
                    setLoading(true)
                    http.delete(`cms/product/${id}`)
                        .then(() => http.get('cms/product'))
                        .then(({ data }) => setProducts(data))
                        .catch(() => {})
                        .finally(() => setLoading(false))
                }
            },
            {
                label: 'No'
            }
        ]
        })
    }

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        {loading ? <Loading /> : <Row>
            <Col>
                <h1>Product List</h1>
            </Col>
            <Col xs='auto'>
                <Link to='/products/create' className="btn btn-dark" >
                    <i className="fa-solid fa-plus me-2"></i>Add Product
                </Link>
            </Col>
            <Col xs='12'>
                <DataTable searchables={['Name']} sortables={['Name']} data={products.map(product => {
                    return {
                        'Name': product.name,
                        'Image':<a href={imgUrl(product.images[0])} target="blank">
                                    <img className="img-sm" src={imgUrl(product.images[0])}></img>
                                </a>,
                        'Price': product.price,
                        'Dicounted': product.discountedPrice ?? 0,
                        'Brand': product.brand.name,
                        'Category': product.category.name,
                        'Status': product.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(product.createdAt),
                        'Updated At': dtFormat(product.updatedAt),
                        'Actions': <>
                            <Link to={`/products/${product._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-edit me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(product._id)}>
                                <i className="fa-solid fa-times me-2"></i>Delete
                            </Button>
                        </>

                    }
                })} />
            </Col>
        </Row>

        }
    </Container>
}