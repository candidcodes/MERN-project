import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from '@/http'
import { DataTable, Loading } from "@/components"
import { Link } from "react-router-dom"
import { dtFormat } from "@/lib"
import { confirmAlert } from "react-confirm-alert"

export const List = () =>{
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        http.get('/cms/customer')
            .then(({data}) => setCustomers(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete customer record?',
            buttons: [
            {
                label: 'Yes',
                className: 'text-bg-danger',
                onClick: () => {
                    setLoading(true)
                    http.delete(`cms/customer/${id}`)
                        .then(() => http.get('cms/customer'))
                        .then(({ data }) => setCustomers(data))
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
                <h1>Customer List</h1>
            </Col>
            <Col xs='auto'>
                <Link to='/customers/create' className="btn btn-dark" >
                    <i className="fa-solid fa-plus me-2"></i>Add Staff
                </Link>
            </Col>
            <Col xs='12'>
                <DataTable searchables={['Name', 'Email', 'Phone', 'Address']} sortables={['Name', 'Email', 'Phone', 'Address']} data={customers.map(customer => {
                    return {
                        'Name': customer.name,
                        'Email': customer.email,
                        'Phone': customer.phone,
                        'Address': customer.address,
                        'Status': customer.status ? 'Active' : 'Inactive',
                        'Created At': dtFormat(customer.createdAt),
                        'Updated At': dtFormat(customer.updatedAt),
                        'Actions': <>
                            <Link to={`/customers/${customer._id}`} className="btn btn-dark btn-sm me-2">
                                <i className="fa-solid fa-edit me-2"></i>Edit
                            </Link>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(customer._id)}>
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