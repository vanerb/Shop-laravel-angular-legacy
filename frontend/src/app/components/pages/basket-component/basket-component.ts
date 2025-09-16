import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Basket} from '../../../interfaces/basket';
import {BasketService} from '../../../services/basket-service';
import {Product} from '../../../interfaces/products';
import {calculateTotal, getImageUrl} from '../../../helpers/utilities.helper';

@Component({
  selector: 'app-basket-component',
  standalone: false,
  templateUrl: './basket-component.html',
  styleUrl: './basket-component.css'
})
export class BasketComponent implements OnInit {
  basket!: Basket
  constructor(private readonly router: Router,private basketService: BasketService, private cd: ChangeDetectorRef, ) {
  }


  ngOnInit() {
    this.basketService.getAllBasketByUser().subscribe({
      next: (basket: Basket) => {
        if(basket.finished === 0){
          this.basket = basket; // forzar nueva referencia
        }

        this.cd.detectChanges();
      },
      error: (err) => console.error("Error al cargar productos", err)
    });
  }


  getImageUrl(item: Product | undefined): string {
      return getImageUrl(item?.images[0])
  }



   async goToProcess() {
     console.log("Click")



     await this.router.navigate(['/process-order/'+this.basket.id])

   }

  calculateTotal(){
    return calculateTotal(this.basket.products)
  }


  removeProductBasket(item: Product | undefined){

    this.basketService.removeProductBasket(item?.id ?? 0).subscribe({
      next: basket_product  => {

        this.basketService.getAllBasketByUser().subscribe({
          next: (basket: Basket) => {
            if(basket.finished === 0){
              this.basket = basket; // forzar nueva referencia
            }


            this.cd.detectChanges();
          },
          error: (err) => console.error("Error al cargar productos", err)
        });
      },
      error: (err) => console.error("Error al cargar productos", err)
    });
  }
}
