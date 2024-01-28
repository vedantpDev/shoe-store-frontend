import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
import { makePaymentRequest } from "@/utils/api";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      await stripe.redirectToCheckout({ sessionId: res.stripeSession.id });
    } catch (error) {
      setLoading(false);
      console.log("Error: " + error);
    }
  };
  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* Heading Start */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* Heading End */}

            {/* Content start */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Item</div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
                {/* <CartItem /> */}
                {/* <CartItem /> */}
              </div>
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summery</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377;{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md my-5 border-t mt-5">
                    sdfljvhsdvsdfgsdgdgdfg
                    dfgdf,gjvndfkjgdfkjgbdfkhgbfdhbfhbjkfgjkfghjfuihbfubndlkjnvbio;sedfghndikljugbn
                    drug hdruo hgiuh ui hduoh iurh iud ghiud ghuidrh gudhguih
                  </div>
                </div>
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={handlePayment}
                >
                  Checkout
                  {loading && <img src="spinner.svg" />}
                </button>
              </div>
            </div>
          </>
        )}

        {/* This is empty screen */}
        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              className="w-[300px] h-[300px]"
              src={"/empty-cart.jpg"}
              width={300}
              height={300}
            />
            <span className="text-xl font-bold">Your Cart is Empty</span>
            <span className="text-center mt-4">
              Looks Like you have not added anuthing in you cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
