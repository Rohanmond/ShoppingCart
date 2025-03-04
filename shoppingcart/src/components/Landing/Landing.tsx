import React, { useState } from "react";
import styles from "./Landing.module.css";
import clsx from "clsx";
import { Products } from "../Products/Products";
import { Carts } from "../Carts/Carts";

const Tabs = [
  {
    id: 0,
    component: Products,
    title: "Products",
  },
  {
    id: 1,
    component: Carts,
    title: "Carts",
  },
];

export const Landing = () => {
  const [currentTab, setCurrentTab] = useState(Tabs[0]);

  const handleTabClick = (index) => {
    setCurrentTab(() => Tabs[index]);
  };

  const TabComponent = currentTab.component;

  return (
    <>
      <div className={styles.navs}>
        {Tabs.map((el, index) => {
          return (
            <nav
              className={clsx(styles.nav, {
                [styles.selected]: currentTab.id === index,
              })}
              onClick={() => handleTabClick(index)}
            >
              {el.title}
            </nav>
          );
        })}
      </div>
      <div>
        <TabComponent />
      </div>
    </>
  );
};
