import { useEffect, useState } from "react"
import { Col, Form, Row, Table } from "react-bootstrap"

export const DataTable = ({ data = [], searchables = []}) => {
    const [allData, setAllData] = useState([])
    const [term, setTerm] = useState('')
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        setAllData(data)
    }, [data])

    useEffect(()=> {
        if (term.length) {
            let temp = allData.filter(item => {
                for(let k of searchables){
                    if(item[k].toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }
                return false
            })
            setFiltered(temp)
        }else{
            setFiltered(allData)
        }
    }, [term, allData, searchables])

    return <Row>
        <Col sm="4" className="ms-auto mb-3">
            <Form.Control type="search" value={term} onChange={({target}) => setTerm(target.value)} placeholder="Search..."></Form.Control>
        </Col>
        <Col xs="12">
            {filtered.length ? 
                <Table striped hover bordered size="sm">
                    <thead className="table-dark">
                        <tr>
                            {Object.keys(filtered[0]).map((k, i) => <th key={i}>{k}</th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((item, i) => <tr key={i}>
                            {Object.values(item).map((value, j) => <td key={j}>{value}</td> )}
                        </tr> )}
                    </tbody>
                </Table> :
                <h4>No Staffs</h4>}
        </Col>
    </Row>
}