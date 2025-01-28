"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Define a Cart Item
interface CartItem {
  isAvailable: boolean; // Assuming isAvailable is a boolean value
  description: string; // Assuming description is a string
  id: string | number; // id could be either a string or number
  size: string;
  slug: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Define the Cart State and Actions
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: { slug: string } }
  | { type: "INCREMENT_QUANTITY"; payload: { slug: string } }
  | { type: "DECREMENT_QUANTITY"; payload: { slug: string } }
  | { type: "CLEAR_CART" };

// Initial State
const initialState: CartState = {
  items: [],
};

// Reducer Function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.slug === action.payload.slug);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.slug === action.payload.slug
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(item => item.slug !== action.payload.slug),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.slug === action.payload.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT_QUANTITY":
      return {
        ...state,
        items: state.items.map(item =>
          item.slug === action.payload.slug && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

// Create Context
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Context Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to Use Cart
export function useCart() {
  return useContext(CartContext);
}

// "use client";

// import { createContext, useContext, useReducer, ReactNode } from "react";

// // Define a Cart Item
// interface CartItem {
//   isAvailable: unknown;
//   description: any;
//   id: any;
//   size: string;
//   slug: string;
//   title: string;
//   price: number;
//   imageUrl: string;
//   quantity: number;
// }

// // Define the Cart State and Actions
// interface CartState {
//   items: CartItem[];
// }

// type CartAction =
//   | { type: "ADD_TO_CART"; payload: CartItem }
//   | { type: "REMOVE_FROM_CART"; payload: { slug: string } }
//   | { type: "INCREMENT_QUANTITY"; payload: { slug: string } }
//   | { type: "DECREMENT_QUANTITY"; payload: { slug: string } }
//   | { type: "CLEAR_CART" };

// // Initial State
// const initialState: CartState = {
//   items: [],
// };

// // Reducer Function
// function cartReducer(state: CartState, action: CartAction): CartState {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       const existingItem = state.items.find(item => item.slug === action.payload.slug);
//       if (existingItem) {
//         return {
//           ...state,
//           items: state.items.map(item =>
//             item.slug === action.payload.slug
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           ),
//         };
//       }
//       return {
//         ...state,
//         items: [...state.items, { ...action.payload, quantity: 1 }],
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         items: state.items.filter(item => item.slug !== action.payload.slug),
//       };
//     case "INCREMENT_QUANTITY":
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.slug === action.payload.slug
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ),
//       };
//     case "DECREMENT_QUANTITY":
//       return {
//         ...state,
//         items: state.items.map(item =>
//           item.slug === action.payload.slug && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         ),
//       };
//     case "CLEAR_CART":
//       return initialState;
//     default:
//       return state;
//   }
// }

// // Create Context
// const CartContext = createContext<{
//   state: CartState;
//   dispatch: React.Dispatch<CartAction>;
// }>( {
//   state: initialState,
//   dispatch: () => null,
// });

// // Context Provider Component
// export function CartProvider({ children }: { children: ReactNode }) {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Custom Hook to Use Cart
// export function useCart() {
//   return useContext(CartContext);
// }
