import { useSelector } from "react-redux";
import { useMemo } from "react";
import CartItem from "../components/CartItem";
import BillingCard from "../components/BillingCard";
import { makeSelectCartByUserId } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const loggedInUser = useSelector((s) => s.user.find((u) => u.isLogin));

  const cartSelector = useMemo(
    () => makeSelectCartByUserId(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const cart = useSelector(cartSelector);

  if (!loggedInUser)
    return (
      <div className="py-20 text-center text-2xl">
        Please log in to view your cart.
      </div>
    );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      {cart.length ? (
        <h2 className="text-2xl my-3">Products in the Cart.</h2>
      ) : (
        <h2 className="text-2xl my-3 ">No product found in your cart.</h2>
      )}

      {cart.length ? (
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* items */}
          <div className="md:w-2/3 space-y-6">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* billing */}
          <div className="md:w-1/3">
            <BillingCard />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
