import http from "@/http";
import { fromStorage, removeStorage } from "@/lib";
import { clearUser, setUser } from "@/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Form, Nav, NavDropdown } from "react-bootstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { Loading } from ".";
import "./Layout.css";

export const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(true);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    Promise.all([
      http.get('/categories'),
      http.get('/brands')
    ])
    .then(([{data: cat}, {data: brand}]) => {
      setCategories(cat)
      setBrands(brand)
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(true);
      const token = fromStorage("430fronttoken");

      if (token) {
        http.get("/profile/detail")
          .then(({ data }) => {
            dispatch(setUser(data));
          })
          .catch(() => {
            removeStorage("430fronttoken");
          });
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = event => {
    event.preventDefault()
    navigate(`/search?term=${term}`)
  }
 

  const handleLogout = e => {
    e.preventDefault()

    removeStorage('430fronttoken')
    dispatch(clearUser())
  }

  useEffect(() => {
    if(cart){
      let tq = 0, tp = 0
      for (let id in cart){
        tq += cart[id].qty
        tp += cart[id].total
      }

      setTotalQty(tq)
      setTotalPrice(tp)

    }else{
      setTotalPrice(0)
      setTotalQty(0)
    }
  }, [cart])

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="container-fluid">
        <div className="row min-vh-100">
          <div className="col-12">
            <header className="row">
              <div className="col-12 bg-dark py-2 d-md-block d-none">
                <div className="row">
                  <div className="col-auto me-auto">
                    <ul className="top-nav">
                      <li>
                        <a href="tel:+123-456-7890">
                          <i className="fa fa-phone-square me-2"></i>+123-456-7890
                        </a>
                      </li>
                      <li>
                        <a href="mailto:mail@ecom.com">
                          <i className="fa fa-envelope me-2"></i>mail@ecom.com
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-auto">
                    {user ? <ul className="top-nav">
                      <li>
                        <Link to="profile">
                          <i className="fas fa-user-circle me-2"></i>{user.name}
                        </Link>
                      </li>
                      <li>
                        <a href="" onClick={handleLogout}>
                          <i className="fas fa-arrow-right-from-bracket me-2"></i>Logout
                        </a>
                      </li>
                    </ul> : <ul className="top-nav">
                      <li>
                        <Link to="/register">
                          <i className="fas fa-user-edit me-2"></i>Register
                        </Link>
                      </li>
                      <li>
                        <Link to="/login">
                          <i className="fas fa-sign-in-alt me-2"></i>Login
                        </Link>
                      </li>
                    </ul>}
                  </div>
                </div>
              </div>

              <div className="col-12 bg-white pt-4">
                <div className="row">
                  <div className="col-lg-auto">
                    <div className="site-logo text-center text-lg-left">
                      <Link to="/">Mern Store</Link>
                    </div>
                  </div>
                  <div className="col-lg-5 mx-auto mt-4 mt-lg-0">
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="search"
                            className="form-control border-dark"
                            placeholder="Search..."
                            onChange={({ target }) => setTerm(target.value)}
                            required
                          />
                          <button type="sumbit" className="btn btn-outline-dark">
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                  <div className="col-lg-auto text-center text-lg-left header-item-holder">
                    <a href="#" className="header-item">
                      <i className="fas fa-heart me-2"></i>
                      <span id="header-favorite">0</span>
                    </a>
                    <Link to="cart" className="header-item">
                      <i className="fas fa-shopping-bag me-2"></i>
                      <span id="header-qty" className="me-3">{totalQty}</span>
                      <i className="fas fa-money-bill-wave me-2"></i>
                      <span id="header-price">{totalPrice} </span>
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <nav className="navbar navbar-expand-lg navbar-light bg-white col-12">
                    <button
                      className="navbar-toggler d-lg-none border-0"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#mainNav"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mainNav">
                      <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                          <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                          </Link>
                        </li>
                        <Nav.Item>
                          <NavDropdown title="categories">
                            {categories.map(category => <Link to={`/categories/${category._id}`} key={category._id} className="dropdown-item">{category.name}</Link>)}
                          </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                          <NavDropdown title="brands">
                            {brands.map(brand => <Link key={brand._id} to={`/brands/${brand._id}`} className="dropdown-item">{brand.name}</Link>)}
                          </NavDropdown>
                        </Nav.Item>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </header>
          </div>

          <Outlet />

          <div className="col-12 align-self-end">
            <footer className="row bg-dark text-white py-5">
              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3">E-Commerce</h5>
                <address>
                  221B Baker Street<br />
                  London, England
                </address>
                <div className="mt-3">
                  <a href="#" className="social-icon me-2">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon me-2">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon me-2">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                  <a href="#" className="social-icon me-2">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="social-icon">
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3">Customer Care</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Terms and Conditions</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Returns and Exchanges</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Shipping and Delivery</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3">Information</h5>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Track My Order</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Careers</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Corporate Responsibility</a></li>
                  <li><a href="#" className="text-white text-decoration-none">Affiliate Program</a></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 mb-4">
                <h5 className="mb-3">Newsletter</h5>
                <form action="#">
                  <div className="input-group">
                    <input type="email" className="form-control" placeholder="Email Address" aria-label="Email Address" required />
                    <button className="btn btn-primary" type="submit">Subscribe</button>
                  </div>
                  <small className="form-text text-white mt-2">Get the latest news and updates.</small>
                </form>
              </div>

              <div className="col-12 text-center bg-primary text-white py-3 mt-4">
                &copy; 2023 E-Commerce. All Rights Reserved.
              </div>
            </footer>
          </div>

        </div>
      </div>
    </>
  );
};
