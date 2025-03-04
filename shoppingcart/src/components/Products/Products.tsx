import React from "react";
import { useShoppingContext } from "../../ShoppingContext";
import styles from "./Products.module.css";
import { ProductElement } from "./Product";

export const Products = () => {
  const { products } = useShoppingContext();

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {products.map((el) => {
        return <ProductElement {...el} />;
      })}
    </div>
  );
};
