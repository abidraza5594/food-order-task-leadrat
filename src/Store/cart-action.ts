import { createAction, props } from '@ngrx/store';


export const addToCart = createAction('[Cart] Add to Cart', props<{ product: any }>());
export const buyCartProduct=createAction('[Cart] Buy Cart Product')
export const previousOrder = createAction('[Cart] Previous Order', props<{ preveOrd: any }>());
export const totalPriceAction = createAction('[Cart] Total Price',props<{ totalP: any }>());
export const decrementPrice = createAction('[Cart] Decrement Price',props<{ decreMentP: any }>())
export const removeCartIntem = createAction('[Cart] Remove Cart Item',props<{ removeCartItem: any }>())
