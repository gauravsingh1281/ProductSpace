import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import BillingCard from "../components/BillingCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="py-12 max-w-7xl mx-auto container px-4">
      <h2 className="text-xl font-bold mb-5">Products in the Cart</h2>
      <div className="flex flex-col md:flex-row justify-between md:gap-8 gap-4">
        <div className=" md:w-2/3 space-y-6">
          {cart.length ? (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div>No product found in your cart.</div>
          )}
        </div>
        <div className="w-1/3">
          <BillingCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
