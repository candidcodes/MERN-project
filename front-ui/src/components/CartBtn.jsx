import { setCart } from "@/store";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const CartBtn = ({ product, qty = 1 }) => {

    const cart = useSelector(state => state.cart.value)

    const dispatch = useDispatch()

    const addToCart = () => {
        let temp = {...cart}
        let qt = qty
        let price = product.discountedPrice > 0 ? product.discountedPrice : product.price 

        if(product._id in temp) {
            qt += temp[product._id].qty
        }

        let total = price * qt

        temp[product._id] = {product, qty: qt, price, total}

        dispatch(setCart(temp))
        toast.success('Product added to the Cart')
    }
    
  return (
    <Button variant="outline-dark" type="button" onClick={addToCart}>
      <i className="fas fa-cart-plus me-2"></i>Add to cart
    </Button>
  );
};
