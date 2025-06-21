import { useMemo } from "react";
import { useSelector } from "react-redux";
import { makeSelectWishlistByUserId } from "../redux/features/wishlist/wishlistSlice";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const loggedInUser = useSelector((state) =>
    state.user.find((user) => user.isLogin === true)
  );
  const selectWishlistByUser = useMemo(
    () => makeSelectWishlistByUserId(loggedInUser?.id),
    [loggedInUser?.id]
  );

  const wishlistProducts = useSelector(selectWishlistByUser);
  console.log(wishlistProducts);

  return (
    <>
      <div className="w-full min-h-screen py-4 px-7">
        <div>
          <span className="text-2xl my-3">My Wishlist </span>
          <span className="text-xl text-gray-600">{`${
            wishlistProducts.length
          } ${wishlistProducts.length > 1 ? "items" : "item"}`}</span>
        </div>
        <div className="flex justify-start items-start flex-row  flex-wrap mt-4 gap-5">
          {wishlistProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
