import { Loading } from "@/components";
import http from "@/http";
import { imgUrl } from "@/lib";
import { clearCart, setCart } from "@/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const Cart = () => {
  const cart = useSelector((state) => state.cart.value);

  const [loading, setLoading] = useState(false);

  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cart) {
      let tq = 0,
        tp = 0;
      for (let id in cart) {
        tq += cart[id].qty;
        tp += cart[id].total;
      }

      setTotalQty(tq);
      setTotalPrice(tp);
    } else {
      setTotalPrice(0);
      setTotalQty(0);
    }
  }, [cart]);

  const removeProduct = (id) => {
    let temp = {};
    for (let k in cart) {
      if (k != id) {
        temp[k] = cart[k];
      }
    }
    if (Object.keys(temp).length == 0) {
      dispatch(clearCart());
    } else {
      dispatch(setCart(temp));
    }
  };

  const changeQty = (id, qty) => {
    let temp = {};

    for (let k in cart) {
      let total = k == id ? cart[k].price * qty : cart[k].total

      let qt = k == id ? qty : cart[k].qty

      temp[k] = { ...cart[k], qty: qt, total };
    }
    dispatch(setCart(temp));
  };
  
  const handleCheckout = (id, qty) => {
    let data = [];
    for (let k in cart) {
      data.push({
        id: k,
        qty: cart[k].qty,
      });
    }
    setLoading(true);
    http.post('/checkout', data)
      .then(() => {
        dispatch(clearCart());
        navigate("/");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Shopping Cart</h2>
        </div>
      </div>

      <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          {loading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
                {cart ? (
                  <div className="row">
                    <div className="col-12">
                      <table className="table table-striped table-hover table-sm">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(cart).map((item) => (
                            <tr key={item}>
                              <td>
                                <img
                                  src={imgUrl(item.product.images[0])}
                                  className="img-fluid me-3"
                                />
                                {item.product.name}
                              </td>
                              <td>Rs. {item.price}</td>
                              <td>
                                <input
                                  type="number"
                                  min="1"
                                  defaultValue={item.qty}
                                  onChange={({ target }) => changeQty(item.product._id, parseInt(target.value))                                  }
                                />
                              </td>
                              <td>Rs.{item.total}</td>
                              <td>
                                <button
                                  className="btn btn-link text-danger"
                                  onClick={() =>
                                    removeProduct(item.product._id)
                                  }
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th colspan="2" className="text-right">
                              Total
                            </th>
                            <th>Total Qty: {totalQty}</th>
                            <th>Rs. {totalPrice}</th>
                            <th></th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="col-12 text-right">
                      <button
                        className="btn btn-outline-secondary me-3"
                        type="submit"
                        onClick={() => dispatch(clearCart())}
                      >
                        Clear Cart
                      </button>
                      <button
                        className="btn btn-outline-success"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-center">Cart is empty</h3>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
