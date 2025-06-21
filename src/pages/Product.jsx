import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProductError,
  selectProducts,
  selectProductStatus,
} from "../redux/features/product/productSlice";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const dispatch = useDispatch();

  const loggedInUser = useSelector((state) =>
    state.user.find((user) => user.isLogin === true)
  );

  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const productsList = useSelector(selectProducts) || [];

  useEffect(() => {
    if (!productsList.length) dispatch(fetchProducts());
  }, [dispatch, productsList.length]);

  // Product list sorted by recent date
  const sortedProducts = [...productsList].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return (
    <div className="py-8 w-full mx-auto px-4">
      <div>
        {status === "loading" && <p>Loading Products ...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {status !== "loading" && !productsList.length && (
          <p>No products found.</p>
        )}
        <div className="flex justify-center md:justify-start items-start md:flex-row flex-col flex-wrap mt-4 gap-5 mx-auto">
          {sortedProducts.map((product) => {
            const isOwner = loggedInUser?.id === product.userId;
            return (
              <ProductCard
                key={product.id}
                product={product}
                isOwner={isOwner}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Product;
