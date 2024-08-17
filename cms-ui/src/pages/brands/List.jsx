import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from '@/http'
import { DataTable, Loading } from "@/components"
import { Link } from "react-router-dom"
import { dtFormat } from "@/lib"
import { confirmAlert } from "react-confirm-alert"

export const List = () =>{
    const [brands, setBrands] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        http.get('/cms/brand')
            .then(({data}) => setBrands(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete brand record?',
            buttons: [
            {
                label: 'Yes',
                className: 'text-bg-danger',
                onClick: () => {
                    setLoading(true)
                    http.delete(`cms/brand/${id}`)
                        .then(() => http.get('cms/brand'))
                        .then(({ data }) => setBrands(data))
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
                <h1>Brand List</h1>
            </Col>
            <Col xs='auto'>
                <Link to='/brands/create' className="btn btn-dark" >
                    <i className="fa-solid fa-plus me-2"></i>Add Brand
                </Link>
            </Col>
            <Col xs='12'>
                <DataTable searchables={['Name']} sortables={['Name']} data={brands.map(brand => {
                    return {
                        'Name': brand.name,
                        'Status': brand.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(brand.createdAt),
                        'Updated At': dtFormat(brand.updatedAt),
                        'Actions': <>
                            <Link to={`/brands/${brand._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-edit me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(brand._id)}>
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