import React, { useMemo } from "react";
import { useShoppingContext } from "../../ShoppingContext";

import { Cart } from "./Cart";

const calculatePrice = (discountPercentage: number, price: number) =>
  discountPercentage
    ? (price - price * (discountPercentage / 100)).toFixed(2)
    : price;

export const Carts = () => {
  const { carts } = useShoppingContext();

  const totalPrice = useMemo(() => {
    let total = 0;

    carts.forEach((el) => {
      total += el.quantity * calculatePrice(el.discountPercentage, el.price);
    });

    return total;
  }, [carts]);

  if (carts.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div>
      {carts.map((el) => {
        return <Cart {...el} />;
      })}
      <p>
        Total amount is <span>{totalPrice}</span>
      </p>
    </div>
  );
};
