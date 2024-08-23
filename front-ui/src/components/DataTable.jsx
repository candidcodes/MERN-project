import { useEffect, useState } from "react"
import { Col, Form, Pagination, Row, Table } from "react-bootstrap"

export const DataTable = ({ data = [], searchables = [], sortables = []}) => {
    // const [allData, setAllData] = useState([])
    const [term, setTerm] = useState('')
    const [filtered, setFiltered] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [direction, setDirection] = useState('desc')
    const [perPage, setPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [offset, setOffset] = useState(0)
    const [paginated, setPaginated] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageList, setPageList] = useState([])

    // useEffect(() => {
    //     setAllData(data)
    // }, [data])

    
    useEffect(()=> {
        if (term.length) {
            let temp = data.filter(item => {
                for(let k of searchables){
                    if(item[k].toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }
                return false
            })
            setFiltered(temp)
            setSortBy('')
            setCurrent(1)
        }else{
            setFiltered(data)
            setSortBy('')
            setCurrent(1)
        }
    }, [term, data, searchables])

    useEffect(() => {
        if (sortBy.length){


            let temp = [...filtered]
    
            temp.sort((a, b) => {
                if (isNaN(parseFloat(a[sortBy])) || isNaN(parseFloat(b[sortBy])) ) {
                    let x = a[sortBy].toLowerCase();
                    let y = b[sortBy].toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;
                }else{
                    return a[sortBy] - b[sortBy]
                }
                
            })
            if (direction == 'desc'){
                temp.reverse()
            }
    
            setFiltered(temp)
            setCurrent(1)
        }
        
    }, [sortBy, direction])
    
    useEffect(() => {
        let total = Math.ceil(filtered.length / perPage)
        let off = (current - 1) * perPage
        
        setTotalPages(total)
        setOffset(off)

    }, [filtered, perPage, current])

    useEffect(() => {
       let temp = [...filtered].splice(offset, perPage)

       setPaginated(temp)


    }, [offset, perPage, filtered])

    useEffect(() => {
        let links = []
        for(let i=1; i<=totalPages; i++){
            links.push(<Pagination.Item onClick={() => setCurrent(i)} key={i} active={current == i}>{i}</Pagination.Item>)
        }

        setPageList(links)
    }, [totalPages, current])

    const handleSort = k => {
        if (sortables.includes(k)) {
            if (k == sortBy) {
                setDirection(direction == 'asc' ? 'desc' : 'asc')
            }else{
                setSortBy(k)
                setDirection('desc')
            }
        }
    }

    return <Row>
        <Col sm="auto" className="mb-3">
            Per Page: <Form.Select value={perPage} onChange={({target}) => setPerPage(parseInt(target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Form.Select>
        </Col>
        <Col sm="4" className="ms-auto mb-3">
            <Form.Control type="search" value={term} onChange={({target}) => setTerm(target.value)} placeholder="Search..."></Form.Control>
        </Col>
        <Col xs="12">
            {paginated.length ? <>
                <Table striped hover bordered size="sm">
                    <thead className="table-dark">
                        <tr>

                            {Object.keys(paginated[0]).map((k, i) => (<th key={i} className={sortables.includes(k) && 'sortable'} onClick={() => handleSort(k)}>
                                {k}
                                {k == sortBy && <i className={`fa-solid fa-chevron-${direction == 'asc' ? 'up' : 'down'} ms-2`}></i>}
                            </th> ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((item, i) => <tr key={i}>
                            {Object.values(item).map((value, j) => <td key={j}>{value}</td> )  }
                        </tr> ) }
                    </tbody>
                </Table>
                {totalPages > 1 && <Pagination>
                        <Pagination.Prev onClick={() => setCurrent(current - 1)} disabled={current == 1}/>
                            {pageList.map(links=> links)}
                        <Pagination.Next onClick={() => setCurrent(current + 1)} disabled={current == totalPages}/>
                    </Pagination>}

            </> :
                <h4>No Data</h4>}
        </Col>
    </Row>
}