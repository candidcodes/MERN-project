import { Loading, ProductSection } from "@/components"
import http from "@/http"
import { imgUrl } from "@/lib"
import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"

export const Detail = () => {
    const [product, setProduct] = useState({})
    const [similars, setSimilars] = useState({})
    const [imgLarge, setImgLarge] = useState('')
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        Promise.all([
            http.get(`/products/${params.id}`),
            http.get(`/products/${params.id}/similar`)
        ])
        .then(([{data: prod}, {data: sim}]) => {
            setProduct(prod)
            setSimilars(sim)
            setImgLarge(prod.images[0])
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [params.id])

    return loading ? <Loading /> : <div className="col-12">
        <main className="row">
            <div className="col-12 bg-white py-3 my-3">
                <div className="row">

                    <div className="col-lg-5 col-md-12 mb-3">
                        <div className="col-12 mb-3">
                            <div className="img-large border" style={{backgroundImage: `url('${imgUrl(imgLarge)}')`}}></div>
                        </div>
                        <div className="col-12">
                            <div className="row">
                                { product.images?.map( (image, i) => <div key={i} className="col-sm-2 col-3" onMouseEnter={() => setImgLarge(image)}>
                                    <div className="img-small border" style={{backgroundImage: `url('images/image-1.jpg')`}} data-src="images/image-1.jpg"></div>
                                </div> )}
                                
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-9">
                        <div className="col-12 product-name large">
                            {product.name}
                            <small>By <Link to={`/brands/${product.brand._id}`}>{product.brand.name}</Link></small>
                        </div>
                        <div className="col-12 px-0">
                            <hr/>
                        </div>
                        <div className="col-12">
                            {product.summary}
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-3 text-center">
                        <div className="col-12 sidebar h-100">
                            <div className="row">
                                <div className="col-12">
                                    {product.discountedPrice > 0 ? <>
                                        <span className="detail-price">
                                            Rs. {product.discountedPrice}
                                        </span>
                                        <span className="detail-price-old">
                                            Rs. {product.price}
                                        </span>
                                    </>:<span className="detail-price">
                                            Rs. {product.price}
                                        </span>}
                                </div>
                                <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                                    <div className="mb-3">
                                        <label for="qty">Quantity</label>
                                        <input type="number" id="qty" min="1" value="1" className="form-control" required />
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-outline-dark" type="button"><i className="fas fa-cart-plus me-2"></i>Add to cart</button>
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-outline-secondary btn-sm" type="button"><i className="fas fa-heart me-2"></i>Add to wishlist</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="col-12 mb-3 py-3 bg-white text-justify">
                <div className="row">

                    <div className="col-md-7">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 text-uppercase">
                                    <h2><u>Details</u></h2>
                                </div>
                                <div className="col-12" id="details">{product.description}</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-5">
                        <div className="col-12 px-md-4 sidebar h-100">

                            <div className="row">
                                <div className="col-12 mt-md-0 mt-3 text-uppercase">
                                    <h2><u>Ratings & Reviews</u></h2>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-sm-4 text-center">
                                            <div className="row">
                                                <div className="col-12 average-rating">
                                                    4.1
                                                </div>
                                                <div className="col-12">
                                                    of 100 reviews
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <ul className="rating-list mt-3">
                                                <li>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{width: '45%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">45%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        5<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{width: '30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        4<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{width: '15%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">15%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        3<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{width: '7%'}} aria-valuenow="7" aria-valuemin="0" aria-valuemax="100">7%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        2<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-dark" role="progressbar" style={{width: '3%'}} aria-valuenow="3" aria-valuemin="3" aria-valuemax="100">3%</div>
                                                    </div>
                                                    <div className="rating-progress-label">
                                                        1<i className="fas fa-star ms-1"></i>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 px-md-3 px-0">
                                    <hr/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <h4>Add Review</h4>
                                </div>
                                <div className="col-12">
                                    <form>
                                        <div className="mb-3">
                                            <textarea className="form-control" placeholder="Give your review"></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <div className="d-flex ratings justify-content-end flex-row-reverse">
                                                <input type="radio" value="5" name="rating" id="rating-5"/><label
                                                    for="rating-5"></label>
                                                <input type="radio" value="4" name="rating" id="rating-4"/><label
                                                    for="rating-4"></label>
                                                <input type="radio" value="3" name="rating" id="rating-3"/><label
                                                    for="rating-3"></label>
                                                <input type="radio" value="2" name="rating" id="rating-2"/><label
                                                    for="rating-2"></label>
                                                <input type="radio" value="1" name="rating" id="rating-1" checked/><label
                                                    for="rating-1"></label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn btn-outline-dark">Add Review</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 px-md-3 px-0">
                                    <hr/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">

                                    <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                                        <div className="row">
                                            <div className="col-12">
                                                <strong className="me-2">Steve Rogers</strong>
                                                <small>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </small>
                                            </div>
                                            <div className="col-12">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ullamcorper quam, non congue odio.
                                                <br/>
                                                Fusce ligula augue, faucibus sed neque non, auctor rhoncus enim. Sed nec molestie turpis. Nullam accumsan porttitor rutrum. Curabitur eleifend venenatis volutpat.
                                                <br/>
                                                Aenean faucibus posuere vehicula.
                                            </div>
                                            <div className="col-12">
                                                <small>
                                                    <i className="fas fa-clock me-2"></i>5 hours ago
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 text-justify py-2 px-3 mb-3 bg-gray">
                                        <div className="row">
                                            <div className="col-12">
                                                <strong className="me-2">Bucky Barns</strong>
                                                <small>
                                                    <i className="fas fa-star"></i>
                                                    <i className="fas fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                    <i className="far fa-star"></i>
                                                </small>
                                            </div>
                                            <div className="col-12">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ullamcorper quam, non congue odio.
                                                <br/>
                                                Aenean faucibus posuere vehicula.
                                            </div>
                                            <div className="col-12">
                                                <small>
                                                    <i className="fas fa-clock me-2"></i>5 hours ago
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {similars.length > 0 && <ProductSection title="Similar Products" products={similars}></ProductSection>}

        </main>
    </div>
}