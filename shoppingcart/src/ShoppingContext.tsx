import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Product = {
  id: string;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
  rating: number;
  isAddedToCart: boolean;
  quantity?: number;
};

type CartType = "dec" | "add" | "remove";

export type ShoppingContextProps = {
  products: Product[];
  carts: Product[];
  handleCart: (product: Product, type: CartType) => void;
};

const ShoppingContext = createContext<ShoppingContextProps | null>(null);

export const ShoppingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    (async () => {
      const productDataJson = await fetch("https://dummyjson.com/products");

      const productData = await productDataJson.json();

      setProducts(productData.products);
    })();
  }, []);

  const handleCart = (product: Product, type: CartType) => {
    const { id, isAddedToCart, quantity } = product;

    let newProduct: Product = {} as Product;

    switch (type) {
      case "add":
        if (isAddedToCart && quantity) {
          newProduct = { ...product, quantity: quantity + 1 };
        } else {
          newProduct = { ...product, isAddedToCart: true, quantity: 1 };
        }
        break;
      case "dec":
        if (quantity && quantity === 1) {
          newProduct = { ...product, quantity: null, isAddedToCart: false };
        } else if (quantity) {
          newProduct = { ...product, quantity: quantity - 1 };
        }
        break;
    }

    setProducts((prevProducts) => {
      return prevProducts.map((el) => (el.id === id ? newProduct : el));
    });

    setCarts((prevCarts) => {
      const findProduct = prevCarts.find((el) => el.id === id);

      if (!newProduct.isAddedToCart) {
        return prevCarts.filter((el) => el.id !== id);
      }
      if (findProduct) {
        return prevCarts.map((el) => (el.id === id ? newProduct : el));
      } else {
        return [...prevCarts, newProduct];
      }
    });
  };

  console.log(carts, "carts");

  return (
    <ShoppingContext.Provider value={{ products, carts, handleCart }}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContext = () => {
  const data: ShoppingContextProps = useContext(ShoppingContext);

  return data;
};
