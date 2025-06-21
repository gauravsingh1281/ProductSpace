import { IoMdAdd, IoMdClose, IoMdRemove, IoMdTime } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../redux/features/cart/cartSlice";
const CartItem = ({ item }) => {
  const { id, name, price, imageUrl, description, category, quantity } = item;
  const dispatch = useDispatch();
  return (
    <>
      <div className="rounded-lg">
        <div className="sm:flex sm:justify-start items-center shadow-md p-6 bg-white rounded-lg mb-6 justify-between  border border-gray-200">
          {/* Product image */}
          <img
            src={imageUrl}
            alt={`${name}-img`}
            className="w-full h-28 sm:w-40 object-cover object-top rounded"
          />
          {/* Product details */}
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500">Price: &#8377; {price}</p>
              <p className="text-gray-600 text-sm">Category: {category}</p>
            </div>
            {/* Product Quantity */}

            <div className="mt-4 justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center gap-3 ">
                <span
                  onClick={() => dispatch(decrementQuantity(id))}
                  className="cursor-pointer rounded-lg bg-gray-100 duration-100  hover:bg-blue-500 px-3.5 py-1 hover:text-white flex justify-between items-center"
                >
                  <IoMdRemove className="inline" />
                </span>

                <p className=" bg-white text-center text-base outline-none">
                  {quantity}
                </p>
                <span
                  onClick={() => dispatch(incrementQuantity(id))}
                  className="flex justify-between items-center cursor-pointer rounded-lg bg-gray-100 duration-100  hover:bg-blue-500 px-3.5 py-1 hover:text-white"
                >
                  <IoMdAdd className="inline" />
                </span>
              </div>
              <div className="flex justify-center items-center space-x-4">
                <p>{(price * quantity).toFixed(2)}</p>
                <button onClick={() => dispatch(removeItem(id))}>
                  <IoMdClose className="text-red-500 text-sm font-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
