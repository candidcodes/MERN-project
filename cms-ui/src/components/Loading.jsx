import { Col, Row } from "react-bootstrap"

export const Loading = () => {
    return <Row>
        <Col className="text-center">
            <i className="fas fa-refresh fa-spin me-2" ></i>Loading...
        </Col>
    </Row>
}