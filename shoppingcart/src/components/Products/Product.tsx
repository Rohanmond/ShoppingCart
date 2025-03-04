import React from "react";
import { Product } from "../../ShoppingContext";
import styles from "./Product.module.css";
import { AddCartWizard } from "../AddCartWizard/AddCartWizard";

export const ProductElement = (product: Product) => {
  const { discountPercentage, price, thumbnail, title } = product;

  const calculateFinalPrice = discountPercentage
    ? (price - price * (discountPercentage / 100)).toFixed(2)
    : price;

  const shouldShowActualPrice = !!discountPercentage;

  return (
    <div className={styles.product}>
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
