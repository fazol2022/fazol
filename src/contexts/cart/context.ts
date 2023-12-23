import { createContext } from 'react';

const getCart = () => {
  const isBrowser = typeof window !== 'undefined';
  let cart = [] as any[];
  let cartS = isBrowser ? localStorage.getItem('currentCart') : '[]';
  cartS = cartS && cartS != undefined && cartS !== 'undefined' ? cartS : '[]';
  cart = JSON.parse(cartS) as any[];
  return cart;
};

const setCart = (cart: any[]) => {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser && localStorage) {
    localStorage.setItem('currentCart', JSON.stringify(cart));
  }
};

const getQuantity = () => {
  const cart = getCart();
  return cart.reduce((total, current) => total + (current?.quantity || 0), 0);
};

const getNumberOfItems = () => {
  const cart = getCart();
  return cart.length;
};

const cleanCart = (cart: any[]) => {
  const filtered = cart.filter((item) => {
    if (
      item === undefined ||
      item?.quantity === 0 ||
      item?.colors === undefined
    )
      return false;
    item.colors = item?.colors?.filter((color) => {
      if (
        color === undefined ||
        color?.quantity === 0 ||
        color?.sizes === undefined
      )
        return false;
      color.sizes = color?.sizes?.filter((size) => {
        if (size === undefined || size?.quantity === 0) return false;
        return true;
      });
      return true;
    });
    return true;
  });
  // console.log('filtered', filtered);
  return filtered;
};

const compareProducts = (a?: any, b?: any) => {
  if (a?.id === b?.id) {
    if (a?.quantity === b?.quantity) {
      const aCor = a?.colors && a?.colors[0];
      const bCor = b?.colors && b?.colors[0];
      if (aCor?.id === bCor?.id) {
        if (aCor?.quantity === bCor?.quantity) {
          const aSize = aCor?.sizes && aCor?.sizes[0];
          const bSize = bCor?.sizes && bCor?.sizes[0];
          if (aSize?.id === bSize?.id) {
            if (aSize?.quantity === bSize?.quantity) return true;
          }
        }
      }
    }
  }
  return false;
};

const CartContext = createContext({
  cart: getCart(),
  setCart: (_cart) => {},
  quantity: getQuantity(),
  setQuantity: (_quantity) => {},
  numberOfItems: getQuantity(),
  setNumberOfItems: (_number) => {},
  addToCart: (_product) => {},
  subFromCart: (_product) => {},
  clearCart: () => {},
  setToCart: (_new) => {},
});

export {
  CartContext,
  getCart,
  setCart,
  getQuantity,
  getNumberOfItems,
  compareProducts,
  cleanCart,
};
