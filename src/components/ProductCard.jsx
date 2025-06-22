import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { BiSolidCartAdd } from "react-icons/bi";
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import {
  isProductInWishlist,
  toggleWishlist,
} from "../redux/features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../redux/features/product/productSlice";
import { useMemo } from "react";
import { makeSelectIsProductInCart } from "../redux/features/cart/cartSlice";

const ProductCard = ({ product, isOwner }) => {
  const loggedInUser = useSelector((state) =>
    state.user.find((user) => user.isLogin === true)
  );

  const isWishlisted = useSelector((state) => {
    return isProductInWishlist(state, loggedInUser?.id, product?.id);
  });

  const isProductAddedToCart = useSelector(
    useMemo(
      () => makeSelectIsProductInCart(loggedInUser?.id, product.id),
      [loggedInUser?.id, product.id]
    )
  );
  const { name, imageUrl, description, price } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (loggedInUser) {
      dispatch(addToCart({ ...product, userId: loggedInUser.id }));
    } else {
      toast.error("Please login to use this feature");
    }
  };
  const handleToggleWishlist = () => {
    if (loggedInUser) {
      dispatch(toggleWishlist({ ...product, userId: loggedInUser.id }));
    } else {
      toast.error("Please login to use this feature");
    }
  };
  return (
    <div className="card bg-base-100 w-96 h-[500px] shadow-sm mt-2 border border-gray-200 ">
      <figure className="w-78 flex justify-center items-center mx-auto p-4">
        <img
          className="w-full h-full object-cover object-top "
          src={imageUrl}
          alt={name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-gray-800">{name}</h2>
        <p className="text-gray-600">{`${description.slice(0, 200)}...`}</p>
        <div className="card-actions justify-end items-center">
          <p className="text-blue-600 font-semibold">&#8377; {price}</p>
          {!isOwner ? (
            <div className="space-x-3">
              <button
                type="button"
                onClick={handleToggleWishlist}
                className="btn bg-white hover:scale-[90%]  transition-all ease-in duration-100 cursor-pointer text-2xl rounded-full"
              >
                {isWishlisted ? (
                  <MdOutlineFavorite className="text-[#FB2C36]" />
                ) : (
                  <MdOutlineFavoriteBorder className="text-[#FB2C36]" />
                )}
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn bg-white hover:scale-[90%]  transition-all ease-in duration-100 cursor-pointer text-2xl rounded-full"
              >
                {isProductAddedToCart ? (
                  <IoCartSharp className="text-[#4ae009]" />
                ) : (
                  <IoCartOutline className="text-[#2C444E]" />
                )}
              </button>
            </div>
          ) : (
            <div className="space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/edit/${product.id}`)}
                className="btn bg-white hover:scale-[90%]  transition-all ease-in duration-100 cursor-pointer text-2xl rounded-full"
              >
                <MdEdit className="text-[#FFC801]" />
              </button>
              <button
                type="button"
                onClick={() => dispatch(deleteProduct(product.id))}
                className="btn bg-white hover:scale-[90%]  transition-all ease-in duration-100 cursor-pointer text-2xl rounded-full"
              >
                <MdDelete className="text-[#2C444E]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
