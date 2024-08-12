import { useEffect, useState } from "react"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import http from '@/http'
import { Loading } from "@/components"
import { Link } from "react-router-dom"
import { dtFormat } from "@/lib"

export const List = () => {
    const [staffs, setStaffs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        http.get('/cms/staffs')
            .then(({data}) => setStaffs(data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return <Container className="bg-white py-3 my-3 rounded-2 shadow-sm">
        {loading ? <Loading /> : <Row>
            <Col>
                <h1>Staff List</h1>
            </Col>
            <Col xs='auto'>
                <Link to='/staffs/create' className="btn btn-dark" >
                    <i className="fa-solid fa-plus me-2"></i>Add Staff
                </Link>
            </Col>
            <Col xs='12'>
                {staffs.length ? 
                <Table bordered striped hover size="sm">
                    <thead className="table-dark" >
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs.map((staff, i) => <tr key = {i}>
                            <td>{staff.name}</td>
                            <td>{staff.email}</td>
                            <td>{staff.address}</td>
                            <td>{staff.phone}</td>
                            <td>{staff.status ? 'active' : 'inactive'}</td>
                            <td>{dtFormat(staff.createdAt)}</td>
                            <td>{dtFormat(staff.updatedAt)}</td>
                            <td>
                                <Link to='' className="btn btn-dark btn-sm me-2">
                                    <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>
                                <Button size="sm" variant="danger">
                                    <i className="fa-solid fa-times me-2"></i>Delete
                                </Button>
                                
                            </td>
                            

                        </tr>)}
                    </tbody>
                </Table> : 
                <h5 className="text-muted">No data</h5>}
            </Col>
        </Row>

        }
    </Container>
}