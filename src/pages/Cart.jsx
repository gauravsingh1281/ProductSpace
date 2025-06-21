import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import BillingCard from "../components/BillingCard";

const Cart = () => {
  const loggedInUser = useSelector((s) => s.user.find((u) => u.isLogin));

  const cart = useSelector((s) =>
    s.cart.filter((item) => item.userId === loggedInUser?.id)
  );

  if (!loggedInUser)
    return (
      <div className="py-20 text-center text-xl">
        Please log in to view your cart.
      </div>
    );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-xl font-bold mb-5">Products in the Cart</h2>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* items */}
        <div className="md:w-2/3 space-y-6">
          {cart.length ? (
            cart.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <p>No product found in your cart.</p>
          )}
        </div>

        {/* billing */}
        <div className="md:w-1/3">
          <BillingCard />
        </div>
      </div>
    </div>
  );
};

export default Cart;
