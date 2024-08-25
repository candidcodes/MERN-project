import { imgUrl } from "@/lib"

export const ProductCard = ({ product }) => {
    return <div className="col my-3">
    <div className="col-12 bg-white text-center h-100 product-item">
        <div className="row h-100">
            <div className="col-12 p-0 mb-3">
                <a href="product.html">
                    <img src={imgUrl(product.images[0])} className="img-fluid" />
                </a>
            </div>
            <div className="col-12 mb-3">
                <a href="product.html" className="product-name">{product.name}</a>
            </div>
            <div className="col-12 mb-3">
                {product.discountedPrice > 0 ? <>
                    <span className="product-price-old">
                       Rs. {product.price}
                    </span>
                    <br />
                    <span className="product-price">
                        Rs. {product.discountedPrice > 0 ? product.discountedPrice : product.price}
                    </span>
                </> : <span className="product-price">
                        Rs. {product.discountedPrice > 0 ? product.discountedPrice : product.price}
                    </span>}
                
            </div>
            <div className="col-12 mb-3 align-self-end">
                <button className="btn btn-outline-dark" type="button"><i className="fas fa-cart-plus me-2"></i>Add to cart</button>
            </div>
        </div>
    </div>
</div>
}