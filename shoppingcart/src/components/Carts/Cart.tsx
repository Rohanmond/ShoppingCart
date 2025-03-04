import { Product, useShoppingContext } from "../../ShoppingContext";
import { AddCartWizard } from "../AddCartWizard/AddCartWizard";
import React from "react";
import styles from "./Cart.module.css";

export const Cart = (product: Product) => {
  const { thumbnail, title, discountPercentage, price } = product;
  const calculateFinalPrice = discountPercentage
    ? (price - price * (discountPercentage / 100)).toFixed(2)
    : price;

  const shouldShowActualPrice = !!discountPercentage;

  return (
    <div className={styles.cart}>
      <p>{title}</p>
      <img className={styles.image} src={thumbnail} alt={title} />
      <p>
        Price: {calculateFinalPrice}/{" "}
        {shouldShowActualPrice && (
          <span className={styles.strikeThrough}>{price}</span>
        )}
      </p>
      <AddCartWizard product={product} />
    </div>
  );
};
