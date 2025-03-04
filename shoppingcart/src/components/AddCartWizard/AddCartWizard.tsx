import { Product, useShoppingContext } from "../../ShoppingContext";
import React from "react";

type AddCartWizardProps = {
  product: Product;
};

const Counter = (product: Product) => {
  const { handleCart } = useShoppingContext();
  const { quantity } = product;

  return (
    <div>
      <button onClick={() => handleCart(product, "dec")}>-</button>
      <span>{quantity}</span>
      <button onClick={() => handleCart(product, "add")}>+</button>
    </div>
  );
};

export const AddCartWizard = ({ product }: AddCartWizardProps) => {
  const { handleCart } = useShoppingContext();
  const { isAddedToCart } = product;

  if (isAddedToCart) {
    return <Counter {...product} />;
  }

  return (
    <button onClick={() => handleCart(product, "add")}>Add to cart</button>
  );
};
