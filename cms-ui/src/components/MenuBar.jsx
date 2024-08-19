import { removeStorage } from "@/lib"
import { clearUser } from "@/store"
import { Container, Navbar, Nav, NavDropdown, Dropdown, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"

export const MenuBar = () => {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()


    const handleLogout = () => {
        removeStorage('430cmstoken')
        dispatch(clearUser())
        
    }

    return user && <Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container>
        <Link className="navbar-brand" to="/">Mern 430</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className= "me-auto">
                {user.role == 'Admin' && <Nav.Item>
                    <NavLink className="nav-link" to="/staffs">
                        <i className="fa-solid fa-clipboard-user me-2"></i>Staffs</NavLink>
                </Nav.Item>}
                {user.role != 'customer'  && <>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/customers">
                            <i className="fa-solid fa-users me-2"></i>Customers</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/categories">
                            <i className="fa-solid fa-list me-2"></i>Categories</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/brands">
                            <i className="fa-solid fa-star me-2"></i>Brands</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-link" to="/products">
                            <i className="fa-solid fa-gifts me-2"></i>Products</NavLink>
                    </Nav.Item>
                </> }
            </Nav>

            <Nav className="mb-lg-0 mb-2">
                <Nav.Item>
                    <NavDropdown title={<>
                            <i className="fas fa-user-circle me-2" />{user.name}
                        </>} align="end">
                        <Link className="dropdown-item" to='/profile/edit'>
                           <i className="fa-solid fa-user-edit me-2" ></i> Edit Profile
                        </Link>
                        <Link className="dropdown-item" to='/profile/password'>
                           <i className="fa-solid fa-asterisk me-2"></i> Change Password
                        </Link>
                        <Dropdown.Divider />
                        <Button variant="link" className="dropdown-item" onClick={handleLogout}>
                            <i className="fa-solid fa-arrow-right-from-bracket me-2"></i>Logout
                        </Button>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
}