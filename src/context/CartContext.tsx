'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
  excludedIngredients?: string[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (
    id: string | number,
    size?: string,
    excludedIngredients?: string[],
  ) => void;
  updateQuantity: (
    id: string | number,
    quantity: number,
    size?: string,
    excludedIngredients?: string[],
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('antepli-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('antepli-cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const areIngredientsEqual = (a?: string[], b?: string[]) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  };

  const addToCart = (
    item: Omit<CartItem, 'quantity'> & { quantity?: number },
  ) => {
    setCart((prevCart) => {
      // Check if item already exists (same id, size, and exclusions)
      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          areIngredientsEqual(
            cartItem.excludedIngredients,
            item.excludedIngredients,
          ),
      );

      const quantityToAdd = item.quantity || 1;

      if (existingItemIndex > -1) {
        // Update quantity if exists
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantityToAdd;
        return newCart;
      } else {
        // Add new item
        return [...prevCart, { ...item, quantity: quantityToAdd }];
      }
    });
  };

  const removeFromCart = (
    id: string | number,
    size?: string,
    excludedIngredients?: string[],
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === id &&
            item.size === size &&
            areIngredientsEqual(item.excludedIngredients, excludedIngredients)
          ),
      ),
    );
  };

  const updateQuantity = (
    id: string | number,
    quantity: number,
    size?: string,
    excludedIngredients?: string[],
  ) => {
    if (quantity < 1) {
      removeFromCart(id, size, excludedIngredients);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id &&
        item.size === size &&
        areIngredientsEqual(item.excludedIngredients, excludedIngredients)
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
