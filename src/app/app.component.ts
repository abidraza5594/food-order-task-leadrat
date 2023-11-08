import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from "@ngrx/store"
import { Observable, Subscription } from 'rxjs';
import { buyCartProduct, previousOrder, totalPriceAction } from 'src/Store/cart-action';
import { DataSharingService } from './data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "../../node_modules/ngx-toastr/toastr.css"]
})
export class AppComponent {
  cart$: Observable<any>;
  cartProduct: Array<any> = []
  iscartEmpty: boolean = false
  totalPrice: any
  totalProductCount: number = 0;
  PopUpCartData: any = [];
  previousOrderData: any = []
  showAlert = false;
  buyModalVisible = false;

  cartSubscription: Subscription = new Subscription();
  constructor(private dataSharingService: DataSharingService, private modalService: NgbModal, private store: Store<{ cart: any }>) {
    this.cart$ = store.select('cart');
  }

  openBuyModal() {
    this.buyModalVisible = true;
  }

  closeBuyModal() {
    this.buyModalVisible = false;
  }

  // service to shere data
  shareData(data: any): void {
    this.dataSharingService.previousOrderData = data;
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  buyProduct() {
    this.previousOrderData = [...this.previousOrderData, [...this.PopUpCartData]]
    this.store.dispatch(buyCartProduct())
    this.totalPrice = 0
    this.modalService.dismissAll();
    this.store.dispatch(previousOrder({ preveOrd: this.previousOrderData }))
    this.openBuyModal()
    setTimeout(() => this.closeBuyModal(), 1000)
    this.store.dispatch(totalPriceAction({ totalP: 'reset' }));
  }

  incrementQnty(product: any) {
    this.PopUpCartData = this.PopUpCartData.map((item: any) => {
      if (item === product) {
        const updatedQuantity = item.quantity + 1;
        this.store.dispatch(totalPriceAction({ totalP: parseFloat(product.price) }));
        const itemPrice = parseFloat(item.productTotalPrice)
        return { ...item, quantity: updatedQuantity, productTotalPrice: itemPrice + parseFloat(product.price) };
      } else {
        return item;
      }
    });
  }

  decrementQnty(product: any) {
    if (product.quantity === 1) {
      this.PopUpCartData = this.PopUpCartData.filter((item: any) => item !== product)
      this.totalPrice = this.PopUpCartData.reduce((total: any, product: any) => {
        return total + parseFloat(product.productTotalPrice);
      }, 0);
    }
    this.PopUpCartData = this.PopUpCartData.map((item: any) => {
      if (item === product) {
        const updatedQuantity = item.quantity - 1;
        this.totalPrice = this.totalPrice - parseFloat(product.price);
        return { ...item, quantity: updatedQuantity, productTotalPrice: item.productTotalPrice - parseFloat(product.price) };
      } else {
        return item;
      }
    });
  }

  ngOnInit(): void {
    this.totalProductCount = this.cartProduct.length
    this.cartSubscription = this.cart$.subscribe(cartData => {
      this.PopUpCartData = cartData.cart
      this.totalProductCount = this.PopUpCartData.length
      this.totalPrice = cartData.totalPrize
    });
  }
}



