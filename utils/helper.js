export const getDiscountedPrice = (originalPrice, discountedPrice) => {
  const discount = originalPrice - discountedPrice;

  const discountPerce = (discount / originalPrice) * 100;
  return discountPerce.toFixed(2);
};
