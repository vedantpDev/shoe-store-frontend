import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousel = ({ imgaes }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        // autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        thumbWidth={60}
        showStatus={false}
        className="productCarousel"
        // renderArrowPrev={(clickHandler, hasPrev) => (
        //   <div
        //     className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        //     onClick={clickHandler}
        //   >
        //     <BiArrowBack className="text-sm md:text-lg" />
        //   </div>
        // )}
        // renderArrowNext={(clickHandler, hasPrev) => (
        //   <div
        //     className="absolute right-0  bottom-0 w-[30px] md:w-[50px] h-[30px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
        //     onClick={clickHandler}
        //   >
        //     <BiArrowBack className="rotate-180 text-sm md:text-lg" />
        //   </div>
        // )}
      >
        {imgaes?.map((img) => (
          <img
            alt={img?.attributes?.name}
            key={img?.id}
            src={img?.attributes?.url}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousel;
