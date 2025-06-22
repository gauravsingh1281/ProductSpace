import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const { id, name, price, imageUrl, category, quantity } = item;
  const dispatch = useDispatch();

  return (
    <div className="relative flex justify-center flex-col md:flex-row md:justify-between items-center p-3 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
      {/* Close button */}
      <button
        onClick={() => dispatch(removeItem(id))}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 hover:bg-red-100 transition"
        aria-label="Remove item"
      >
        <IoMdClose className="text-red-500" size={20} />
      </button>

      {/* Product Image */}
      <div className="w-full md:w-[40%] flex justify-center items-center">
        <img
          src={imageUrl}
          alt={`${name}-img`}
          className="md:w-[200px] object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col gap-4 w-full md:w-[60%]">
        <div className="space-y-1 text-gray-700">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">Category: {category}</p>
          <p className="text-sm text-gray-600">Price: ₹{price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center md:justify-start gap-5">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => dispatch(decrementQuantity(id))}
              className="p-2 rounded-md bg-gray-100 hover:bg-blue-600 hover:text-white transition"
            >
              <IoMdRemove />
            </button>
            <span className="min-w-[30px] text-center">{quantity}</span>
            <button
              onClick={() => dispatch(incrementQuantity(id))}
              className="p-2 rounded-md bg-gray-100 hover:bg-blue-600 hover:text-white transition"
            >
              <IoMdAdd />
            </button>
          </div>

          <p className="text-sm font-medium text-indigo-600">
            Total: ₹{(price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
