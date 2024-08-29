import { imgUrl } from "@/lib"
import { Link } from "react-router-dom"
import { CartBtn } from "./CartBtn"

export const ProductCard = ({ product }) => {
    return <div className="col my-3">
    <div className="col-12 bg-white text-center h-100 product-item">
        <div className="row h-100">
            <div className="col-12 p-0 mb-3">
                <Link to={`/products/${product._id}`}>
                    <img src={imgUrl(product.images[0])} className="img-fluid" />
                </Link>
            </div>
            <div className="col-12 mb-3">
                <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link>
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
                <CartBtn product={product} />
            </div>
        </div>
    </div>
</div>
}