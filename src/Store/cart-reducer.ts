// src/app/store/cart.action.ts
import { createAction, props } from '@ngrx/store';
import { createReducer, on } from '@ngrx/store';
import { addToCart, buyCartProduct, decrementPrice, removeCartIntem, previousOrder, totalPriceAction } from './cart-action';
import { act } from '@ngrx/effects';




export interface AppState {
  cart: any[];
  previous: any[];
  totalPrize: any;
  popupData: any
}

const initialState: AppState = {
  cart: [],
  previous: [],
  totalPrize: 0,
  popupData: []
};

export const cartReducer = createReducer(
  initialState,
  // on(addToCart, (state, action) => {
  //   console.log("from actions.cart",action.product.id)


  //   return { ...state, cart: [...state.cart, action.product] };
  // }),
  on(addToCart, (state, action) => {

    const existingCartItem = state.cart.find(item => item.id === action.product.id);

    if (existingCartItem) {
      // If the item is already in the cart, update quantity and price
      const updatedCart = state.cart.map(item =>
        item.id === action.product.id
          ? { ...item, quantity: item.quantity + 1, productTotalPrice: parseFloat(item.productTotalPrice) + parseFloat(action.product.price) }
          : item
      );
      return { ...state, cart: updatedCart };
    } else {
      // If the item is not in the cart, add it
      return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] };
    }
  }),
  on(previousOrder, (state, action) => {
    return { ...state, previous: [...action.preveOrd] };
  }),

  on(buyCartProduct, (state, action) => {
    return { ...state, cart: [] }; // Clear the cart in the state
  }),

  on(totalPriceAction, (state, action) => {
    if(action.totalP==="reset"){
      return { ...state, totalPrize: 0 }
    }
    return { ...state, totalPrize: state.totalPrize + parseFloat(action.totalP) }
  }),

  on(decrementPrice, (state, action) => {
    return { ...state, totalPrize: state.totalPrize - parseFloat(action.decreMentP) }
  }),

  on(removeCartIntem, (state, action) => {

    const existingCartItem = state.cart.find(item => item.id === action.removeCartItem.id);

    if (existingCartItem) {
      if (existingCartItem.quantity === 1) {
        // If the item's quantity is 1, remove it from the cart
        const updatedCart = state.cart.filter(item => item.id !== action.removeCartItem.id);
        return { ...state, cart: updatedCart };
      } else {
        // If the item is already in the cart and quantity is more than 1, update quantity and price
        const updatedCart = state.cart.map(item =>
          item.id === action.removeCartItem.id
            ? { ...item, quantity: item.quantity - 1, productTotalPrice: parseFloat(item.productTotalPrice) - parseFloat(action.removeCartItem.price) }
            : item
        );
        return { ...state, cart: updatedCart };
      }
    } else {
      // If the item is not in the cart, return the current state
      return state;
    }
  }

  ));

