import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import { IoMdHeartEmpty } from "react-icons/io";
import ProductDetailsCarousel from "@/components/ProductDetailsCarousel";
import RelatedProducts from "@/components/RelatedProducts";
import { fetchData } from "@/utils/api";
import { getDiscountedPrice } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = ({ products, product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const p = product?.data[0]?.attributes;
  const description = p?.description[0]?.children[0]?.text;

  const notify = () => {
    toast.success("Succes. check your cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          {/* left column start */}
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel imgaes={p?.image?.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className="flex-[1] py-3">
            {/* product title */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {p?.name}
            </div>

            {/* product subtitle */}
            <div className="text-lg font-semibold mb-5">{p?.subtitle}</div>

            {/* product price */}
            <div className="flex items-center text-black/[0.5]">
              <p className="mr-2 text-base font-semibold">
                MRP: &#8377;{p?.price}
              </p>
              {p?.originalprice && (
                <>
                  <p className="text-base font-medium line-through">
                    {p.originalprice}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPrice(p?.originalprice, p?.price)}% off
                  </p>
                </>
              )}
            </div>

            <div className="text-md font-medium text-black/[0.5]">
              incl. of taxes
            </div>

            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>

            <div className="mb-10">
              <div className="flex justify-between mb-2">
                <div className="text-md font-semibold">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* Size Start */}
              <div id="sizesGrid" className="grid grid-cols-3 gap-2">
                {p?.size?.data?.map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      item?.enabled
                        ? "cursor-pointer hover:border-black"
                        : "cursor-not-allowed bg-black/[0.1]  opacity-50"
                    } border rounded-md text-center py-3 font-medium ${
                      selectedSize === item?.size ? "border-black" : ""
                    }`}
                    onClick={() => {
                      setShowError(false);
                      setSelectedSize(item?.size);
                    }}
                  >
                    {item?.size}
                  </div>
                ))}
              </div>
              {showError && (
                <div className="text-red-600 mt-6">
                  Size Selection is required.
                </div>
              )}
              {/* Size end */}
            </div>

            <button
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizesGrid").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data[0],
                      selectedSize,
                      oneQuantityPrice: p.price,
                    })
                  );
                  notify();
                }
              }}
              className="w-full py-4 rounded-full bg-black text-white text-lg transition-transform active:scale-95 mb-5 hover:opacity-75"
            >
              Add to Cart
            </button>

            <button className="w-full py-4 rounded-full border border-black font-medium text-lg transition-transform active:scale-95 hover:opacity-75 flex items-center justify-center gap-2 mb-10">
              Whishlist-stack
              <IoMdHeartEmpty size={20} />
            </button>
            <div>
              <div className="text-lg font-bold mb-5">Product Details</div>
              <div className="markdown text-md mb-5">
                {<ReactMarkdown>{description}</ReactMarkdown>}
              </div>
            </div>
          </div>
          {/* right column end */}
        </div>
        <RelatedProducts products={products} />
      </Wrapper>
    </div>
  );
};

export default ProductDetail;

export async function getStaticPaths() {
  const products = await fetchData(`/api/products?populate=*`);
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await fetchData(
    `/api/products?populate=*&[filters][slug][$eq]=${slug}`
  );
  const products = await fetchData(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );
  return {
    props: {
      products,
      product,
    },
  };
}
