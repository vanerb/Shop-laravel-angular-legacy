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
        this.basket = basket; // forzar nueva referencia
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



   goToProcess() {
    console.log("Click")
    this.createOrderProv()

  }


  createOrderProv(){
    let order: CreateOrder = {
      "basket_id": 1,
      "total": "200",
      "status": "completed",
      "name": "Vnesa",
      "email": "vanesa.ribera15@gmail.com",
      "direction": "C invent",
      "city": "Calencia",
      "zip": "3124",
      "country": "España"
    }

    this.basketService.createOrder(order).subscribe({
      next: async (order) => {
        await this.router.navigate(['/process-order'])
        this.cd.detectChanges();
      },
      error: err => console.error("Error al cargar productos", err)
    });
  }
}
