import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./Layout.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MenuBar } from "./MenuBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fromStorage, removeStorage } from "@/lib";
import { setUser } from "@/store";
import { Loading } from ".";
import http from "@/http";
import { Form, Nav, NavDropdown } from "react-bootstrap";

export const Layout = () => {
  const user = useSelector((state) => state.user.value);
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [term, setTerm] = useState('')
  const [loading, setLoading] = useState(true);

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
                    <ul className="top-nav">
                      <li>
                        <a href="register.html">
                          <i className="fas fa-user-edit me-2"></i>Register
                        </a>
                      </li>
                      <li>
                        <a href="login.html">
                          <i className="fas fa-sign-in-alt me-2"></i>Login
                        </a>
                      </li>
                    </ul>
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
                    <a href="cart.html" className="header-item">
                      <i className="fas fa-shopping-bag me-2"></i>
                      <span id="header-qty" className="me-3">2</span>
                      <i className="fas fa-money-bill-wave me-2"></i>
                      <span id="header-price">$4,000</span>
                    </a>
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
            <footer className="row">
              <div className="col-12 bg-dark text-white pb-3 pt-5">
                <div className="row">
                  <div className="col-lg-2 col-sm-4 text-center text-sm-left mb-sm-0 mb-3">
                    <div className="row">
                      <div className="col-12">
                        <div className="footer-logo">
                          <a href="index.html">E-Commerce</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <address>
                          221B Baker Street
                          <br />
                          London, England
                        </address>
                      </div>
                      <div className="col-12">
                        <a href="#" className="social-icon">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-8 text-center text-sm-left mb-sm-0 mb-3">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="footer-title">Customer Care</h6>
                      </div>
                      <div className="col-12">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#">Contact Us</a>
                          </li>
                          <li>
                            <a href="#">Terms and Conditions</a>
                          </li>
                          <li>
                            <a href="#">Returns and Exchanges</a>
                          </li>
                          <li>
                            <a href="#">Shipping and Delivery</a>
                          </li>
                          <li>
                            <a href="#">Privacy Policy</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 text-center text-sm-left mb-sm-0 mb-3">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="footer-title">Information</h6>
                      </div>
                      <div className="col-12">
                        <ul className="list-unstyled">
                          <li>
                            <a href="#">About Us</a>
                          </li>
                          <li>
                            <a href="#">Track My Order</a>
                          </li>
                          <li>
                            <a href="#">Careers</a>
                          </li>
                          <li>
                            <a href="#">Corporate Responsibility</a>
                          </li>
                          <li>
                            <a href="#">Affiliate Program</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-sm-6 text-center text-sm-left mb-sm-0 mb-3">
                    <div className="row">
                      <div className="col-12">
                        <h6 className="footer-title">Sign Up for Newsletter</h6>
                      </div>
                      <div className="col-12">
                        <form action="#">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control border-dark"
                              placeholder="Email Address"
                            />
                            <button className="btn btn-outline-light">
                              Subscribe
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="col-12 pt-3">
                        <h6 className="text-white">Payment Methods</h6>
                        <div className="payment-icons">
                          <a href="#">
                            <img src="images/payment/visa.svg" alt="Visa" />
                          </a>
                          <a href="#">
                            <img src="images/payment/mastercard.svg" alt="Mastercard" />
                          </a>
                          <a href="#">
                            <img src="images/payment/paypal.svg" alt="Paypal" />
                          </a>
                          <a href="#">
                            <img src="images/payment/amex.svg" alt="Amex" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center bg-primary text-white py-3">
                &copy; 2023 E-Commerce. All Rights Reserved.
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};
