import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodDataService } from '../food-data.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { addToCart, decrementPrice, removeCartIntem, totalPriceAction } from 'src/Store/cart-action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  foodData: any;
  cart$: Observable<any>;
  cartSubscription: Subscription = new Subscription();
  PopUpCartData: any = []
  totalPrice: any = 0

  constructor(private foodDataService: FoodDataService, private store: Store<{ cart: any }>) {
    this.cart$ = store.select('cart');
  }

  incrementQnty(product: any) {
    this.store.dispatch(addToCart({ product: product }));
    this.store.dispatch(totalPriceAction({ totalP: parseFloat(product.price) }));
    this.foodData = this.foodData.map((item: any) => {
      if (item === product) {
        const updatedQuantity = item.quantity + 1;
        const itemPrice = parseFloat(item.productTotalPrice)
        return { ...item, quantity: updatedQuantity, productTotalPrice: itemPrice + parseFloat(product.price) };
      } else {
        return item;
      }
    });
  }

  decrementQnty(product: any) {
    this.store.dispatch(decrementPrice({ decreMentP: parseFloat(product.price) }));
    this.store.dispatch(removeCartIntem({ removeCartItem: product }))

    this.foodData = this.foodData.map((item: any) => {
      if (item === product) {
        if (item.quantity === 1) {
          this.PopUpCartData = this.PopUpCartData.filter((item: any) => item !== product)
          return { ...item, isShowInDc: false }
        }
        const updatedQuantity = item.quantity - 1;
        const itemPrice = parseFloat(item.productTotalPrice)
        return { ...item, quantity: updatedQuantity, productTotalPrice: itemPrice - parseFloat(product.price) };
      } else {
        return item;
      }
    });
  }

  ngOnInit() {
    this.getDataFromApi();
    this.cartSubscription = this.cart$.subscribe(cartData => {
      this.PopUpCartData = cartData.cart
      this.totalPrice = cartData.totalPrize
      this.PopUpCartData = cartData.popupData
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the cart observable to avoid memory leaks
    this.cartSubscription.unsubscribe();
  }

  getDataFromApi() {
    this.foodDataService.getFoodData().subscribe((response: any) => {
      this.foodData = response.map((item: any) => ({ ...item, quantity: 1, productTotalPrice: item.price, isShowInDc: false }));
    });
  }

  addToCartHandler(food: any) {
    this.store.dispatch(addToCart({ product: food }));
    this.store.dispatch(totalPriceAction({ totalP: parseFloat(food.price) }));
    this.foodData = this.foodData.map((item: any) => {
      if (item.id === food.id) {
        return { ...item, isShowInDc: true }
      } else {
        return item
      }
    })
  }
}
