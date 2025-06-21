import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  updateProduct,
} from "../redux/features/product/productSlice";
import updateIllustration from "../assets/images/update-img.svg";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { MdClose } from "react-icons/md";

const EditProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector(selectProducts);
  const product = allProducts.find((item) => item.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: product && {
      name: product.name,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl?.[0] || "",
      price: product.price,
      date: product.date,
    },
  });
  const handleUpdate = (data) => {
    const updated = {
      ...product,
      ...data,
      imageUrl: [data.imageUrl],
      price: Number(data.price),
    };
    dispatch(updateProduct(updated));
    toast.success("Product updated successfully!");
    navigate("/myListedProducts");
  };
  if (!product) {
    return <p className="text-center text-red-600 mt-10">Product not found</p>;
  }
  const handleClose = () => {
    navigate("/myListedProducts");
  };

  return (
    <div className="lg:w-[85%] mx-auto w-full h-fit lg:h-fit flex flex-col lg:flex-row justify-center items-start md:items-center shadow-xl rounded-2xl   overflow-hidden mt-7 relative p-5">
      <button
        className="absolute top-2 right-2 font-bold text-black hover:text-red-500 cursor-pointer hover:scale-[90%] transition-all ease-in duration-100"
        onClick={handleClose}
      >
        <MdClose className="text-4xl" />
      </button>
      <img
        className="h-full w-full lg:w-[60%]  object-cover"
        src={updateIllustration}
        alt="update-illustration"
      />

      <div className="w-full lg:w-[40%] h-full bg-white px-6 py-4 flex flex-col justify-center items-center gap-3 ">
        <h2 className="text-2xl font-semibold text-[#2B2B35] text-center">
          Update Product Details
        </h2>
        <form className="w-full" onSubmit={handleSubmit(handleUpdate)}>
          {/* Product Name */}
          <div className="my-1">
            <label className="block text-sm font-medium text-gray-600">
              Product Name:
            </label>
            <input
              className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm my-[2px]">
                This field is required.
              </p>
            )}
          </div>
          <div className="my-1">
            <label className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <textarea
              className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="description"
              id="description"
              placeholder="Write Product Description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm my-[2px]">
                This field is required.
              </p>
            )}
          </div>
          {/* Product Category */}
          <div className="my-1">
            <label className="block text-sm font-medium text-gray-600">
              Category:
            </label>
            <select
              name="category"
              id="category"
              className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Enter Product Name"
              {...register("category", {
                required: "Please select a category",
                validate: (value) =>
                  value !== "-" || "Please select a valid category",
              })}
            >
              <option value="-">Choose a Category</option>
              <option value="gadget">Gadget</option>
              <option value="clothing">Clothing</option>
              <option value="beauty">Beauty</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm my-[2px]">
                {errors.category.message}
              </p>
            )}
          </div>
          {/* Product Image */}
          <div className="my-1">
            <label className="block text-sm font-medium text-gray-600">
              Product Image:
            </label>
            <input
              className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="url"
              name="image"
              id="image"
              placeholder="Paste Image Url"
              {...register("imageUrl", { required: true })}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm my-[2px]">
                This field is required.
              </p>
            )}
          </div>
          {/* Price and date */}
          <div className="my-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Price:
              </label>
              <input
                className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="number"
                name="price"
                id="price"
                placeholder="Set Price eg. &#8377;100"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm my-[2px]">
                  This field is required.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Upload Date:
              </label>
              <input
                className="w-full bg-gray-50 border-1 text-black my-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="date"
                name="date"
                id="date"
                {...register("date", { required: true })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm my-[2px]">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2A454E] my-3 text-[#FFC801] font-bold uppercase py-2 rounded-lg cursor-pointer active:scale-[90%]  transition-all ease-in duration-100"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductDetails;
