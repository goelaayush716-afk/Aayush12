import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as fallbackProducts } from '../data/products';
import { api } from '../services/api';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [productsList, setProductsList] = useState(fallbackProducts);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [cart, setCart] = useState([
    {
      id: "royal-luxe-tote",
      name: "Royal Luxe Tote",
      price: 18999,
      image: "/images/hero-bag.png",
      color: "Burgundy",
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toasts, setToasts] = useState([]);
  
  // Checkout & Order state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);

  // Fetch live products from backend on mount
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await api.getProducts();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProductsList(res.data);
        }
      } catch (err) {
        console.warn('Backend currently offline or unreachable, using local luxury catalog fallback:', err.message);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchCatalog();
  }, []);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, color = 'Default', quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color,
          quantity
        }
      ];
    });
    addToast(`Added "${product.name}" (${color}) to cart.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, color) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
    addToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (id, color, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast('Removed from wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  // Place Order through backend API
  const placeOrder = async (customerDetails, paymentMethod = 'VIP Encrypted Card') => {
    try {
      const payload = {
        customer: customerDetails,
        items: cart,
        paymentMethod
      };

      const res = await api.createOrder(payload);
      if (res.success && res.data) {
        setLatestOrder(res.data);
        clearCart();
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsOrderSuccessOpen(true);
        addToast(`Order ${res.data.id} confirmed!`, 'success');
        return res.data;
      }
      throw new Error(res.error || 'Failed to process order.');
    } catch (err) {
      console.error('Order creation error:', err);
      addToast(err.message || 'Error processing order.', 'error');
      throw err;
    }
  };

  // Subscribe to VIP Inner Circle
  const subscribeToVip = async (email) => {
    try {
      const res = await api.subscribeVip(email);
      addToast(res.message || `Welcome to the Luvia Inner Circle!`, 'success');
      return res;
    } catch (err) {
      addToast(err.message || 'Subscription failed. Please try again.', 'error');
      throw err;
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products: productsList,
        loadingProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        activeQuickView,
        setActiveQuickView,
        wishlist,
        toggleWishlist,
        toasts,
        addToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestOrder,
        setLatestOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        placeOrder,
        subscribeToVip
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
