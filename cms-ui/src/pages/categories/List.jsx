import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from '@/http'
import { DataTable, Loading } from "@/components"
import { Link } from "react-router-dom"
import { dtFormat } from "@/lib"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        http.get('/cms/category')
            .then(({data}) => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete category record?',
            buttons: [
            {
                label: 'Yes',
                className: 'text-bg-danger',
                onClick: () => {
                    setLoading(true)
                    http.delete(`cms/category/${id}`)
                        .then(() => http.get('cms/category'))
                        .then(({ data }) => setCategories(data))
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
                <h1>Category List</h1>
            </Col>
            <Col xs='auto'>
                <Link to='/categories/create' className="btn btn-dark" >
                    <i className="fa-solid fa-plus me-2"></i>Add Category
                </Link>
            </Col>
            <Col xs='12'>
                <DataTable searchables={['Name']} sortables={['Name']} data={categories.map(category => {
                    return {
                        'Name': category.name,
                        'Status': category.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(category.createdAt),
                        'Updated At': dtFormat(category.updatedAt),
                        'Actions': <>
                            <Link to={`/categories/${category._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-edit me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(category._id)}>
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