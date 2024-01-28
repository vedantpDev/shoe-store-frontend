import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getDiscountedPrice } from "@/utils/helper";

const ProductCard = ({ data }) => {
  const { attributes, id } = data;
  return (
    <Link
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
      href={`/product/${attributes?.slug}`}
    >
      <Image
        width={500}
        height={500}
        src={attributes?.thumbnail?.data?.attributes?.url}
        alt={attributes?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{attributes?.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-base font-semibold">
            &#8377;{attributes?.price}
          </p>
          {attributes?.originalprice && (
            <>
              <p className="text-base font-medium line-through">
                {attributes.originalprice}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPrice(attributes.originalprice, attributes.price)}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
