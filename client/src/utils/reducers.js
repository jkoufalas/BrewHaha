import { useReducer } from "react";
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  ADD_CATEGORIES,
  ADD_SUBCATEGORIES,
  CLEAR_CART,
  TOGGLE_CART,
} from "./actions";

const initalState = {
  cart: [],
  categories: [],
  subCategories: [],
};

// The reducer is a function that accepts the current state and an action. It returns a new state based on that action.
export const reducer = (state = initalState, action) => {
  switch (action.type) {
    // Returns a copy of state with an update products array. We use the action.products property and spread it's contents into the new array.
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };
    case ADD_MULTIPLE_TO_CART:
      //when loading cart because this is not an asyn event it will not return the state when the page reloads from the useEffect
      //therefore it will have a state.length of 0 even though it has already added the cache to the cart
      //therefore we will not add to cart the same item, if this is done it would be done via the update_cart_quantity
      const cartIndex = state.cart.findIndex(
        (item) => item.id === action.products.id
      );
      if (!cartIndex) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    // Returns a copy of state, sets the cartOpen to true and maps through the items in the cart.
    // If the item's `id` matches the `id` that was provided in the action.payload, we update the purchase quantity.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // First we iterate through each item in the cart and check to see if the `product._id` matches the `action._id`
    // If so, we remove it from our cart and set the updated state to a variable called `newState`
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      // Then we return a copy of state and check to see if the cart is empty.
      // If not, we set the cartOpen status to  `true`. Then we return an updated cart array set to the value of `newState`.
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case ADD_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case ADD_SUBCATEGORIES:
      return {
        ...state,
        subCategories: [...action.subCategories],
      };

    // Return the state as is in the event that the `action.type` passed to our reducer was not accounted for by the developers
    // This saves us from a crash.
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState);
}
