import { useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectCartByUserId } from "../redux/features/cart/cartSlice";

const BillingCard = () => {
  const loggedInUser = useSelector((state) =>
    state.user.find((u) => u.isLogin)
  );

  const selectUserCart = useMemo(
    () => makeSelectCartByUserId(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const cart = useSelector(selectUserCart);

  const subTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = (subTotal * 0.1).toFixed(2); // 10% shipping tax
  const totalBilling = (Number(subTotal) + Number(tax)).toFixed(2);

  return (
    <div className="mt-6 w-full rounded-lg border border-gray-200 bg-white p-6 shadow-md md:mt-0">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">₹{subTotal.toFixed(2)}</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Shipping (10%)</p>
        <p className="text-gray-700">₹{tax}</p>
      </div>
      <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
        <p className="text-gray-800">Total</p>
        <p className="text-gray-800">₹{totalBilling}</p>
      </div>
    </div>
  );
};

export default BillingCard;
