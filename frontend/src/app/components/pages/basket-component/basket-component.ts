import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilitiesService} from '../../../services/utilities-service';
import {Basket} from '../../../interfaces/basket';
import {BasketService} from '../../../services/basket-service';
import {Product} from '../../../interfaces/products';
import {CreateOrder} from '../../../interfaces/order';

@Component({
  selector: 'app-basket-component',
  standalone: false,
  templateUrl: './basket-component.html',
  styleUrl: './basket-component.css'
})
export class BasketComponent implements OnInit {
  basket!: Basket
  constructor(private readonly router: Router,private basketService: BasketService, private cd: ChangeDetectorRef, private readonly utilitiesService: UtilitiesService) {
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
    if (!item || !item.images || item.images.length === 0) {
      return 'http://localhost:8000/storage/general/no_image.jpg'; // Imagen por defecto si no hay
    }
    return `http://localhost:8000/storage/${item.images[0].path}`;
  }



   async goToProcess() {
     console.log("Click")
     await this.router.navigate(['/process-order'])

   }

  calculateTotal(){
    let total = 0
     this.basket?.products.forEach(el=>{
      total += Number.parseFloat(el.price) * el.pivot.quantity
    })

    return total.toFixed(2)
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
