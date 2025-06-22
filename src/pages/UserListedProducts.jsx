import { useSelector } from "react-redux";
import { useMemo } from "react";
import { makeSelectProductsByUserId } from "../redux/features/product/productSlice";
import ProductCard from "../components/ProductCard";
const UserListedProduct = () => {
  const loggedInUser = useSelector((state) =>
    state.user.find((user) => user.isLogin === true)
  );
  const selectUserProducts = useMemo(
    () => makeSelectProductsByUserId(loggedInUser?.id),
    [loggedInUser?.id]
  );
  const listedProduct = useSelector(selectUserProducts);
  return (
    <div className="w-full min-h-screen py-4 px-7">
      {listedProduct && listedProduct.length > 0 ? (
        <div>
          <span className="text-2xl my-3">You Have Listed </span>
          <span className="text-xl text-gray-600">{`${listedProduct.length} ${
            listedProduct.length > 1 ? "Products" : "Product"
          }`}</span>
        </div>
      ) : (
        ""
      )}
      {listedProduct && listedProduct.length > 0 ? (
        <div className="flex justify-start items-start flex-row  flex-wrap mt-4 gap-5">
          {listedProduct?.map((product) => (
            <ProductCard key={product.id} product={product} isOwner />
          ))}
        </div>
      ) : (
        <p className="text-2xl my-3">You haven't listed any products yet.</p>
      )}
    </div>
  );
};

export default UserListedProduct;
