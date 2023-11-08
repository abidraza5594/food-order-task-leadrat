import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnDestroy {

  previousOrder: any[] = [];
  previousOrderTotal : any = 0
  cart$: Observable<any>;
  private destroy$: Subject<void> = new Subject<void>(); 

  constructor(private store: Store<{ cart: any }>) {
    this.cart$ = store.select('cart');
  }

  ngOnInit() {
    // Subscribe to cart changes and populate previousOrder array
    this.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cartData => {
        this.previousOrder = cartData.previous;
      });
  }

  ngDoCheck(){
    let preOrd=this.previousOrder.flat()
      this.previousOrderTotal=preOrd.reduce((total: any, product: any) => {
        return total + parseFloat(product.productTotalPrice);
      }, 0);
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
