import pageNotFoundIllustration from "../assets/images/error-img.jpg";

const PageNotFound = () => {
  return (
    <div className="lg:w-[80%] mx-auto w-full h-full lg:h-[520px] flex justify-center items-center shadow-xl rounded-2xl overflow-hidden mt-8 ">
      <img
        className="h-full w-full lg:w-[60%] object-cover"
        src={pageNotFoundIllustration}
        alt="page-not-found-illustration"
      />
    </div>
  );
};

export default PageNotFound;
